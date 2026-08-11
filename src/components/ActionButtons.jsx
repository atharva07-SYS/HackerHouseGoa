import React, { useState } from 'react';
import { downloadCardAsPng, getCardDataUrl, openImageInNewTab, shareToX, shareCardFile, generateShareUrl } from '../utils/exportCard';

/**
 * ActionButtons
 * Handles Download PNG (standalone file), View/Save Image (mobile fallback),
 * Copy Share Link, Web Share API (native file + link sharing), Share to X, and Edit Details.
 */
export default function ActionButtons({ cardRef, userData, onEdit }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const [nativeShareAvail] = useState(() => !!(navigator.share));

  const handleDownload = async () => {
    if (!cardRef?.current) return;
    setDownloading(true);
    setDownloadDone(false);
    try {
      await downloadCardAsPng(cardRef.current, 'HH-Goa-2026-Builder-ID.png');
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 3000);
    } catch (err) {
      console.error('Download failed:', err);
      try {
        const dataUrl = await getCardDataUrl(cardRef.current);
        openImageInNewTab(dataUrl);
      } catch (e) {
        alert('Could not export image. Please try again.');
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleViewImage = async () => {
    if (!cardRef?.current) return;
    setDownloading(true);
    try {
      const dataUrl = await getCardDataUrl(cardRef.current);
      openImageInNewTab(dataUrl);
    } catch (err) {
      console.error('View image failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = generateShareUrl(userData);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setShareStatus('link-copied');
    } catch (err) {
      console.warn('Copy link failed:', err);
      prompt('Copy your card link:', shareUrl);
    }
    setTimeout(() => setShareStatus(''), 4000);
  };

  const handleShareX = async () => {
    const shareUrl = generateShareUrl(userData);
    // Automatically trigger PNG download so user has the actual image file ready to attach
    if (cardRef?.current) {
      try {
        await downloadCardAsPng(cardRef.current, 'HH-Goa-2026-Builder-ID.png');
      } catch (e) {
        console.warn('Auto download before X share failed:', e);
      }
    }
    shareToX("Just got my Hacker House Goa 2026 Builder ID! 🌴⚡ #FrameInGoa #HackerHouseGoa", shareUrl);
    setShareStatus('twitter');
    setTimeout(() => setShareStatus(''), 6000);
  };

  const handleNativeShare = async () => {
    if (!cardRef?.current) return;
    setSharing(true);
    try {
      const shareUrl = generateShareUrl(userData);
      const result = await shareCardFile(
        cardRef.current,
        'Check out my Hacker House Goa 2026 Builder ID! 🌴⚡ #FrameInGoa',
        shareUrl
      );
      if (result === 'shared-file' || result === 'shared-text') {
        setShareStatus('native-ok');
      }
    } catch (err) {
      console.warn('Share failed:', err);
    } finally {
      setSharing(false);
      setTimeout(() => setShareStatus(''), 3000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Primary Download PNG */}
      <button
        className="btn-primary"
        onClick={handleDownload}
        disabled={downloading}
        aria-busy={downloading}
        aria-label="Download Builder ID as PNG"
      >
        {downloading ? (
          <>
            <span
              style={{
                width: '16px', height: '16px',
                border: '2px solid rgba(13,31,13,0.3)',
                borderTop: '2px solid #0d1f0d',
                borderRadius: '50%',
                animation: 'spin-slow 0.7s linear infinite',
              }}
            />
            EXPORTING PNG...
          </>
        ) : downloadDone ? (
          '✅ DOWNLOADED PNG!'
        ) : (
          '⬇ DOWNLOAD PNG'
        )}
      </button>

      {/* View / Open Image (Mobile in-app webview helper) */}
      <button
        className="btn-secondary"
        onClick={handleViewImage}
        disabled={downloading}
        aria-label="Open PNG image in new tab to view or save"
      >
        🖼 VIEW / SAVE IMAGE (NEW TAB)
      </button>

      {/* Copy Shareable Card Link */}
      <button
        className="btn-ghost"
        onClick={handleCopyLink}
        aria-label="Copy shareable link for this Builder ID"
        style={{ borderColor: 'rgba(245,230,66,0.4)', color: '#f5e642' }}
      >
        {shareStatus === 'link-copied' ? (
          '✅ LINK COPIED TO CLIPBOARD!'
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            🔗 COPY SHARE LINK
          </>
        )}
      </button>

      {/* Native Web Share API */}
      {nativeShareAvail && (
        <button
          className="btn-ghost"
          onClick={handleNativeShare}
          disabled={sharing}
          aria-label="Share actual PNG image file & link via device share sheet"
        >
          {sharing ? (
            <>
              <span
                style={{
                  width: '14px', height: '14px',
                  border: '2px solid rgba(245,230,66,0.3)',
                  borderTop: '2px solid #f5e642',
                  borderRadius: '50%',
                  animation: 'spin-slow 0.7s linear infinite',
                }}
              />
              GENERATING SHARE...
            </>
          ) : shareStatus === 'native-ok' ? (
            '✅ SHARED!'
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              SHARE IMAGE & LINK (DEVICE SHEET)
            </>
          )}
        </button>
      )}

      {/* Share to X */}
      <button
        className="btn-pink"
        onClick={handleShareX}
        aria-label="Share to X (Twitter)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        SHARE ON X
      </button>

      {/* Link copied notification */}
      {shareStatus === 'link-copied' && (
        <div
          style={{
            background: 'rgba(245,230,66,0.1)',
            border: '1px solid rgba(245,230,66,0.4)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.62rem',
            color: '#f5e642',
            letterSpacing: '0.05em',
            lineHeight: 1.5,
          }}
          role="status"
          aria-live="polite"
        >
          ✨ Shareable card link copied! Paste it anywhere to share your Hacker House Goa 2026 Builder ID.
        </div>
      )}

      {/* X sharing note */}
      {shareStatus === 'twitter' && (
        <div
          style={{
            background: 'rgba(255,63,164,0.1)',
            border: '1px solid rgba(255,63,164,0.3)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.62rem',
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.05em',
            lineHeight: 1.5,
          }}
          role="status"
          aria-live="polite"
        >
          🌴 PNG downloaded & X opened with your share link! Attach your downloaded HH-Goa-2026-Builder-ID.png file to your tweet!
        </div>
      )}

      {/* Edit */}
      <button
        className="btn-ghost"
        onClick={onEdit}
        aria-label="Edit your builder ID details"
      >
        ✏ EDIT DETAILS
      </button>
    </div>
  );
}

