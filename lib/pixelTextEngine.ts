// lib/pixelTextEngine.ts
// Balanced Pixel / Dot Matrix Engine
// Natural letter spacing & authentic font: Avenir / Helvetica Neue / Arial Bold
// Perfectly proportioned, centered in the middle, never too big or narrow-spaced.

interface DotState {
  currentX: number;
  currentY: number;
  currentAlpha: number;
  currentRadius: number;
  targetX: number;
  targetY: number;
  targetAlpha: number;
  targetRadius: number;
}

export class PixelTextEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D;
  private dots: DotState[] = [];
  private animId: number | null = null;
  private isMobile = false;
  private dpr = 1;
  private color = "#FF69B4";
  private glowColor = "#FF1493";

  constructor(canvas: HTMLCanvasElement, color = "#FF69B4") {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    this.ctx = ctx;
    this.color = color;

    this.offscreenCanvas = document.createElement("canvas");
    const offCtx = this.offscreenCanvas.getContext("2d");
    if (!offCtx) throw new Error("Could not get offscreen canvas context");
    this.offscreenCtx = offCtx;

    this.resize();
  }

  public resize() {
    if (typeof window === "undefined") return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const cssWidth = window.innerWidth;
    const cssHeight = window.innerHeight;

    // High-DPI physical backing resolution for razor-sharp rendering on Retina/4K displays
    this.canvas.width = Math.floor(cssWidth * this.dpr);
    this.canvas.height = Math.floor(cssHeight * this.dpr);
    this.canvas.style.width = `${cssWidth}px`;
    this.canvas.style.height = `${cssHeight}px`;

    // Offscreen rasterization canvas operates at exact CSS viewport dimensions
    this.offscreenCanvas.width = cssWidth;
    this.offscreenCanvas.height = cssHeight;

    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || cssWidth < 768;
  }

  // Integer gap strictly required for typed-array pixel sampling
  private getGap(): number {
    return this.isMobile ? 4 : 5;
  }

  // Dot radius matching the clean circular pixels in reference
  private getDotRadius(): number {
    return this.isMobile ? 1.9 : 2.3;
  }

  private rasterizeText(text: string): { x: number; y: number }[] {
    const width = this.offscreenCanvas.width;
    const height = this.offscreenCanvas.height;
    if (width === 0 || height === 0) return [];

    this.offscreenCanvas.width = width;
    this.offscreenCanvas.height = height;
    this.offscreenCtx.clearRect(0, 0, width, height);

    const isNum = !isNaN(Number(text));
    const isSmall = width < 768;

    if (text === "❤️" || text === "heart") {
      // Draw Heart centered in middle, matching the larger words
      const heartSize = isSmall ? Math.min(width * 0.42, height * 0.42, 190) : 250;
      this.offscreenCtx.save();
      this.offscreenCtx.translate(width / 2, height / 2);
      const s = heartSize / 24;
      this.offscreenCtx.scale(s, s);
      this.offscreenCtx.translate(-12, -12);
      this.offscreenCtx.fillStyle = "red";
      const path = new Path2D(
        "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      );
      this.offscreenCtx.fill(path);
      this.offscreenCtx.restore();
    } else {
      // Authentic reference font: Avenir / Helvetica Neue / Arial (clean open spacing)
      const cleanFontFamily =
        'Avenir, "Helvetica Neue", Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

      if (isNum) {
        // Numbers: height ~38-40% of viewport height (STRICTLY UNCHANGED)
        const fontSize = Math.min(height * 0.40, isSmall ? 180 : 300);
        this.offscreenCtx.font = `bold ${fontSize}px ${cleanFontFamily}`;
        this.offscreenCtx.fillStyle = "red";
        this.offscreenCtx.textAlign = "center";
        this.offscreenCtx.textBaseline = "middle";
        this.offscreenCtx.fillText(text, width / 2, height / 2);
      } else {
        // Words (Happy, Birthday, Akriti):
        // Prominently sized as requested while numbers remain strictly untouched
        let fontSize = Math.min(height * 0.33, isSmall ? 100 : 175);
        this.offscreenCtx.font = `bold ${fontSize}px ${cleanFontFamily}`;
        let textWidth = this.offscreenCtx.measureText(text).width;

        // Bounded so it sits gracefully and boldly in the middle
        const maxWidth = isSmall ? width * 0.80 : Math.min(width * 0.62, 720);
        if (textWidth > maxWidth) {
          fontSize = Math.floor(fontSize * (maxWidth / textWidth));
          this.offscreenCtx.font = `bold ${fontSize}px ${cleanFontFamily}`;
        }

        this.offscreenCtx.fillStyle = "red";
        this.offscreenCtx.textAlign = "center";
        this.offscreenCtx.textBaseline = "middle";
        this.offscreenCtx.fillText(text, width / 2, height / 2);
      }
    }

    // Sample pixels on a regular integer grid
    const gap = this.getGap();
    const imgData = this.offscreenCtx.getImageData(0, 0, width, height).data;
    const points: { x: number; y: number }[] = [];

    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const iy = Math.floor(y);
        const ix = Math.floor(x);
        const index = (iy * width + ix) * 4;
        if (imgData[index + 3] > 60) {
          points.push({ x: ix, y: iy });
        }
      }
    }

    // Mathematical Dead-Center Realignment
    // Ensures text is strictly in the center both horizontally and vertically
    if (points.length > 0) {
      let minX = width;
      let maxX = 0;
      let minY = height;
      let maxY = 0;

      for (const p of points) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      }

      const actualCenterX = (minX + maxX) / 2;
      const actualCenterY = (minY + maxY) / 2;
      const shiftX = Math.round(width / 2 - actualCenterX);
      const shiftY = Math.round(height / 2 - actualCenterY);

      for (const p of points) {
        p.x += shiftX;
        p.y += shiftY;
      }
    }

    return points;
  }

  public switchShape(text: string) {
    if (!text || text.trim() === "") {
      // Fade out all dots in place smoothly
      for (const dot of this.dots) {
        dot.targetAlpha = 0;
        dot.targetRadius = 0;
      }
      return;
    }

    const newPoints = this.rasterizeText(text);
    if (newPoints.length === 0) return;

    const targetRadius = this.getDotRadius();

    // Spatial sorting: sort by Y then X so dots pair naturally from top-left to bottom-right
    // This completely prevents crisscrossing or scattering
    const activeDots = this.dots.filter((d) => d.currentAlpha > 0.05);
    activeDots.sort(
      (a, b) => a.currentY * 10000 + a.currentX - (b.currentY * 10000 + b.currentX)
    );
    newPoints.sort((a, b) => a.y * 10000 + a.x - (b.y * 10000 + b.x));

    const numToReuse = Math.min(activeDots.length, newPoints.length);

    // Reuse existing dots to morph smoothly into closest target points
    for (let i = 0; i < numToReuse; i++) {
      activeDots[i].targetX = newPoints[i].x;
      activeDots[i].targetY = newPoints[i].y;
      activeDots[i].targetAlpha = 1;
      activeDots[i].targetRadius = targetRadius;
    }

    // If new points need more dots, spawn new dots right at their target points
    // with alpha = 0 and bloom into view!
    if (newPoints.length > activeDots.length) {
      for (let i = activeDots.length; i < newPoints.length; i++) {
        const pt = newPoints[i];
        this.dots.push({
          currentX: pt.x,
          currentY: pt.y,
          currentAlpha: 0,
          currentRadius: 0,
          targetX: pt.x,
          targetY: pt.y,
          targetAlpha: 1,
          targetRadius: targetRadius,
        });
      }
    }

    // If fewer points needed, extra active dots fade out in place
    if (activeDots.length > newPoints.length) {
      for (let i = newPoints.length; i < activeDots.length; i++) {
        activeDots[i].targetAlpha = 0;
        activeDots[i].targetRadius = 0;
      }
    }
  }

  public start() {
    this.stop();

    const loop = () => {
      // Clear entire canvas at raw backing pixel resolution
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Scale context to devicePixelRatio for razor-sharp subpixel vector circles and glowing text
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

      this.ctx.shadowColor = this.glowColor;
      this.ctx.shadowBlur = (this.isMobile ? 4 : 6) * this.dpr;

      // Clean accumulated inactive dots if list gets too large
      if (this.dots.length > 5500) {
        this.dots = this.dots.filter(
          (d) => d.currentAlpha > 0.01 || d.targetAlpha > 0
        );
      }

      for (let i = 0; i < this.dots.length; i++) {
        const d = this.dots[i];

        // Smooth easing towards target position, radius, and opacity
        d.currentX += (d.targetX - d.currentX) * 0.18;
        d.currentY += (d.targetY - d.currentY) * 0.18;
        d.currentAlpha += (d.targetAlpha - d.currentAlpha) * 0.16;
        d.currentRadius += (d.targetRadius - d.currentRadius) * 0.16;

        if (d.currentAlpha > 0.02 && d.currentRadius > 0.2) {
          // Living pixel subtle organic micro-vibration when settled
          const isSettled =
            Math.abs(d.targetX - d.currentX) < 1 &&
            Math.abs(d.targetY - d.currentY) < 1;
          const jitterX = isSettled ? (Math.random() - 0.5) * 0.25 : 0;
          const jitterY = isSettled ? (Math.random() - 0.5) * 0.25 : 0;

          this.ctx.fillStyle = `rgba(255, 105, 180, ${d.currentAlpha})`;
          this.ctx.beginPath();
          this.ctx.arc(
            d.currentX + jitterX,
            d.currentY + jitterY,
            Math.max(0.4, d.currentRadius),
            0,
            Math.PI * 2
          );
          this.ctx.fill();
        }
      }

      this.ctx.shadowBlur = 0;
      this.animId = requestAnimationFrame(loop);
    };

    loop();
  }

  public stop() {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }
}
