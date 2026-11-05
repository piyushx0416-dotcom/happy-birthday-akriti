/**
 * Background Audio Engine: One of the Girls (with JENNIE & Lily-Rose Depp) - The Weeknd
 * Zero-UI automatic background music engine.
 */

type AudioListener = (isPlaying: boolean) => void;

class BackgroundSoundtrack {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isInitialized: boolean = false;
  private listeners: Set<AudioListener> = new Set();
  private retryTimer: ReturnType<typeof setInterval> | null = null;

  public init() {
    if (this.isInitialized || typeof window === "undefined") return;
    this.isInitialized = true;

    // 1. Locate existing DOM element or create new audio element
    let audio = document.getElementById("her-universe-soundtrack") as HTMLAudioElement | null;
    if (!audio) {
      audio = new Audio("/assets/music/one-of-the-girls.mp3");
      audio.id = "her-universe-soundtrack";
    }

    audio.loop = true;
    audio.volume = 0.85;
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    (audio as any).playsInline = true;
    this.audio = audio;

    audio.addEventListener("play", () => this.notifyListeners(true));
    audio.addEventListener("playing", () => this.notifyListeners(true));
    audio.addEventListener("pause", () => this.notifyListeners(false));
    audio.addEventListener("ended", () => {
      audio?.play().catch(() => {});
    });

    // 2. Attach global transparent event listeners across window and document
    const triggerAudio = () => {
      this.play();
    };

    const events = [
      "pointerdown",
      "pointerup",
      "pointermove",
      "touchstart",
      "touchend",
      "touchmove",
      "mousedown",
      "mouseup",
      "click",
      "keydown",
      "wheel",
      "scroll",
      "focus",
      "pageshow",
      "visibilitychange",
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, triggerAudio, { capture: true, passive: true });
      document.addEventListener(evt, triggerAudio, { capture: true, passive: true });
    });

    // 3. Attempt immediate autoplay
    this.play();

    // 4. Background retry loop: continuously tries to start music until playing
    let attempts = 0;
    this.retryTimer = setInterval(() => {
      attempts++;
      if (this.audio && !this.audio.paused) {
        if (this.retryTimer) {
          clearInterval(this.retryTimer);
          this.retryTimer = null;
        }
      } else {
        this.play();
      }
      if (attempts > 50) {
        if (this.retryTimer) {
          clearInterval(this.retryTimer);
          this.retryTimer = null;
        }
      }
    }, 350);
  }

  public play() {
    if (!this.isInitialized) {
      this.init();
      return;
    }

    if (!this.audio) return;

    // Resume AudioContext if suspended
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume().catch(() => {});
      }
    } catch {}

    this.audio.muted = false;
    this.audio.volume = 0.85;

    if (this.audio.paused) {
      const p = this.audio.play();
      if (p !== undefined) {
        p.then(() => {
          this.notifyListeners(true);
          if (this.retryTimer) {
            clearInterval(this.retryTimer);
            this.retryTimer = null;
          }
        }).catch(() => {
          // Autoplay awaiting user interaction
        });
      }
    }
  }

  public pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  public toggle(): boolean {
    this.init();
    if (!this.audio) return false;
    if (this.audio.paused) {
      this.play();
      return true;
    } else {
      this.pause();
      return false;
    }
  }

  public isPlaying(): boolean {
    return this.audio ? !this.audio.paused : false;
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(playing: boolean) {
    this.listeners.forEach((listener) => {
      try {
        listener(playing);
      } catch {}
    });
  }

  // Backwards compatibility methods
  public playWaxSeal() {}
  public playChime(_pitch?: number) {}
  public playCardFlip() {}
  public playCelebrationChime() {}
  public toggleMute(): boolean {
    return this.toggle();
  }
  public getIsPlaying(): boolean {
    return this.isPlaying();
  }
}

export const backgroundMusic = new BackgroundSoundtrack();
export const soundEngine = backgroundMusic;
export const ambientSound = backgroundMusic;

// Auto-initialize as early as possible in browser environment
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => backgroundMusic.init(), { once: true });
  } else {
    backgroundMusic.init();
  }
}
