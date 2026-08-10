/**
 * exportCard.js
 * Exports the Builder ID card as a high-resolution PNG using html-to-image.
 * Robust implementation with fallbacks for mobile browsers and canvas export.
 */

/**
 * Get a high-resolution PNG data URL from a DOM element.
 * Uses html-to-image with fallback to canvas rendering if needed.
 * @param {HTMLElement} element
 * @returns {Promise<string>} PNG data URL
 */
export async function getCardDataUrl(element) {
  const { toPng, toCanvas } = await import('html-to-image');

  const options = {
    pixelRatio: 2,
    cacheBust: false,
    includeQueryParams: true,
    style: {
      fontSmoothing: 'antialiased',
      WebkitFontSmoothing: 'antialiased',
      transform: 'none', // reset scale transforms during export
    },
    filter: (node) => {
      // Exclude elements with data-no-export
      if (node.dataset && node.dataset.noExport) return false;
      return true;
    },
  };

  try {
    // Primary export attempt via toPng
    return await toPng(element, options);
  } catch (err) {
    console.warn('html-to-image toPng failed, trying toCanvas fallback:', err);
    try {
      const canvas = await toCanvas(element, options);
      return canvas.toDataURL('image/png');
    } catch (err2) {
      console.error('Canvas export fallback also failed:', err2);
      throw new Error('Could not generate image. Please try uploading a JPG/PNG photo.');
    }
  }
}

/**
 * Trigger file download for a PNG data URL.
 * Works on desktop and handles mobile fallbacks (e.g. iOS Safari new window).
 * @param {HTMLElement} element
 * @param {string} [filename]
 * @returns {Promise<string>} Returns the dataUrl for display
 */
/**
 * Synchronously convert a base64 Data URL to a Blob.
 * Avoids async fetch ticks so browser download triggers cleanly in the user's Downloads folder.
 * @param {string} dataUrl
 * @returns {Blob}
 */
function dataUrlToBlob(dataUrl) {
  const parts = dataUrl.split(';base64,');
  const contentType = parts[0].split(':')[1] || 'image/png';
  const raw = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

/**
 * Trigger file download directly into the user's Downloads folder.
 * @param {HTMLElement} element
 * @param {string} [filename]
 * @returns {Promise<string>}
 */
export async function downloadCardAsPng(element, filename = 'HH-Goa-2026-Builder-ID.png') {
  const dataUrl = await getCardDataUrl(element);

  try {
    const blob = dataUrlToBlob(dataUrl);
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 1000);
  } catch (err) {
    console.warn('Blob download failed, fallback to direct dataUrl:', err);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) document.body.removeChild(link);
    }, 1000);
  }

  return dataUrl;
}

/**
 * Open a data URL image in a new browser tab for manual saving.
 * Useful when mobile browsers block automatic file downloads.
 * @param {string} dataUrl
 */
export function openImageInNewTab(dataUrl) {
  const newTab = window.open();
  if (newTab) {
    newTab.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>HH Goa 2026 Builder ID</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; background: #0d1f0d; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; color: #f5e642; padding: 20px; box-sizing: border-box; }
            img { max-width: 100%; height: auto; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            p { margin-top: 16px; font-size: 14px; text-align: center; color: rgba(245,230,66,0.8); }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" alt="HH Goa 2026 Builder ID" />
          <p>🌴 Long press or right-click the image to save to your device.</p>
        </body>
      </html>
    `);
    newTab.document.close();
  } else {
    // If popup blocked, assign to current location
    window.location.href = dataUrl;
  }
}

/**
 * Share via Web Share API (mobile-first native sharing).
 * @param {string} dataUrl - PNG data URL
 * @param {string} text
 * @returns {Promise<string>}
 */
export async function nativeShare(dataUrl, text) {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], 'HH-Goa-2026-Builder-ID.png', { type: 'image/png' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ title: 'HH Goa 2026 Builder ID', text, files: [file] });
      return 'native';
    }
  } catch (err) {
    if (err.name === 'AbortError') return 'cancelled';
    console.warn('Native share with file failed:', err);
  }

  if (navigator.share) {
    try {
      await navigator.share({ title: 'HH Goa 2026 Builder ID', text });
      return 'native-text';
    } catch {
      return 'cancelled';
    }
  }

  return 'unsupported';
}

/**
 * Open X (Twitter) share intent.
 * @param {string} [customText]
 */
export function shareToX(customText) {
  const text =
    customText ||
    `Just got my Hacker House Goa 2026 Builder ID 🌴⚡\n\nWhat's yours?\n\n#FrameInGoa #HackerHouseGoa`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
}
