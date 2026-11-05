// lib/shapeShifterEngine.ts
// High-fidelity dot morphing particle engine matching https://aya-sigma-six.vercel.app/
// Recreated with video-verified dense luminous dots, zero-scatter smooth transitions, and exact timing.

export interface PointData {
  x?: number;
  y?: number;
  z?: number;
  a?: number;
  h?: number;
}

export class SPoint {
  x: number;
  y: number;
  z: number;
  a: number;
  h: number;

  constructor(args: PointData = {}) {
    this.x = args.x !== undefined ? args.x : 0;
    this.y = args.y !== undefined ? args.y : 0;
    this.z = args.z !== undefined ? args.z : 3.5;
    this.a = args.a !== undefined ? args.a : 1;
    this.h = args.h !== undefined ? args.h : 0;
  }
}

export class SColor {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor(r: number, g: number, b: number, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  render(): string {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 159, b: 203 }; // Luminous soft pink matching video
}

export class SDot {
  p: SPoint;
  e: number;
  s: boolean;
  c: SColor;
  t: SPoint;
  q: SPoint[];
  private isMobile: boolean;

  constructor(x: number, y: number, colorHex: string, isMobile: boolean) {
    this.isMobile = isMobile;
    const initialSize = isMobile ? 2.2 : 3.5;
    this.p = new SPoint({
      x,
      y,
      z: initialSize,
      a: 1,
      h: 0,
    });
    this.e = 0.08;
    this.s = true;

    const rgb = hexToRgb(colorHex);
    this.c = new SColor(rgb.r, rgb.g, rgb.b, this.p.a);
    this.t = this.clone(this.p);
    this.q = [];
  }

  clone(p: SPoint): SPoint {
    return new SPoint({
      x: p.x,
      y: p.y,
      z: p.z,
      a: p.a,
      h: p.h,
    });
  }

  draw(ctx: CanvasRenderingContext2D, colorHex: string) {
    if (this.p.a <= 0.01 || this.p.z <= 0.2) return;

    const rgb = hexToRgb(colorHex);
    this.c.r = rgb.r;
    this.c.g = rgb.g;
    this.c.b = rgb.b;
    this.c.a = Math.max(0, Math.min(1, this.p.a));

    // Luminous soft pink glow as observed in video
    ctx.shadowColor = "#ff69b4";
    ctx.shadowBlur = this.isMobile ? 4 : 7;
    ctx.fillStyle = this.c.render();
    ctx.beginPath();
    ctx.arc(this.p.x, this.p.y, Math.max(0.6, this.p.z), 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  distanceTo(n: SPoint): number {
    const dx = this.p.x - n.x;
    const dy = this.p.y - n.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  moveTowards(n: SPoint): boolean {
    const dx = n.x - this.p.x;
    const dy = n.y - this.p.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const e = this.e * d;

    if (this.p.h === -1) {
      this.p.x = n.x;
      this.p.y = n.y;
      return true;
    }

    if (d > 1) {
      this.p.x += (dx / d) * e;
      this.p.y += (dy / d) * e;
    } else {
      if (this.p.h > 0) {
        this.p.h--;
      } else {
        return true;
      }
    }
    return false;
  }

  update() {
    if (this.moveTowards(this.t)) {
      const nextP = this.q.shift();
      if (nextP) {
        this.t.x = nextP.x !== undefined ? nextP.x : this.p.x;
        this.t.y = nextP.y !== undefined ? nextP.y : this.p.y;
        this.t.z = nextP.z !== undefined ? nextP.z : this.p.z;
        this.t.a = nextP.a !== undefined ? nextP.a : this.p.a;
        this.p.h = nextP.h || 0;
      } else {
        if (this.s) {
          // Subtle organic idle vibration matching Kenneth Cachia's dot physics
          const amplitude = this.isMobile ? 0.08 : 0.45;
          this.p.x -= Math.sin(Math.random() * amplitude);
          this.p.y -= Math.sin(Math.random() * amplitude);
        } else {
          // Unused dots fade to 0 opacity in place without scattering
          this.t.a = 0;
        }
      }
    }

    const da = this.p.a - this.t.a;
    this.p.a = Math.max(0, this.p.a - da * 0.08);
    const dz = this.p.z - this.t.z;
    this.p.z = Math.max(0.5, this.p.z - dz * 0.08);
  }

  move(p: SPoint, avoidStatic = false) {
    if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
      this.q.push(p);
    }
  }
}

export class ShapeShifterEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private shapeCanvas: HTMLCanvasElement;
  private shapeContext: CanvasRenderingContext2D;
  private dots: SDot[] = [];
  private colorHex: string;
  private animId: number | null = null;
  private isMobile = false;
  private fontFamily =
    'Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  private width = 0;
  private height = 0;
  private cx = 0;
  private cy = 0;

  constructor(canvas: HTMLCanvasElement, colorHex = "#ff9fcb") {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get 2d context for canvas");
    this.ctx = context;
    this.colorHex = colorHex;

    this.shapeCanvas = document.createElement("canvas");
    const sContext = this.shapeCanvas.getContext("2d");
    if (!sContext) throw new Error("Could not get 2d context for shapeCanvas");
    this.shapeContext = sContext;

    this.isMobile =
      typeof window !== "undefined" &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
        window.innerWidth < 768);

    this.resize();
  }

  setColor(colorHex: string) {
    this.colorHex = colorHex;
  }

  resize() {
    if (typeof window === "undefined") return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    const gap = this.getGap();
    this.shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
    this.shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
    this.shapeContext.fillStyle = "red";
    this.shapeContext.textBaseline = "middle";
    this.shapeContext.textAlign = "center";
  }

  // Gap between dots: smaller gap = much denser, thicker characters matching video!
  private getGap(): number {
    return this.isMobile ? 4 : 5;
  }

  private setFontSize(s: number) {
    this.shapeContext.font = `bold ${s}px ${this.fontFamily}`;
  }

  private processCanvas(): { dots: SPoint[]; w: number; h: number } {
    const gap = this.getGap();
    const pixels = this.shapeContext.getImageData(
      0,
      0,
      this.shapeCanvas.width,
      this.shapeCanvas.height
    ).data;

    const dots: SPoint[] = [];
    let x = 0;
    let y = 0;
    let fx = this.shapeCanvas.width;
    let fy = this.shapeCanvas.height;
    let w = 0;
    let h = 0;

    for (let p = 0; p < pixels.length; p += 4 * gap) {
      if (pixels[p + 3] > 0) {
        dots.push(new SPoint({ x, y }));
        w = x > w ? x : w;
        h = y > h ? y : h;
        fx = x < fx ? x : fx;
        fy = y < fy ? y : fy;
      }
      x += gap;
      if (x >= this.shapeCanvas.width) {
        x = 0;
        y += gap;
        p += gap * 4 * this.shapeCanvas.width;
      }
    }

    return { dots, w: w + fx, h: h + fy };
  }

  private rasterizeLetter(l: string): { dots: SPoint[]; w: number; h: number } {
    const isSmallScreen = window.innerWidth < 768;
    const baseFontSize = this.isMobile || isSmallScreen ? 250 : 500;
    const isNum = !isNaN(parseFloat(l)) && isFinite(Number(l));

    this.shapeContext.clearRect(
      0,
      0,
      this.shapeCanvas.width,
      this.shapeCanvas.height
    );

    // If letter is Heart symbol, draw a perfectly formed filled heart
    if (l === "❤" || l === "❤️") {
      const heartSize = this.isMobile || isSmallScreen ? 140 : 250;
      const hx = this.shapeCanvas.width / 2;
      const hy = this.shapeCanvas.height / 2 - heartSize * 0.35;

      this.shapeContext.fillStyle = "red";
      this.shapeContext.beginPath();
      const topCurveHeight = heartSize * 0.3;
      this.shapeContext.moveTo(hx, hy + topCurveHeight);
      // top left curve
      this.shapeContext.bezierCurveTo(
        hx,
        hy,
        hx - heartSize / 2,
        hy,
        hx - heartSize / 2,
        hy + topCurveHeight
      );
      // bottom left curve
      this.shapeContext.bezierCurveTo(
        hx - heartSize / 2,
        hy + (heartSize + topCurveHeight) / 2,
        hx,
        hy + (heartSize + topCurveHeight) / 1.4,
        hx,
        hy + heartSize
      );
      // bottom right curve
      this.shapeContext.bezierCurveTo(
        hx,
        hy + (heartSize + topCurveHeight) / 1.4,
        hx + heartSize / 2,
        hy + (heartSize + topCurveHeight) / 2,
        hx + heartSize / 2,
        hy + topCurveHeight
      );
      // top right curve
      this.shapeContext.bezierCurveTo(
        hx + heartSize / 2,
        hy,
        hx,
        hy,
        hx,
        hy + topCurveHeight
      );
      this.shapeContext.closePath();
      this.shapeContext.fill();

      return this.processCanvas();
    }

    this.setFontSize(baseFontSize);
    const measuredW = this.shapeContext.measureText(l).width || 1;

    const s = Math.min(
      baseFontSize,
      (this.shapeCanvas.width / measuredW) * 0.82 * baseFontSize,
      (this.shapeCanvas.height / baseFontSize) * (isNum ? 0.78 : 0.36) * baseFontSize
    );

    this.setFontSize(s);
    this.shapeContext.fillStyle = "red";
    this.shapeContext.fillText(
      l,
      this.shapeCanvas.width / 2,
      this.shapeCanvas.height / 2
    );

    return this.processCanvas();
  }

  private getDotCreationParams() {
    const isSmallScreen = window.innerWidth < 768;
    if (this.isMobile || isSmallScreen) {
      return { minSize: 1.5, maxSize: 4, minZ: 2.2, maxZ: 3.5 };
    }
    return { minSize: 2.5, maxSize: 9, minZ: 3.5, maxZ: 6.5 };
  }

  switchShape(word: string, fast = false) {
    if (!word || word.trim() === "") {
      // Gentle fade-out in place without scattering
      this.dots.forEach((dot) => {
        dot.s = false;
        dot.e = 0.08;
        dot.move(
          new SPoint({
            x: dot.p.x,
            y: dot.p.y,
            a: 0,
            z: 1,
            h: 0,
          })
        );
      });
      return;
    }

    const n = this.rasterizeLetter(word);
    this.width = n.w;
    this.height = n.h;
    this.cx = this.canvas.width / 2 - this.width / 2;
    this.cy = this.canvas.height / 2 - this.height / 2;

    const params = this.getDotCreationParams();

    // Spawn new dots from the exact center of the current numeral/word
    if (n.dots.length > this.dots.length) {
      const extra = n.dots.length - this.dots.length;
      const spawnX = this.cx + this.width / 2;
      const spawnY = this.cy + this.height / 2;
      for (let d = 0; d < extra; d++) {
        this.dots.push(
          new SDot(spawnX, spawnY, this.colorHex, this.isMobile)
        );
      }
    }

    let d = 0;
    while (n.dots.length > 0) {
      const i = Math.floor(Math.random() * n.dots.length);
      this.dots[d].e = this.isMobile ? 0.35 : 0.13;

      if (this.dots[d].s) {
        // Hold for 14 frames while shimmer/morph begins
        this.dots[d].move(
          new SPoint({
            z:
              Math.random() * (params.maxSize - params.minSize) +
              params.minSize,
            a: Math.random() * 0.3 + 0.7,
            h: 14,
          })
        );
      } else {
        this.dots[d].move(
          new SPoint({
            z: Math.random() * params.minZ + params.minZ,
            h: fast ? 12 : 20,
          })
        );
      }

      this.dots[d].s = true;
      // Morph directly into the new stroke coordinates
      this.dots[d].move(
        new SPoint({
          x: n.dots[i].x + this.cx,
          y: n.dots[i].y + this.cy,
          a: 1,
          z: params.minZ,
          h: 0,
        })
      );

      n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1));
      d++;
    }

    // Unused dots fade out gracefully in their current positions
    for (let i = d; i < this.dots.length; i++) {
      if (this.dots[i].s) {
        this.dots[i].s = false;
        this.dots[i].e = 0.08;
        this.dots[i].move(
          new SPoint({
            x: this.dots[i].p.x,
            y: this.dots[i].p.y,
            a: 0,
            z: params.minZ,
            h: 0,
          })
        );
      }
    }
  }

  start() {
    this.stop();
    const loop = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].update();
        this.dots[i].draw(this.ctx, this.colorHex);
      }
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
