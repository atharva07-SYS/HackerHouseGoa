import React, { forwardRef } from 'react';

/* ─── Barcode ─────────────────────────────────────────────────── */
const Barcode = ({ color = '#1a3a1a' }) => {
  const pattern = [2,1,3,1,2,2,1,3,1,1,2,1,3,2,1,2,1,3,1,2,2,1,3,1,2,1,3,1,1,2,3,1,2,1,2,3,1,1,2,1,3,2];
  return (
    <div style={{ display:'flex', alignItems:'stretch', height:'32px', gap:'1px' }} aria-hidden="true">
      {pattern.map((w,i) => (
        <div key={i} style={{ width: w+'px', background: color, flexShrink:0 }} />
      ))}
    </div>
  );
};

/* ─── Goa Beach Illustration SVG (Seamless Dark Green Vector) ─── */
const GoaBeachIllustration = () => (
  <svg viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',display:'block'}} aria-hidden="true">
    <defs>
      <linearGradient id="artSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#143d1f"/>
        <stop offset="100%" stopColor="#1a4d27"/>
      </linearGradient>
      <radialGradient id="sunRadial" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffe600" stopOpacity="1"/>
        <stop offset="70%" stopColor="#ffe600" stopOpacity="0.35"/>
        <stop offset="100%" stopColor="#ffe600" stopOpacity="0"/>
      </radialGradient>
    </defs>

    {/* Dark Forest Background */}
    <rect x="0" y="0" width="420" height="130" fill="url(#artSky)"/>

    {/* Sun Glow */}
    <circle cx="210" cy="55" r="55" fill="url(#sunRadial)" opacity="0.6"/>

    {/* Concentric Sun Rays */}
    <circle cx="210" cy="55" r="42" fill="none" stroke="#ffe600" strokeWidth="1" strokeDasharray="3 3" opacity="0.45"/>
    <circle cx="210" cy="55" r="30" fill="none" stroke="#ffe600" strokeWidth="1" strokeDasharray="4 4" opacity="0.65"/>

    {/* Setting Sun */}
    <circle cx="210" cy="55" r="20" fill="#ffe600"/>
    <circle cx="210" cy="55" r="16" fill="#fff066"/>

    {/* Sparkle Stars in Sky */}
    <path d="M70 20 L71.5 24 L75.5 25.5 L71.5 27 L70 31 L68.5 27 L64.5 25.5 L68.5 24 Z" fill="#ffe600" opacity="0.75"/>
    <path d="M350 16 L351.5 20 L355.5 21.5 L351.5 23 L350 27 L348.5 23 L344.5 21.5 L348.5 20 Z" fill="#ff007f" opacity="0.85"/>

    {/* Layered Rolling Green Hills */}
    <path d="M0 58 Q90 42 180 52 T360 50 Q390 54 420 58 L420 85 L0 85 Z" fill="#184a24" opacity="0.85"/>
    <path d="M0 65 Q120 52 240 62 T420 62 L420 130 L0 130 Z" fill="#123d1d"/>

    {/* Ocean Wave Strokes */}
    <path d="M0 76 Q70 70 140 76 T280 76 T420 76" fill="none" stroke="#ffe600" strokeWidth="1.2" opacity="0.45"/>
    <path d="M0 88 Q105 82 210 88 T420 88" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <path d="M0 100 Q80 94 160 100 T320 100 T420 100" fill="none" stroke="#ff007f" strokeWidth="1" opacity="0.35"/>
    <path d="M0 112 Q105 106 210 112 T420 112" fill="none" stroke="#ffe600" strokeWidth="1" opacity="0.3"/>

    {/* ── Left Palm Silhouette ── */}
    <path d="M26 130 Q20 80 22 40 Q24 18 30 6" stroke="#331c08" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M26 130 Q20 80 22 40 Q24 18 30 6" stroke="#ffe600" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    <path d="M30 6 Q0 -6 -12 4" stroke="#143e1f" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    <path d="M30 6 Q10 -20 18 -26" stroke="#143e1f" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    <path d="M30 6 Q50 -16 58 -7" stroke="#143e1f" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    <path d="M30 6 Q52 10 60 22" stroke="#143e1f" strokeWidth="2.3" fill="none" strokeLinecap="round"/>
    <path d="M30 6 Q16 22 6 28" stroke="#143e1f" strokeWidth="2.3" fill="none" strokeLinecap="round"/>

    {/* ── Right Palm Silhouette ── */}
    <path d="M394 130 Q400 80 398 40 Q396 18 390 6" stroke="#331c08" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M394 130 Q400 80 398 40 Q396 18 390 6" stroke="#ffe600" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    <path d="M390 6 Q420 -6 432 4" stroke="#143e1f" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    <path d="M390 6 Q410 -20 402 -26" stroke="#143e1f" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    <path d="M390 6 Q370 -16 362 -7" stroke="#143e1f" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    <path d="M390 6 Q368 10 360 22" stroke="#143e1f" strokeWidth="2.3" fill="none" strokeLinecap="round"/>
    <path d="M390 6 Q404 22 414 28" stroke="#143e1f" strokeWidth="2.3" fill="none" strokeLinecap="round"/>
  </svg>
);

/* ─── Circular Stamp ──────────────────────────────────────────── */
const CircleStamp = ({ size = 60, borderColor = '#2a6a2a', bgColor = '#1a4a1a', textColor = '#f5e642', text = '' }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    border: `2.5px solid ${borderColor}`,
    background: bgColor,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden', flexShrink: 0,
    boxShadow: '2px 2px 5px rgba(0,0,0,0.15)',
  }}>
    {/* Circular text path via SVG */}
    <svg viewBox="0 0 60 60" style={{position:'absolute',inset:0,width:'100%',height:'100%',animation:'spin-slow 20s linear infinite'}}>
      <defs>
        <path id="circle-path" d="M30,5 A25,25 0 1,1 29.99,5" />
      </defs>
      <text fontFamily="'Space Mono', monospace" fontSize="5.2" fill={textColor} letterSpacing="1.8" fontWeight="700">
        <textPath href="#circle-path">{text}</textPath>
      </text>
    </svg>
    {/* 4-pointed retro star in center */}
    <svg viewBox="0 0 24 24" width="16" height="16" style={{position:'relative',zIndex:1}}>
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" fill="#ff3fa4" />
    </svg>
  </div>
);

/* ─── Pink Stamp (right side) ─────────────────────────────────── */
const PinkStamp = ({ size = 58 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    border: '2px solid #ff3fa4',
    background: 'rgba(255,63,164,0.12)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden', flexShrink: 0,
  }}>
    <svg viewBox="0 0 58 58" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs>
        <path id="pink-circle" d="M29,3 A26,26 0 1,1 28.99,3" />
      </defs>
      <text fontFamily="'Space Mono', monospace" fontSize="5" fill="#ff3fa4" letterSpacing="2">
        <textPath href="#pink-circle">CHILL CAFE • GØBA • HËRITAG •</textPath>
      </text>
    </svg>
    {/* Palm tree icon inside */}
    <svg viewBox="0 0 24 24" width="22" height="22" style={{position:'relative',zIndex:1}}>
      <path d="M12 20 Q10 14 11 8" stroke="#ff3fa4" strokeWidth="1.5" fill="none"/>
      <path d="M11 10 Q5 6 3 10 Q7 8 11 12" fill="#ff3fa4" opacity="0.8"/>
      <path d="M11 8 Q8 2 12 4 Q14 2 11 8" fill="#ff3fa4" opacity="0.8"/>
      <path d="M11 10 Q17 6 19 10 Q15 8 11 12" fill="#ff3fa4" opacity="0.8"/>
    </svg>
  </div>
);

/* ─── Wave decoration (for header) ─────────────────────────────── */
const WaveDecor = ({ color = 'rgba(245,230,66,0.4)', width = 28 }) => (
  <svg viewBox="0 0 30 10" width={width} aria-hidden="true">
    <path d="M0 5 Q5 1 10 5 Q15 9 20 5 Q25 1 30 5" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M0 8 Q5 4 10 8 Q15 12 20 8 Q25 4 30 8" stroke={color} strokeWidth="1" fill="none" opacity="0.6"/>
  </svg>
);

/* ─── Mountain decoration ───────────────────────────────────────── */
const MountainDecor = ({ color = 'rgba(245,230,66,0.3)', width = 32 }) => (
  <svg viewBox="0 0 40 20" width={width} aria-hidden="true">
    <path d="M0 20 L10 6 L20 14 L30 2 L40 20 Z" fill={color} />
    <path d="M28 4 L30 2 L32 5" fill="rgba(255,255,255,0.4)"/>
  </svg>
);

/* ─── IDCard ─────────────────────────────────────────────────────── */
const IDCard = forwardRef(function IDCard({ userData, photoTransform }, ref) {
  const { name, stack, team, title, photoUrl } = userData;

  const builderId = React.useMemo(() => {
    const seed = (name || 'BUILDER').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let id = 'HHG26-';
    let s = seed;
    for (let i = 0; i < 4; i++) {
      id += chars[s % chars.length];
      s = Math.floor(s / chars.length) + 17;
    }
    return id;
  }, [name]);

  const px = photoTransform?.x || 0;
  const py = photoTransform?.y || 0;
  const ps = photoTransform?.scale || 1;

  // Card is 420px wide — fixed pixel sizes for reliable html-to-image export
  return (
    <div
      ref={ref}
      aria-label={`Hacker House Goa 2026 Builder ID for ${name || 'Builder'}`}
      style={{
        width: '420px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 0 0 3px #f5e642, 0 24px 64px rgba(0,0,0,0.7)',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        background: '#1a3a1a',
        flexShrink: 0,
      }}
    >
      {/* ── Lanyard hook & Slot ── */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }} aria-hidden="true">
        {/* Silver metallic loop clip */}
        <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginBottom: '-6px', zIndex: 11 }}>
          <path d="M12 2 C8 2 8 16 12 16 C16 16 16 2 12 2 Z" fill="none" stroke="url(#metalGrad)" strokeWidth="3" strokeLinecap="round"/>
          <rect x="9" y="10" width="6" height="5" fill="#666" rx="1"/>
          <defs>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f0f0f0" />
              <stop offset="50%" stopColor="#999999" />
              <stop offset="100%" stopColor="#d0d0d0" />
            </linearGradient>
          </defs>
        </svg>
        {/* Horizontal pill hole */}
        <div style={{
          width: '50px', height: '10px',
          background: '#f0edd0',
          border: '2px solid #1a3a1a',
          borderRadius: '5px',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
        }}/>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — GREEN HEADER
      ══════════════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(160deg, #1a4a1a 0%, #1e3a1e 60%, #162e16 100%)',
        padding: '22px 18px 14px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Dot pattern bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(245,230,66,0.06) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          pointerEvents: 'none',
        }}/>

        {/* Top micro row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', position: 'relative', zIndex: 1 }}>
          {/* Left: time/studio badge */}
          <div style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1rem', color: '#f5e642', letterSpacing: '0.04em', lineHeight: 1,
            textAlign: 'left',
          }}>
            <div style={{ fontWeight: 900 }}>2:47</div>
            <div style={{ fontWeight: 800, fontSize: '0.55rem', marginTop: '1px' }}>PM</div>
            <div style={{ fontWeight: 800, fontSize: '0.52rem', letterSpacing: '0.05em', color: '#f5e642', opacity: 0.9 }}>STUDIO</div>
          </div>

          {/* Center decorations */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <WaveDecor />
            <MountainDecor />
            <WaveDecor />
          </div>

          {/* Right: CHECK HYPE badge */}
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.45rem',
            color: '#f5e642',
            letterSpacing: '0.08em',
            fontWeight: 700,
          }}>
            CHECK HYPE
          </div>
        </div>

        {/* Main brand: HACKER गोवा HOUSE */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', lineHeight: 1, margin: '8px 0 4px' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: '2.5rem',
            letterSpacing: '-0.02em',
            color: '#f5e642',
            lineHeight: 0.95,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            transform: 'scaleX(0.8) scaleY(1.2)',
            transformOrigin: 'center center',
          }}>
            <span>HACKER</span>
            {/* गोवा inset */}
            <span style={{
              fontFamily: "'Yatra One', cursive",
              fontSize: '1.6rem',
              color: '#ff007f',
              textShadow: '1.5px 1.5px 0px #f5e642, -1.5px 1.5px 0px #f5e642, 1.5px -1.5px 0px #f5e642, -1.5px -1.5px 0px #f5e642, 3px 3px 0px rgba(0,0,0,0.3)',
              margin: '0 -2px',
              lineHeight: 1,
              alignSelf: 'center',
              flexShrink: 0,
              transform: 'rotate(-4deg)',
              zIndex: 2,
            }}>गोवा</span>
            <span>HOUSE</span>
          </div>
        </div>

        {/* GOA, INDIA line */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '8px', marginTop: '6px',
        }}>
          <div style={{ flex: 1, height: '1.5px', background: 'rgba(245,230,66,0.35)' }}/>
          <span style={{ fontSize: '0.6rem', color: '#f5e642' }}>✦</span>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: '0.58rem', letterSpacing: '0.15em', color: '#f5e642',
          }}>GOA, INDIA • 28 – 31 OCT 2026</span>
          <span style={{ fontSize: '0.6rem', color: '#f5e642' }}>✦</span>
          <div style={{ flex: 1, height: '1.5px', background: 'rgba(245,230,66,0.35)' }}/>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2 — CREAM BODY (photo + fields)
      ══════════════════════════════════════════ */}
      <div style={{
        background: '#fcf8e8',
        padding: '16px 16px 14px',
        display: 'flex',
        gap: '14px',
        alignItems: 'flex-start',
        position: 'relative',
      }}>
        {/* Faint palm watermark in cream background */}
        <div style={{
          position: 'absolute', right: '20px', bottom: '10px',
          opacity: 0.12, pointerEvents: 'none', zIndex: 0,
        }} aria-hidden="true">
          <svg width="120" height="100" viewBox="0 0 120 100">
            <path d="M100 100 Q90 60 70 20" stroke="#2d6a2d" strokeWidth="4" fill="none"/>
            <path d="M70 20 Q40 10 30 15" stroke="#2d6a2d" strokeWidth="3" fill="none"/>
            <path d="M70 20 Q50 0 60 -10" stroke="#2d6a2d" strokeWidth="3" fill="none"/>
            <path d="M70 20 Q90 0 105 10" stroke="#2d6a2d" strokeWidth="3" fill="none"/>
          </svg>
        </div>

        {/* Pink wavy cancellation postmark stamp */}
        <div style={{
          position: 'absolute', right: '12px', top: '70px',
          opacity: 0.65, zIndex: 1, pointerEvents: 'none',
        }} aria-hidden="true">
          <svg width="60" height="42" viewBox="0 0 60 42">
            <path d="M0 5 Q15 0 30 5 T60 5" fill="none" stroke="#ff3fa4" strokeWidth="1.5" />
            <path d="M0 13 Q15 8 30 13 T60 13" fill="none" stroke="#ff3fa4" strokeWidth="1.5" />
            <path d="M0 21 Q15 16 30 21 T60 21" fill="none" stroke="#ff3fa4" strokeWidth="1.5" />
            <path d="M0 29 Q15 24 30 29 T60 29" fill="none" stroke="#ff3fa4" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Left column: photo + stamp */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
          {/* Photo frame */}
          <div style={{
            width: '138px', height: '158px',
            border: '3px solid #f5e642',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#c8c0a0',
            position: 'relative',
            boxShadow: '3px 3px 0 #d4c060, 6px 6px 0 rgba(0,0,0,0.1)',
            flexShrink: 0,
          }}>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${name || 'Builder'} photo`}
                crossOrigin="anonymous"
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px)) scale(${ps})`,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  pointerEvents: 'none',
                  transformOrigin: 'center center',
                }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'rgba(90,90,60,0.1)',
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" stroke="rgba(90,80,40,0.4)" strokeWidth="1.5"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(90,80,40,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.45rem', color: 'rgba(90,80,40,0.5)', letterSpacing: '0.1em' }}>YOUR PHOTO</div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: ID fields */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {/* Builder ID */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.6rem', fontWeight: 900,
              color: '#1a3a1a', letterSpacing: '0.08em', marginBottom: '3px',
            }}>BUILDER ID</div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.88rem', fontWeight: 700,
              color: '#1a3a1a',
              background: '#f5e642',
              border: '2px solid #1a3a1a',
              borderRadius: '5px',
              padding: '3px 8px',
              display: 'inline-block',
              letterSpacing: '0.08em',
              fontWeight: 800,
            }}>{builderId}</div>
          </div>

          {/* Divider */}
          <div style={{ borderBottom: '1.5px dashed rgba(26,58,26,0.3)', marginBottom: '8px' }}/>

          {/* NAME */}
          <div style={{ marginBottom: '8px', position: 'relative', zIndex: 2 }}>
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.58rem', fontWeight: 800,
              color: '#1a4a1a', opacity: 0.75, letterSpacing: '0.08em', marginBottom: '2px',
            }}>NAME</div>
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: name && name.length > 18 ? '1.15rem' : '1.35rem',
              color: '#1a3a1a', letterSpacing: '0.02em', lineHeight: 1.1,
              wordBreak: 'break-word',
              textTransform: 'uppercase',
            }}>{name || 'YOUR NAME'}</div>
          </div>

          {/* Divider */}
          <div style={{ borderBottom: '1.5px dashed rgba(26,58,26,0.25)', marginBottom: '8px' }}/>

          {/* STACK / ROLE */}
          <div style={{ marginBottom: '8px', position: 'relative', zIndex: 2 }}>
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.58rem', fontWeight: 800,
              color: '#1a4a1a', opacity: 0.75, letterSpacing: '0.08em', marginBottom: '2px',
            }}>STACK / ROLE</div>
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: stack && stack.length > 25 ? '0.95rem' : '1.05rem',
              color: '#1a3a1a', letterSpacing: '0.02em', lineHeight: 1.2,
              wordBreak: 'break-word',
              textTransform: 'uppercase',
            }}>{stack || 'YOUR STACK / ROLE'}</div>
          </div>

          {/* Divider */}
          <div style={{ borderBottom: '1.5px dashed rgba(26,58,26,0.25)', marginBottom: '8px' }}/>

          {/* TEAM */}
          <div style={{ marginBottom: '4px', position: 'relative', zIndex: 2 }}>
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.58rem', fontWeight: 800,
              color: '#1a4a1a', opacity: 0.75, letterSpacing: '0.08em', marginBottom: '2px',
            }}>TEAM</div>
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: team && team.length > 25 ? '0.95rem' : '1.05rem',
              color: '#1a3a1a', letterSpacing: '0.02em', lineHeight: 1.2,
              wordBreak: 'break-word',
              textTransform: 'uppercase',
            }}>{team || 'YOUR TEAM'}</div>
          </div>
        </div>

        {/* Wave decoration top-right corner of cream section */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }} aria-hidden="true">
          <svg viewBox="0 0 30 20" width="30">
            <path d="M0 5 Q5 1 10 5 Q15 9 20 5" stroke="#ff3fa4" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <path d="M5 10 Q10 6 15 10 Q20 14 25 10" stroke="#ff3fa4" strokeWidth="1.5" fill="none" opacity="0.3"/>
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 3 — BUILDER TITLE BANNER
      ══════════════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(135deg, #1a4a1a 0%, #1e3a1e 100%)',
        padding: '12px 16px 14px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        {/* Diagonal stripe pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(255,255,255,0.02) 6px, rgba(255,255,255,0.02) 12px)',
          pointerEvents: 'none',
        }}/>

        {/* Left content */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.55rem', letterSpacing: '0.25em',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.7)', marginBottom: '4px',
          }}>
            ✦ BUILDER TITLE ✦
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: title && title.length > 22 ? '1.45rem' : '1.75rem',
            color: '#fff',
            letterSpacing: '0.01em',
            lineHeight: 1,
            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
            wordBreak: 'break-word',
          }}>
            {title || 'YOUR BUILDER TITLE'}
          </div>
          <div style={{ marginTop: '8px', display: 'inline-block' }}>
            <span style={{
              background: '#f5e642',
              color: '#1a3a1a',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: '0.56rem',
              letterSpacing: '0.08em',
              padding: '3px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase',
            }}>
              TURNING IDEAS INTO IMPACT
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 4 — GOA BEACH ILLUSTRATION
      ══════════════════════════════════════════ */}
      <div style={{ background: '#fcf8e8', lineHeight: 0, overflow: 'hidden' }}>
        <GoaBeachIllustration />
      </div>

      {/* ══════════════════════════════════════════
          SECTION 5 — YELLOW FOOTER
      ══════════════════════════════════════════ */}
      <div style={{
        background: '#f5e642',
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 900,
          fontSize: '0.95rem', letterSpacing: '0.06em',
          color: '#1a3a1a',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          #FRAMEINGOA
          <span style={{ fontSize: '0.7rem' }}>✦</span>
        </div>
        <Barcode color="#1a3a1a" />
      </div>
    </div>
  );
});

export default IDCard;
