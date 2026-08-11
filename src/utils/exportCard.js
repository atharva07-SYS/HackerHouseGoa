/**
 * exportCard.js
 * High-resolution standalone PNG export system for Hacker House Goa 2026 Builder ID.
 * Captures the complete rendered IDCard DOM element using html-to-image's toBlob().
 */

/**
 * Capture the complete rendered IDCard DOM element as a standalone PNG Blob.
 * @param {HTMLElement} element
 * @returns {Promise<Blob>}
 */
export async function getCardPngBlob(element) {
  const { toBlob, toCanvas } = await import('html-to-image');

  // Wait for all fonts to be ready (max 800ms timeout)
  if (document.fonts && document.fonts.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
    } catch (e) {
      console.warn('Font loading check skipped:', e);
    }
  }

  const options = {
    pixelRatio: 3,
    cacheBust: false, // Avoid network hangs during re-fetch
    backgroundColor: '#ffffff',
    style: {
      transform: 'none', // reset scale transforms during export
      fontSmoothing: 'antialiased',
      WebkitFontSmoothing: 'antialiased',
    },
    filter: (node) => {
      if (node.dataset && node.dataset.noExport) return false;
      return true;
    },
  };

  try {
    const blob = await toBlob(element, options);
    if (blob && blob.size > 1000) return blob;
    throw new Error('toBlob returned invalid or empty blob');
  } catch (err) {
    console.warn('html-to-image toBlob failed, using toCanvas fallback:', err);
    const canvas = await toCanvas(element, options);
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob && blob.size > 1000) resolve(blob);
          else reject(new Error('Canvas toBlob failed'));
        },
        'image/png',
        1.0
      );
    });
  }
}

/**
 * Trigger file download for a standalone PNG image: HH-Goa-2026-Builder-ID.png
 * @param {HTMLElement} element
 * @param {string} [filename='HH-Goa-2026-Builder-ID.png']
 */
export async function downloadCardAsPng(element, filename = 'HH-Goa-2026-Builder-ID.png') {
  const blob = await getCardPngBlob(element);
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Aliases for compatibility
export const downloadCardAsJpg = downloadCardAsPng;
export async function getCardDataUrl(element) {
  const blob = await getCardPngBlob(element);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
export const getCardJpgDataUrl = getCardDataUrl;

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
    window.location.href = dataUrl;
  }
}

/**
 * Generate a shareable URL containing encoded builder details.
 * @param {Object} userData
 * @returns {string}
 */
export function generateShareUrl(userData) {
  if (!userData) return window.location.href.split('?')[0];

  const params = new URLSearchParams();
  if (userData.name) params.set('name', userData.name);
  if (userData.stack) params.set('stack', userData.stack);
  if (userData.team) params.set('team', userData.team);
  if (userData.title) params.set('title', userData.title);

  const baseUrl = window.location.href.split('?')[0].split('#')[0];
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Parse shareable URL query parameters if present.
 * @returns {Object|null}
 */
export function parseShareUrlParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const stack = params.get('stack');
    const team = params.get('team');
    const title = params.get('title');

    if (name || title || stack || team) {
      return {
        name: name || '',
        stack: stack || '',
        team: team || '',
        title: title || '',
      };
    }
  } catch (e) {
    console.warn('Failed to parse share URL params:', e);
  }
  return null;
}

/**
 * Share via Web Share API with the actual generated PNG file and shareable link.
 * @param {HTMLElement} element
 * @param {string} [customText='#FrameInGoa']
 * @param {string} [shareUrl]
 */
export async function shareCardFile(element, customText = '#FrameInGoa', shareUrl = null) {
  const blob = await getCardPngBlob(element);
  const file = new File([blob], 'HH-Goa-2026-Builder-ID.png', { type: 'image/png' });

  const shareData = {
    title: 'My Hacker House Goa 2026 Builder ID',
    text: customText,
  };
  if (shareUrl) {
    shareData.url = shareUrl;
  }

  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      ...shareData,
      files: [file],
    });
    return 'shared-file';
  } else if (navigator.share) {
    await navigator.share(shareData);
    return 'shared-text';
  } else {
    throw new Error('Web Share API not supported on this device');
  }
}

export const nativeShare = async (dataUrl, text, shareUrl = null) => {
  if (navigator.share) {
    const shareData = { title: 'My Hacker House Goa 2026 Builder ID', text };
    if (shareUrl) shareData.url = shareUrl;
    await navigator.share(shareData);
    return 'native-text';
  }
  return 'unsupported';
};

/**
 * Open X (Twitter) share intent with text and shareable URL.
 * @param {string} [customText]
 * @param {string} [shareUrl]
 */
export function shareToX(customText, shareUrl = null) {
  const text = customText || `Just got my Hacker House Goa 2026 Builder ID! 🌴⚡ #FrameInGoa #HackerHouseGoa`;
  let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  if (shareUrl) {
    tweetUrl += `&url=${encodeURIComponent(shareUrl)}`;
  }
  window.open(tweetUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
}

