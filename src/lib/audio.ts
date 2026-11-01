/**
 * =========================================================================
 * HER UNIVERSE — CENTRAL AUDIO SYSTEM (Web Audio API + Audio Asset Support)
 * =========================================================================
 * Provides:
 * - Ambient cosmic background music (ambient drone + pentatonic chime chords)
 * - Interactive sound effects (chime click, paper envelope rustle, candle blow, fireworks fanfare)
 * - Safe fallback if no audio files are installed in public/assets/audio/
 * - Persistent mute/unmute state in localStorage
 * - Volume control with smooth fading
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private volume: number = 0.5;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private isAmbientPlaying: boolean = false;
  private customAudioCache: Record<string, HTMLAudioElement> = {};

  constructor() {
    if (typeof window !== "undefined") {
      const storedMute = localStorage.getItem("her_universe_sound_enabled");
      // Respect default muted state until user activates
      this.isMuted = storedMute !== "true";
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public enableSound(): boolean {
    this.isMuted = false;
    if (typeof window !== "undefined") {
      localStorage.setItem("her_universe_sound_enabled", "true");
    }
    this.initContext();
    this.startAmbient();
    return true;
  }

  public disableSound(): void {
    this.isMuted = true;
    if (typeof window !== "undefined") {
      localStorage.setItem("her_universe_sound_enabled", "false");
    }
    this.stopAmbient();
  }

  public toggleSound(): boolean {
    if (this.isMuted) {
      this.enableSound();
      return true;
    } else {
      this.disableSound();
      return false;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(this.volume * 0.15, this.ctx.currentTime, 0.2);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Procedural dreamy ambient synthesizer:
   * Uses gentle sine waves tuned to a celestial F# major / D# minor chord
   * with slow LFO detuning to create a deep, relaxing cosmic atmosphere.
   */
  public startAmbient(): void {
    if (this.isMuted || this.isAmbientPlaying) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      this.stopAmbient();

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(this.volume * 0.12, ctx.currentTime + 3);
      master.connect(ctx.destination);
      this.ambientGain = master;

      // Celestial F# pentatonic chord frequencies (F#2, C#3, F#3, A#3, C#4)
      const freqs = [92.5, 138.59, 185.0, 233.08, 277.18];
      this.ambientOscillators = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Add soft filter
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2 / (idx + 1), ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);

        osc.start();
        this.ambientOscillators.push(osc);
      });

      this.isAmbientPlaying = true;
    } catch {
      // Audio autoplay gracefully handled
    }
  }

  public stopAmbient(): void {
    if (!this.isAmbientPlaying) return;
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      }
      setTimeout(() => {
        this.ambientOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.ambientOscillators = [];
        this.isAmbientPlaying = false;
      }, 1000);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  /**
   * Sound effect: Celestial Chime / Button Click
   */
  public playChime(freq: number = 880): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch {}
  }

  /**
   * Sound effect: Paper / Envelope opening rustle
   */
  public playEnvelopeOpen(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      // Noise buffer for soft paper slide
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      this.playChime(1100);
    } catch {}
  }

  /**
   * Sound effect: Candle blow out breath
   */
  public playBlowCandle(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {}
  }

  /**
   * Sound effect: Fireworks & Celebration fanfare arpeggio
   */
  public playCelebrationFanfare(): void {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C Major arpeggio
    notes.forEach((note, idx) => {
      setTimeout(() => {
        this.playChime(note);
      }, idx * 120);
    });
  }

  /**
   * Optional external audio asset loader if custom MP3 is supplied
   */
  public playCustomAudio(src: string): void {
    if (this.isMuted || typeof window === "undefined") return;
    try {
      if (!this.customAudioCache[src]) {
        this.customAudioCache[src] = new Audio(src);
      }
      const audio = this.customAudioCache[src];
      audio.volume = this.volume;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}
  }
}

export const soundManager = new SoundManager();
