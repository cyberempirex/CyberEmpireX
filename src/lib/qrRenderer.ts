import QRCode from 'qrcode';
import brandSymbol from '../assets/brand/symbol.png';

export type QrStyle = 'classic' | 'rounded' | 'dots' | 'minimal';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrRenderOptions {
  size: number; // 256, 512, 1024
  fgColor: string;
  bgColor: string;
  transparentBg: boolean;
  margin: number; // modules margin, e.g. 2
  style: QrStyle;
  ecl: ErrorCorrectionLevel;
  logo: 'none' | 'cyberempirex' | 'custom';
  customLogoUrl?: string | null;
}

export interface QrMatrix {
  size: number;
  data: Uint8Array | number[];
}

/**
 * Generates raw QR matrix from text using qrcode library
 */
export function getQrMatrix(text: string, ecl: ErrorCorrectionLevel = 'M'): QrMatrix {
  try {
    const qr = QRCode.create(text || 'https://cyberempirex.org', {
      errorCorrectionLevel: ecl
    });
    return {
      size: qr.modules.size,
      data: qr.modules.data
    };
  } catch (err) {
    console.warn('QR generation fallback', err);
    // Return a dummy small matrix if error
    const qr = QRCode.create('https://cyberempirex.org', { errorCorrectionLevel: 'M' });
    return {
      size: qr.modules.size,
      data: qr.modules.data
    };
  }
}

/**
 * Checks if a cell (row, col) is part of the 3 main Finder Patterns (corner squares)
 */
export function isFinderPattern(row: number, col: number, matrixSize: number): boolean {
  // Top-Left Finder
  if (row < 7 && col < 7) return true;
  // Top-Right Finder
  if (row < 7 && col >= matrixSize - 7) return true;
  // Bottom-Left Finder
  if (row >= matrixSize - 7 && col < 7) return true;
  return false;
}

/**
 * Renders QR code onto HTML Canvas Element
 */
export function drawQrToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  options: QrRenderOptions
) {
  const matrix = getQrMatrix(text, options.ecl);
  const matrixSize = matrix.size;
  const marginModules = options.margin;
  const totalModules = matrixSize + marginModules * 2;

  const width = options.size;
  const height = options.size;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear Canvas
  ctx.clearRect(0, 0, width, height);

  // Background
  if (!options.transparentBg) {
    ctx.fillStyle = options.bgColor;
    ctx.fillRect(0, 0, width, height);
  }

  const moduleSize = width / totalModules;
  const fg = options.fgColor;

  ctx.fillStyle = fg;

  // Determine logo clear area (center 20% if logo is enabled)
  const hasLogo = options.logo !== 'none';
  const logoModules = hasLogo ? Math.floor(matrixSize * 0.22) : 0;
  const centerStart = Math.floor((matrixSize - logoModules) / 2);
  const centerEnd = centerStart + logoModules;

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      const idx = r * matrixSize + c;
      const isDark = matrix.data[idx] === 1;

      // Skip modules under the logo to ensure scannability
      if (hasLogo && r >= centerStart && r < centerEnd && c >= centerStart && c < centerEnd) {
        continue;
      }

      if (!isDark) continue;

      const x = (c + marginModules) * moduleSize;
      const y = (r + marginModules) * moduleSize;

      const isFinder = isFinderPattern(r, c, matrixSize);

      if (isFinder) {
        // Draw Finder Pattern with sharp/rounded rectangle for crisp look
        ctx.fillStyle = fg;
        if (options.style === 'rounded' || options.style === 'dots') {
          ctx.beginPath();
          ctx.roundRect(x, y, moduleSize, moduleSize, moduleSize * 0.25);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, moduleSize, moduleSize);
        }
        continue;
      }

      // Body Modules Styling based on option
      ctx.fillStyle = fg;

      switch (options.style) {
        case 'rounded': {
          ctx.beginPath();
          const radius = moduleSize * 0.35;
          ctx.roundRect(x + moduleSize * 0.05, y + moduleSize * 0.05, moduleSize * 0.9, moduleSize * 0.9, radius);
          ctx.fill();
          break;
        }
        case 'dots': {
          ctx.beginPath();
          const centerX = x + moduleSize / 2;
          const centerY = y + moduleSize / 2;
          const radius = moduleSize * 0.42;
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case 'minimal': {
          ctx.beginPath();
          const centerX = x + moduleSize / 2;
          const centerY = y + moduleSize / 2;
          const radius = moduleSize * 0.35;
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case 'classic':
        default: {
          ctx.fillRect(x, y, moduleSize, moduleSize);
          break;
        }
      }
    }
  }

  // Draw Logo Overlay in the Center
  if (hasLogo) {
    const logoSize = logoModules * moduleSize;
    const logoX = (centerStart + marginModules) * moduleSize;
    const logoY = (centerStart + marginModules) * moduleSize;
    const cx = logoX + logoSize / 2;
    const cy = logoY + logoSize / 2;
    const r = logoSize / 2 + 1;

    // Circular logo background container (no white square border)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = options.transparentBg ? '#FFFFFF' : options.bgColor;
    ctx.fill();

    // Clip image inside circular emblem
    ctx.beginPath();
    ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
    ctx.clip();

    if (options.logo === 'cyberempirex') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
      };
      img.src = brandSymbol;
      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
      }
    } else if (options.logo === 'custom' && options.customLogoUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
      };
      img.src = options.customLogoUrl;
    }
    ctx.restore();
  }
}

/**
 * Generates an SVG string representation of the QR code
 */
export function generateQrSvgString(text: string, options: QrRenderOptions): string {
  const matrix = getQrMatrix(text, options.ecl);
  const matrixSize = matrix.size;
  const marginModules = options.margin;
  const totalModules = matrixSize + marginModules * 2;
  const width = options.size;
  const height = options.size;
  const moduleSize = width / totalModules;

  let bgRect = '';
  if (!options.transparentBg) {
    bgRect = `<rect width="${width}" height="${height}" fill="${options.bgColor}"/>`;
  }

  const hasLogo = options.logo !== 'none';
  const logoModules = hasLogo ? Math.floor(matrixSize * 0.22) : 0;
  const centerStart = Math.floor((matrixSize - logoModules) / 2);
  const centerEnd = centerStart + logoModules;

  let shapes = '';

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      const idx = r * matrixSize + c;
      if (matrix.data[idx] !== 1) continue;

      if (hasLogo && r >= centerStart && r < centerEnd && c >= centerStart && c < centerEnd) {
        continue;
      }

      const x = (c + marginModules) * moduleSize;
      const y = (r + marginModules) * moduleSize;
      const isFinder = isFinderPattern(r, c, matrixSize);

      if (isFinder || options.style === 'classic') {
        shapes += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${moduleSize.toFixed(2)}" height="${moduleSize.toFixed(2)}" fill="${options.fgColor}"/>`;
      } else if (options.style === 'rounded') {
        const rx = (moduleSize * 0.35).toFixed(2);
        shapes += `<rect x="${(x + moduleSize * 0.05).toFixed(2)}" y="${(y + moduleSize * 0.05).toFixed(2)}" width="${(moduleSize * 0.9).toFixed(2)}" height="${(moduleSize * 0.9).toFixed(2)}" rx="${rx}" fill="${options.fgColor}"/>`;
      } else if (options.style === 'dots' || options.style === 'minimal') {
        const cx = (x + moduleSize / 2).toFixed(2);
        const cy = (y + moduleSize / 2).toFixed(2);
        const rad = (moduleSize * 0.42).toFixed(2);
        shapes += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${options.fgColor}"/>`;
      }
    }
  }

  let logoSvg = '';
  if (hasLogo) {
    const logoSize = logoModules * moduleSize;
    const logoX = (centerStart + marginModules) * moduleSize;
    const logoY = (centerStart + marginModules) * moduleSize;
    const cx = (logoX + logoSize / 2).toFixed(2);
    const cy = (logoY + logoSize / 2).toFixed(2);
    const r = (logoSize / 2 + 1).toFixed(2);
    const imgR = (logoSize / 2).toFixed(2);
    const logoBg = options.transparentBg ? '#FFFFFF' : options.bgColor;
    const logoSrc = options.logo === 'cyberempirex' ? brandSymbol : (options.customLogoUrl || brandSymbol);
    const clipId = `qr-logo-clip-${Math.random().toString(36).substring(2, 7)}`;

    logoSvg = `
      <defs>
        <clipPath id="${clipId}">
          <circle cx="${cx}" cy="${cy}" r="${imgR}" />
        </clipPath>
      </defs>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${logoBg}" />
      <image href="${logoSrc}" x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${logoSize.toFixed(2)}" height="${logoSize.toFixed(2)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clipId})" />
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${bgRect}
  <g fill="${options.fgColor}">
    ${shapes}
  </g>
  ${logoSvg}
</svg>`;
}
