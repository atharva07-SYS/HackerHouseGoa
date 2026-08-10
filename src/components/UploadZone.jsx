import React, { useCallback, useState } from 'react';
import { fileToDataUrl, validateImageFile } from '../utils/imageProcessing';

/**
 * UploadZone
 * Drag-and-drop + click-to-upload photo input.
 * Supports JPG, PNG, HEIC/HEIF. Auto-converts HEIC on the client.
 */
export default function UploadZone({ onPhotoReady, existingPhoto }) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = React.useRef(null);

  const processFile = useCallback(async (file) => {
    setError('');
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      onPhotoReady(dataUrl);
    } catch (err) {
      setError(err.message || 'Failed to process image. Please try another file.');
    } finally {
      setLoading(false);
    }
  }, [onPhotoReady]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // reset input so same file can be re-uploaded
    e.target.value = '';
  };

  const handleClick = () => inputRef.current?.click();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,image/webp,.heic,.heif"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        aria-label="Upload your photo"
        id="photo-upload-input"
      />

      {/* Drop zone */}
      <div
        className={`upload-zone ${dragging ? 'dragging' : ''}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Upload photo area. Click or drag a photo here."
        style={{
          padding: existingPhoto ? '16px' : '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          minHeight: existingPhoto ? 'auto' : '180px',
        }}
      >
        {loading ? (
          <>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(245,230,66,0.2)',
                borderTop: '3px solid #f5e642',
                borderRadius: '50%',
                animation: 'spin-slow 0.8s linear infinite',
              }}
            />
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'rgba(245,230,66,0.6)', letterSpacing: '0.1em' }}>
              PROCESSING...
            </p>
          </>
        ) : existingPhoto ? (
          /* Compact re-upload prompt with thumbnail */
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid rgba(245,230,66,0.4)',
                flexShrink: 0,
              }}
            >
              <img src={existingPhoto} alt="Current photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#f5e642' }}>
                Photo uploaded ✓
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(245,230,66,0.5)', marginTop: '2px', letterSpacing: '0.08em' }}>
                CLICK TO CHANGE
              </p>
            </div>
          </div>
        ) : (
          /* Initial empty state */
          <>
            <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>📸</div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '1.2rem', color: '#f5e642', letterSpacing: '0.06em' }}>
                UPLOAD YOUR PHOTO
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(245,230,66,0.5)', marginTop: '4px', letterSpacing: '0.1em' }}>
                JPG · PNG · HEIC · HEIF
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: 'rgba(245,230,66,0.35)', marginTop: '6px', letterSpacing: '0.05em' }}>
                Drag & drop or tap to browse
              </p>
            </div>
            {dragging && (
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '1rem', color: '#f5e642', letterSpacing: '0.1em', opacity: 0.8 }}>
                DROP IT! 🌴
              </div>
            )}
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: '8px',
            padding: '10px 14px',
            background: 'rgba(255,63,164,0.1)',
            border: '1px solid rgba(255,63,164,0.3)',
            borderRadius: '8px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            color: '#ff3fa4',
            letterSpacing: '0.05em',
          }}
          role="alert"
        >
          ⚠ {error}
        </div>
      )}
    </div>
  );
}
