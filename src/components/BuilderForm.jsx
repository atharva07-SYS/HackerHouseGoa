import React from 'react';

/**
 * BuilderForm
 * Collects: Name, Stack/Role, Team.
 * Shows live character hints and field labels.
 */
export default function BuilderForm({ values, onChange, onSubmit, isGenerating }) {
  const handleChange = (field) => (e) => {
    onChange({ ...values, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name.trim()) return;
    onSubmit();
  };

  const isReady = values.name.trim().length > 0 && !!values.photoUrl;

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Name */}
      <div>
        <label htmlFor="builder-name" className="hh-label">
          Your Name *
        </label>
        <input
          id="builder-name"
          type="text"
          className="hh-input"
          placeholder="e.g. Arjun Sharma"
          value={values.name}
          onChange={handleChange('name')}
          maxLength={40}
          autoComplete="name"
          required
          aria-required="true"
          aria-describedby="name-hint"
        />
        <div
          id="name-hint"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.55rem',
            color: 'rgba(245,230,66,0.3)',
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'flex-end',
            letterSpacing: '0.08em',
          }}
        >
          {values.name.length}/40
        </div>
      </div>

      {/* Stack / Role */}
      <div>
        <label htmlFor="builder-stack" className="hh-label">
          Stack / Role
        </label>
        <input
          id="builder-stack"
          type="text"
          className="hh-input"
          placeholder="e.g. Full Stack · React · Node.js"
          value={values.stack}
          onChange={handleChange('stack')}
          maxLength={60}
          aria-describedby="stack-hint"
        />
        <div
          id="stack-hint"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.55rem',
            color: 'rgba(245,230,66,0.3)',
            marginTop: '4px',
            letterSpacing: '0.06em',
          }}
        >
          Used to generate your Builder Title
        </div>
      </div>

      {/* Team */}
      <div>
        <label htmlFor="builder-team" className="hh-label">
          Team
        </label>
        <input
          id="builder-team"
          type="text"
          className="hh-input"
          placeholder="e.g. Team Stealth Mode"
          value={values.team}
          onChange={handleChange('team')}
          maxLength={50}
        />
      </div>

      {/* No photo warning */}
      {!values.photoUrl && (
        <div
          style={{
            background: 'rgba(245,230,66,0.06)',
            border: '1px solid rgba(245,230,66,0.2)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.62rem',
            color: 'rgba(245,230,66,0.5)',
            letterSpacing: '0.06em',
          }}
          role="note"
        >
          🌴 Upload your photo above to generate your ID card
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn-primary"
        disabled={!isReady || isGenerating}
        style={{ opacity: isReady ? 1 : 0.5, cursor: isReady ? 'pointer' : 'not-allowed', marginTop: '4px' }}
        aria-busy={isGenerating}
      >
        {isGenerating ? (
          <>
            <span
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(13,31,13,0.3)',
                borderTop: '2px solid #0d1f0d',
                borderRadius: '50%',
                animation: 'spin-slow 0.7s linear infinite',
                flexShrink: 0,
              }}
            />
            GENERATING...
          </>
        ) : (
          '⚡ GENERATE MY BUILDER ID'
        )}
      </button>
    </form>
  );
}
