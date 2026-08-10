/**
 * imageProcessing.js
 * Handles HEIC/HEIF conversion, default avatar creation, and image loading utilities.
 */

/**
 * Create a default PNG avatar photo (raster PNG data URL).
 * Avoids SVG canvas tainting issues when exporting.
 * @returns {string} PNG data URL
 */
export function getDefaultAvatarPng() {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  // Background sunset gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 360);
  grad.addColorStop(0, '#ff3fa4');
  grad.addColorStop(0.4, '#ff6b35');
  grad.addColorStop(1, '#ffe600');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 300, 360);

  // Dark green avatar silhouette
  ctx.fillStyle = '#1a3a1a';
  ctx.beginPath();
  ctx.arc(150, 140, 56, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(150, 290, 100, 0, Math.PI * 2);
  ctx.fill();

  // Background palm silhouette
  ctx.strokeStyle = 'rgba(26, 58, 26, 0.35)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(250, 300);
  ctx.quadraticCurveTo(240, 200, 260, 140);
  ctx.stroke();

  return canvas.toDataURL('image/png');
}

/**
 * Convert a File to a data URL, auto-converting HEIC/HEIF via heic2any.
 * @param {File} file
 * @returns {Promise<string>} data URL
 */
export async function fileToDataUrl(file) {
  const isHeic =
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    /\.heic$/i.test(file.name) ||
    /\.heif$/i.test(file.name);

  if (isHeic) {
    try {
      const heic2any = (await import('heic2any')).default;
      const blob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.92,
      });
      // heic2any may return array or single blob
      const resultBlob = Array.isArray(blob) ? blob[0] : blob;
      return blobToDataUrl(resultBlob);
    } catch (err) {
      console.error('HEIC conversion failed:', err);
      throw new Error('Could not convert HEIC file. Please convert to JPG or PNG first.');
    }
  }

  return blobToDataUrl(file);
}

/**
 * Convert a Blob to a data URL.
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Validate that a file is an acceptable image type.
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file) {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'image/webp'];
  const allowedExts = /\.(jpg|jpeg|png|heic|heif|webp)$/i;

  const byMime = allowed.includes(file.type);
  const byExt = allowedExts.test(file.name);

  if (!byMime && !byExt) {
    return { valid: false, error: 'Please upload a JPG, PNG, or HEIC image.' };
  }

  const maxMB = 20;
  if (file.size > maxMB * 1024 * 1024) {
    return { valid: false, error: `File too large. Max size is ${maxMB}MB.` };
  }

  return { valid: true };
}

/**
 * Get image natural dimensions from a data URL.
 * @param {string} dataUrl
 * @returns {Promise<{width: number, height: number}>}
 */
export function getImageDimensions(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = dataUrl;
  });
}
