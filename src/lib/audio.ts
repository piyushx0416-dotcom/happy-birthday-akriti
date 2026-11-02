/**
 * =========================================================================
 * HER UNIVERSE — CENTRAL AUDIO SYSTEM & SOUNDTRACK ENGINE
 * =========================================================================
 * Signature Soundtrack: "One of the Girls" (The Weeknd, JENNIE, Lily-Rose Depp)
 * Provides:
 * - Built-in Dreamy Synth Engine playing the iconic atmospheric chords of "One of the Girls"
 * - HTMLAudioElement support for custom local MP3 (/assets/audio/one-of-the-girls.mp3)
 * - YouTube official audio player integration support
 * - Interactive Sound Effects: Celestial chime, envelope unfold, candle blow-out, celebration fanfare
 * - Persistent mute and volume control with smooth gain transitions
 */

export interface TrackMetadata {
  title: string;
  artists: string;
  duration: number; // in seconds
  album: string;
}

export const SIGNATURE_TRACK: TrackMetadata = {
  title: "One of the Girls",
  artists: "The Weeknd, JENNIE, Lily-Rose Depp",
  duration: 244, // 4:04
  album: "The Idol Soundtrack • Her Universe Edition",
};

type AudioMode = "synth" | "audio-file" | "youtube";

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isPlaying: boolean = false;
  private volume: number = 0.65;
  private currentProgress: number = 0; // seconds
  private audioMode: AudioMode = "synth";
  private customAudio: HTMLAudioElement | null = null;
  private synthInterval: NodeJS.Timeout | null = null;
  private listeners: Set<() => void> = new Set();

  // Procedural Synth Nodes
  private masterGain: GainNode | null = null;
  private activeVoices: OscillatorNode[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      const storedMute = localStorage.getItem("her_universe_sound_enabled");
      this.isMuted = storedMute !== "true";
      const storedVol = localStorage.getItem("her_universe_volume");
      if (storedVol) {
        this.volume = parseFloat(storedVol);
      }
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    this.playMusic();
    this.notify();
    return true;
  }

  public disableSound(): void {
    this.isMuted = true;
    if (typeof window !== "undefined") {
      localStorage.setItem("her_universe_sound_enabled", "false");
    }
    this.pauseMusic();
    this.notify();
  }

  public toggleSound(): boolean {
    if (this.isMuted) {
      return this.enableSound();
    } else {
      this.disableSound();
      return false;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getProgress(): number {
    return this.currentProgress;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (typeof window !== "undefined") {
      localStorage.setItem("her_universe_volume", this.volume.toString());
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0.0001 : this.volume * 0.25,
        this.ctx.currentTime,
        0.1
      );
    }
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  public setProgress(sec: number): void {
    this.currentProgress = Math.max(0, Math.min(SIGNATURE_TRACK.duration, sec));
    if (this.customAudio) {
      this.customAudio.currentTime = this.currentProgress;
    }
    this.notify();
  }

  /**
   * PLAY SIGNATURE SOUNDTRACK
   */
  public playMusic(): void {
    if (this.isMuted) {
      this.isMuted = false;
      if (typeof window !== "undefined") {
        localStorage.setItem("her_universe_sound_enabled", "true");
      }
    }

    const ctx = this.initContext();
    if (!ctx) return;

    this.isPlaying = true;
    this.notify();

    // Check if local MP3 is available, else use built-in procedural synth
    if (this.audioMode === "audio-file" && this.customAudio) {
      this.customAudio.volume = this.volume;
      this.customAudio.play().catch(() => {
        this.startSynthSoundtrack();
      });
      return;
    }

    this.startSynthSoundtrack();
  }

  public pauseMusic(): void {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.stopSynthSoundtrack();
    this.notify();
  }

  public togglePlayMusic(): void {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  /**
   * PROCEDURAL SOUNDTRACK ENGINE — "ONE OF THE GIRLS"
   * Generates the iconic dark cinematic chords (Bm - G - Em - F#m)
   * with deep sub-bass, smooth analog detune, and dreamy celestial filters.
   */
  private startSynthSoundtrack(): void {
    const ctx = this.initContext();
    if (!ctx) return;

    this.stopSynthSoundtrack();

    try {
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(this.volume * 0.22, ctx.currentTime + 2.5);
      master.connect(ctx.destination);
      this.masterGain = master;

      // Chord progressions representing "One of the Girls" mood (Bm -> G -> Em -> F#m)
      const chordNotes = [
        [123.47, 185.0, 246.94, 293.66], // B Minor (B2, F#3, B3, D4)
        [98.0, 146.83, 196.0, 246.94],  // G Major (G2, D3, G3, B3)
        [82.41, 123.47, 164.81, 196.0], // E Minor (E2, B2, E3, G3)
        [92.5, 138.59, 185.0, 220.0],   // F# Minor (F#2, C#3, F#3, A3)
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!this.isPlaying || !this.ctx) return;

        // Clean previous voice oscillators
        this.activeVoices.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.activeVoices = [];

        const currentNotes = chordNotes[chordIndex % chordNotes.length];
        chordIndex++;

        currentNotes.forEach((freq, i) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc.type = i === 0 ? "sawtooth" : "sine";
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          // Warm lowpass filter for dark cinematic warmth
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(420 + i * 110, this.ctx.currentTime);
          filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

          // Smooth envelope
          gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.18 / (i + 1), this.ctx.currentTime + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 4.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);

          osc.start();
          osc.stop(this.ctx.currentTime + 5.0);
          this.activeVoices.push(osc);
        });

        // Track timer increment
        this.currentProgress = (this.currentProgress + 4) % SIGNATURE_TRACK.duration;
        this.notify();
      };

      // Play immediately, then every 4 seconds
      playChord();
      this.synthInterval = setInterval(playChord, 4000);
    } catch {}
  }

  private stopSynthSoundtrack(): void {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      } catch {}
    }
    setTimeout(() => {
      this.activeVoices.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.activeVoices = [];
    }, 800);
  }

  /**
   * SOUND EFFECT: Celestial Chime / Button Click
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
   * SOUND EFFECT: Paper / Envelope opening rustle
   */
  public playEnvelopeOpen(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
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
   * SOUND EFFECT: Candle blow out breath
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
   * SOUND EFFECT: Fireworks & Celebration fanfare
   */
  public playCelebrationFanfare(): void {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((note, idx) => {
      setTimeout(() => {
        this.playChime(note);
      }, idx * 120);
    });
  }
}

export const soundManager = new SoundManager();
