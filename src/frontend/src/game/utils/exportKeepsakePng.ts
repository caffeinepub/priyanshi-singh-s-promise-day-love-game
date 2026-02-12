import { DEFAULT_NAME } from '../types';

export async function exportKeepsakePng(name: string, dedication: string): Promise<void> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Set canvas dimensions
  canvas.width = 1600;
  canvas.height = 1000;

  // Load background image
  const bgImage = new Image();
  bgImage.crossOrigin = 'anonymous';
  
  await new Promise<void>((resolve, reject) => {
    bgImage.onload = () => resolve();
    bgImage.onerror = reject;
    bgImage.src = '/assets/generated/keepsake-certificate.dim_1600x1000.png';
  });

  // Draw background
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  // Add semi-transparent overlay for better text readability
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Configure text styling
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw name - always use DEFAULT_NAME
  ctx.fillStyle = '#8B2E5A';
  ctx.font = 'bold 80px Pacifico, cursive';
  ctx.fillText(DEFAULT_NAME, canvas.width / 2, canvas.height / 2 - 100);

  // Draw dedication
  ctx.fillStyle = '#6B2E5A';
  ctx.font = '40px Poppins, sans-serif';
  const maxWidth = canvas.width - 200;
  wrapText(ctx, dedication, canvas.width / 2, canvas.height / 2 + 50, maxWidth, 50);

  // Draw date
  ctx.fillStyle = '#8B2E5A';
  ctx.font = '32px Poppins, sans-serif';
  ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, canvas.height / 2 + 200);

  // Convert to blob and download
  canvas.toBlob((blob) => {
    if (!blob) {
      throw new Error('Failed to create blob');
    }
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `love-keepsake-${DEFAULT_NAME.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): void {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, currentY);
      line = words[i] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
