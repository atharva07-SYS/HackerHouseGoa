import React, { useRef, useState, useCallback, useEffect } from 'react';
import IDCard from './IDCard';

/**
 * CardPreview
 * Wraps IDCard with a photo adjustment UI (drag + zoom + reset).
 * The drag/zoom controls are shown above the card (not part of the card itself).
 */
export default function CardPreview({ userData, onPhotoTransformChange }) {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);
  const cardRef = useRef(null);

  // Notify parent of transform changes (for card export)
  useEffect(() => {
    onPhotoTransformChange?.(transform);
  }, [transform, onPhotoTransformChange]);

  const handleZoomChange = (e) => {
    setTransform((prev) => ({ ...prev, scale: parseFloat(e.target.value) }));
  };

  const handleReset = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  // Mouse drag on photo
  const handleMouseDown = useCallback((e) => {
    if (!userData.photoUrl) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    e.preventDefault();
  }, [transform, userData.photoUrl]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !dragStart.current) return;
    setTransform((prev) => ({
      ...prev,
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    }));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
  }, []);

  // Touch drag on photo
  const handleTouchStart = useCallback((e) => {
    if (!userData.photoUrl) return;
    const t = e.touches[0];
    setIsDragging(true);
    dragStart.current = { x: t.clientX - transform.x, y: t.clientY - transform.y };
  }, [transform, userData.photoUrl]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !dragStart.current) return;
    const t = e.touches[0];
    setTransform((prev) => ({
      ...prev,
      x: t.clientX - dragStart.current.x,
      y: t.clientY - dragStart.current.y,
    }));
    e.preventDefault();
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {/* Photo adjustment controls — only shown if photo is uploaded */}
      {userData.photoUrl && (
        <div
          data-no-export="true"
          style={{
            width: '100%',
            maxWidth: '380px',
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
              onClick={handleReset}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6rem',
                color: 'rgba(245,230,66,0.5)',
                background: 'none',
                border: '1px solid rgba(245,230,66,0.2)',
                borderRadius: '6px',
                padding: '3px 8px',
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
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
              value={transform.scale}
              onChange={handleZoomChange}
              aria-label="Zoom photo"
              style={{ flex: 1 }}
            />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(245,230,66,0.5)', minWidth: '32px' }}>
              {Math.round(transform.scale * 100)}%
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.55rem',
              color: 'rgba(245,230,66,0.35)',
              marginTop: '8px',
              textAlign: 'center',
              letterSpacing: '0.08em',
            }}
          >
            Drag photo to reposition
          </div>
        </div>
      )}

      {/* The actual card */}
      <div
        style={{ width: '100%', maxWidth: '380px', cursor: userData.photoUrl ? (isDragging ? 'grabbing' : 'default') : 'default' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <IDCard ref={cardRef} userData={userData} photoTransform={transform} />
      </div>
    </div>
  );
}

/**
 * Export a ref-based version for the result screen (needs forwarded ref for html-to-image).
 */
export { IDCard };
