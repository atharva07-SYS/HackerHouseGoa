import React from 'react';

/**
 * LandingHero
 * The opening screen before the user starts building their ID.
 */
export default function LandingHero({ onStart }) {
  return (
    <div
      className="hero-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="hero-noise" />

      {/* Decorative large background text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(6rem, 30vw, 16rem)',
          color: 'rgba(245,230,66,0.03)',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        GOA
      </div>

      {/* Floating palm accent */}
      <div
        aria-hidden="true"
        className="animate-float"
        style={{
          position: 'absolute',
          top: '8%',
          right: '5%',
          fontSize: '4rem',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      >
        🌴
      </div>
      <div
        aria-hidden="true"
        className="animate-float"
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '4%',
          fontSize: '3rem',
          opacity: 0.12,
          pointerEvents: 'none',
          animationDelay: '1.5s',
        }}
      >
        🌊
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '480px', width: '100%' }}>
        {/* Event badge */}
        <div
          className="animate-slide-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,63,164,0.15)',
            border: '1px solid rgba(255,63,164,0.4)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff3fa4', animation: 'pulse-ring 1.5s ease-out infinite' }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#ff3fa4', textTransform: 'uppercase' }}>
            GOA · 28–31 OCT 2026
          </span>
        </div>

        {/* Main title */}
        <h1
          className="animate-slide-up delay-100"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(3rem, 15vw, 5.5rem)',
            color: '#f5e642',
            letterSpacing: '0.04em',
            lineHeight: 0.95,
            marginBottom: '8px',
          }}
        >
          HACKER HOUSE
        </h1>
        <div
          className="animate-slide-up delay-200"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(3.5rem, 18vw, 6.5rem)',
            color: '#ff3fa4',
            letterSpacing: '0.04em',
            lineHeight: 0.95,
            marginBottom: '24px',
          }}
          aria-label="Goa in Hindi"
        >
          गोवा
        </div>

        {/* Tagline */}
        <p
          className="animate-slide-up delay-300"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 4vw, 1.25rem)',
            color: 'rgba(255,248,231,0.8)',
            fontWeight: 500,
            marginBottom: '8px',
          }}
        >
          Make your Builder ID.
        </p>
        <p
          className="animate-slide-up delay-400"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.75rem',
            color: 'rgba(245,230,66,0.5)',
            letterSpacing: '0.1em',
            marginBottom: '40px',
          }}
        >
          Upload · Customise · Download · Share
        </p>

        {/* CTA */}
        <div className="animate-slide-up delay-500" style={{ maxWidth: '320px', margin: '0 auto' }}>
          <button
            className="btn-primary"
            onClick={onStart}
            style={{ fontSize: '1.4rem', padding: '18px 40px' }}
            aria-label="Start creating your Builder ID"
          >
            🌴 GET STARTED
          </button>
        </div>

        {/* Subtag */}
        <div
          className="animate-fade-in delay-700"
          style={{
            marginTop: '24px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            color: 'rgba(245,230,66,0.3)',
            letterSpacing: '0.15em',
          }}
        >
          #FRAMEINGOA
        </div>

        {/* Decorative dots row */}
        <div
          className="animate-fade-in delay-600"
          style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '32px' }}
          aria-hidden="true"
        >
          {['#ff3fa4', 'rgba(245,230,66,0.4)', '#ff6b35', 'rgba(245,230,66,0.4)', '#ff3fa4'].map((c, i) => (
            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
