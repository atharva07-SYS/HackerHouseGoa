import React, { useState, useRef, useCallback, useEffect } from 'react';
import LandingHero from './components/LandingHero';
import UploadZone from './components/UploadZone';
import BuilderForm from './components/BuilderForm';
import IDCard from './components/IDCard';
import ActionButtons from './components/ActionButtons';
import { generateBuilderTitle } from './utils/generateTitle';
import { parseShareUrlParams } from './utils/exportCard';

// Card internal width (px) — must match IDCard's fixed width
const CARD_WIDTH = 420;


/**
 * ScaledCard
 * Renders IDCard at its fixed 420px width, then CSS-scales it to fill
 * the available container width. The ref still points to the real 420px
 * element so html-to-image captures full resolution.
 */
function ScaledCard({ cardRef, userData, photoTransform, onMouseDown, onTouchStart, onTouchMove, onTouchEnd, isDragging }) {
  const [scale, setScale] = useState(1);
  const [cardHeight, setCardHeight] = useState(650);
  const containerRef = useRef(null);
  const cardElRef = useRef(null);

  const setCombinedRef = useCallback(
    (node) => {
      cardElRef.current = node;
      if (typeof cardRef === 'function') cardRef(node);
      else if (cardRef) cardRef.current = node;
    },
    [cardRef]
  );

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current || !cardElRef.current) return;
      const avail = containerRef.current.offsetWidth;
      const newScale = Math.min(1, avail / CARD_WIDTH);
      setScale(newScale);

      const h = cardElRef.current.offsetHeight;
      if (h > 0) setCardHeight(h);
    };

    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    if (containerRef.current) ro.observe(containerRef.current);
    if (cardElRef.current) ro.observe(cardElRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: CARD_WIDTH + 'px',
        margin: '0 auto',
        height: Math.round(cardHeight * scale) + 'px',
        position: 'relative',
        cursor: userData?.photoUrl ? (isDragging ? 'grabbing' : 'grab') : 'default',
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        style={{
          width: CARD_WIDTH + 'px',
          transform: scale < 1 ? `scale(${scale})` : 'none',
          transformOrigin: 'top center',
          position: scale < 1 ? 'absolute' : 'relative',
          left: scale < 1 ? '50%' : 'auto',
          marginLeft: scale < 1 ? `-${CARD_WIDTH / 2}px` : '0',
        }}
      >
        <IDCard ref={setCombinedRef} userData={userData} photoTransform={photoTransform} />
      </div>
    </div>
  );
}

// ─── Phases ──────────────────────────────────────────────────────────────────
// 'landing'    → hero screen
// 'form'       → upload + form
// 'generating' → animated transition
// 'result'     → card + action buttons

import { getDefaultAvatarPng } from './utils/imageProcessing';

const DEFAULT_PHOTO = getDefaultAvatarPng();

const INITIAL_FORM = { name: '', stack: '', team: '', photoUrl: DEFAULT_PHOTO };

export default function App() {
  const [phase, setPhase] = useState('landing');
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [userData, setUserData] = useState(null);
  const [photoTransform, setPhotoTransform] = useState({ x: 0, y: 0, scale: 1 });
  const cardRef = useRef(null);

  // Check URL parameters for shared card on initial load
  useEffect(() => {
    const sharedData = parseShareUrlParams();
    if (sharedData && (sharedData.name || sharedData.title || sharedData.stack || sharedData.team)) {
      const title = sharedData.title || generateBuilderTitle(sharedData.stack, sharedData.name);
      const loadedUser = {
        name: sharedData.name || '',
        stack: sharedData.stack || '',
        team: sharedData.team || '',
        title: title,
        photoUrl: DEFAULT_PHOTO,
      };
      setUserData(loadedUser);
      setFormData({
        name: sharedData.name || '',
        stack: sharedData.stack || '',
        team: sharedData.team || '',
        photoUrl: DEFAULT_PHOTO,
      });
      setPhase('result');
    }
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleStart = () => setPhase('form');

  const handlePhotoReady = (dataUrl) => {
    setFormData((prev) => ({ ...prev, photoUrl: dataUrl }));
  };

  const handleFormChange = (updated) => {
    setFormData(updated);
  };

  const handleGenerate = async () => {
    setPhase('generating');

    // Small delay to let animation play
    await new Promise((r) => setTimeout(r, 1800));

    const title = generateBuilderTitle(formData.stack, formData.name);
    setUserData({ ...formData, title });
    setPhase('result');
  };

  const handleEdit = () => {
    setPhase('form');
  };

  const handlePhotoTransformChange = useCallback((t) => {
    setPhotoTransform(t);
  }, []);

  // ── Rendering ────────────────────────────────────────────────────────────────
  if (phase === 'landing') {
    return <LandingHero onStart={handleStart} />;
  }

  if (phase === 'generating') {
    return <GeneratingScreen />;
  }

  return (
    <div
      className="hero-bg"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div className="hero-noise" />

      {/* Top nav */}
      <header
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <button
          onClick={() => setPhase('landing')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1,
          }}
          aria-label="Back to home"
        >
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '1rem', color: '#f5e642', letterSpacing: '0.06em' }}>
            HACKER HOUSE
          </span>
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '0.8rem', color: '#ff3fa4', letterSpacing: '0.04em' }}>
            गोवा 2026
          </span>
        </button>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.55rem',
            color: 'rgba(245,230,66,0.4)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {phase === 'form' ? 'Build ID' : 'Your ID'}
        </span>
      </header>

      <main
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '0 20px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {phase === 'form' && (
          <FormScreen
            formData={formData}
            onPhotoReady={handlePhotoReady}
            onFormChange={handleFormChange}
            onGenerate={handleGenerate}
          />
        )}

        {phase === 'result' && userData && (
          <ResultScreen
            userData={userData}
            photoTransform={photoTransform}
            cardRef={cardRef}
            onPhotoTransformChange={handlePhotoTransformChange}
            onEdit={handleEdit}
          />
        )}
      </main>
    </div>
  );
}

// ─── Form Screen ──────────────────────────────────────────────────────────────
function FormScreen({ formData, onPhotoReady, onFormChange, onGenerate }) {
  const [generating, setGenerating] = useState(false);

  const handleSubmit = async () => {
    setGenerating(true);
    await onGenerate();
    setGenerating(false);
  };

  return (
    <>
      {/* Section: Upload */}
      <section aria-labelledby="upload-heading">
        <h2
          id="upload-heading"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: '1.3rem',
            color: '#f5e642',
            letterSpacing: '0.06em',
            marginBottom: '12px',
          }}
        >
          📸 1. Upload Your Photo
        </h2>
        <UploadZone onPhotoReady={onPhotoReady} existingPhoto={formData.photoUrl === DEFAULT_PHOTO ? '' : formData.photoUrl} />
      </section>

      {/* Section: Form */}
      <section aria-labelledby="details-heading">
        <h2
          id="details-heading"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: '1.3rem',
            color: '#f5e642',
            letterSpacing: '0.06em',
            marginBottom: '12px',
          }}
        >
          ✍ 2. Your Details
        </h2>
        <BuilderForm
          values={formData}
          onChange={onFormChange}
          onSubmit={handleSubmit}
          isGenerating={generating}
        />
      </section>

      {/* Live mini preview */}
      {formData.photoUrl && (
        <section aria-labelledby="preview-heading">
          <h2
            id="preview-heading"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '1.3rem',
              color: '#f5e642',
              letterSpacing: '0.06em',
              marginBottom: '12px',
            }}
          >
            👁 Live Preview
          </h2>
          <ScaledCard
            cardRef={null}
            userData={{ ...formData, title: generateBuilderTitle(formData.stack, formData.name) }}
            photoTransform={{ x: 0, y: 0, scale: 1 }}
            isDragging={false}
          />
        </section>
      )}
    </>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ userData, photoTransform, cardRef, onPhotoTransformChange, onEdit }) {
  const [localTransform, setLocalTransform] = useState(photoTransform);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);

  const updateTransform = (t) => {
    setLocalTransform(t);
    onPhotoTransformChange(t);
  };

  // Mouse drag
  const onMouseDown = (e) => {
    if (!userData.photoUrl) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - localTransform.x, y: e.clientY - localTransform.y };
    e.preventDefault();
  };
  const onMouseMove = useCallback((e) => {
    if (!isDragging || !dragStart.current) return;
    updateTransform({ ...localTransform, x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  }, [isDragging, localTransform]);
  const onMouseUp = () => { setIsDragging(false); dragStart.current = null; };

  // Touch drag
  const onTouchStart = (e) => {
    if (!userData.photoUrl) return;
    const t = e.touches[0];
    setIsDragging(true);
    dragStart.current = { x: t.clientX - localTransform.x, y: t.clientY - localTransform.y };
  };
  const onTouchMove = (e) => {
    if (!isDragging || !dragStart.current) return;
    const t = e.touches[0];
    updateTransform({ ...localTransform, x: t.clientX - dragStart.current.x, y: t.clientY - dragStart.current.y });
    e.preventDefault();
  };
  const onTouchEnd = () => { setIsDragging(false); dragStart.current = null; };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, onMouseMove]);

  return (
    <>
      {/* Congrats header */}
      <div className="animate-slide-up" style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '2rem', color: '#f5e642', letterSpacing: '0.04em', lineHeight: 1 }}>
          YOUR BUILDER ID
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'rgba(245,230,66,0.5)', marginTop: '6px', letterSpacing: '0.12em' }}>
          {userData.title}
        </div>
      </div>

      {/* Photo adjustment */}
      {userData.photoUrl && (
        <div
          data-no-export="true"
          className="animate-slide-up delay-100"
          style={{
            background: 'rgba(245,230,66,0.05)',
            border: '1px solid rgba(245,230,66,0.15)',
            borderRadius: '12px',
            padding: '12px 16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(245,230,66,0.6)', textTransform: 'uppercase' }}>
              📸 Adjust Photo
            </span>
            <button
              onClick={() => updateTransform({ x: 0, y: 0, scale: 1 })}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(245,230,66,0.5)', background: 'none', border: '1px solid rgba(245,230,66,0.2)', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer', letterSpacing: '0.1em' }}
            >
              RESET
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem' }}>🔍</span>
            <input
              type="range"
              className="zoom-slider"
              min="0.5"
              max="3"
              step="0.05"
              value={localTransform.scale}
              onChange={(e) => updateTransform({ ...localTransform, scale: parseFloat(e.target.value) })}
              aria-label="Zoom photo"
              style={{ flex: 1 }}
            />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(245,230,66,0.5)', minWidth: '32px' }}>
              {Math.round(localTransform.scale * 100)}%
            </span>
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: 'rgba(245,230,66,0.35)', marginTop: '8px', textAlign: 'center', letterSpacing: '0.08em' }}>
            Drag the card photo to reposition
          </div>
        </div>
      )}

      {/* The Card */}
      <div className="animate-slide-up delay-200">
        <ScaledCard
          cardRef={cardRef}
          userData={userData}
          photoTransform={localTransform}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          isDragging={isDragging}
        />
      </div>

      {/* Action Buttons */}
      <div className="animate-slide-up delay-300">
        <ActionButtons cardRef={cardRef} userData={userData} onEdit={onEdit} />
      </div>
    </>
  );
}

// ─── Generating Screen ────────────────────────────────────────────────────────
function GeneratingScreen() {
  const [step, setStep] = React.useState(0);
  const steps = ['Summoning the beach vibes...', 'Generating your title...', 'Crafting your Builder ID...'];

  React.useEffect(() => {
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 550);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="generating-overlay" role="status" aria-live="polite" aria-label="Generating your Builder ID">
      {/* Animated ring */}
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(245,230,66,0.1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTop: '3px solid #f5e642',
            animation: 'spin-slow 0.9s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderBottom: '2px solid #ff3fa4',
            animation: 'spin-slow 1.3s linear infinite reverse',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
          }}
          aria-hidden="true"
        >
          🌴
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: '1.8rem',
          color: '#f5e642',
          letterSpacing: '0.06em',
          textAlign: 'center',
        }}
      >
        BUILDING YOUR ID
      </div>

      {/* Step indicator */}
      <div
        key={step}
        className="animate-fade-in"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.7rem',
          color: 'rgba(245,230,66,0.6)',
          letterSpacing: '0.1em',
          textAlign: 'center',
          minHeight: '20px',
        }}
      >
        {steps[step]}
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i <= step ? '#f5e642' : 'rgba(245,230,66,0.2)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
