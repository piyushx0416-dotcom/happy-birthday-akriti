/**
 * Background Audio Engine: One of the Girls (with JENNIE & Lily-Rose Depp) - The Weeknd
 * High-reliability autoplay engine supporting modern Web Audio API and HTML5 Audio fallback.
 */

type AudioListener = (isPlaying: boolean) => void;

class BackgroundSoundtrack {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isInitialized: boolean = false;
  private listeners: Set<AudioListener> = new Set();
  private gestureListenersAttached: boolean = false;

  public init() {
    if (this.isInitialized || typeof window === "undefined") return;
    this.isInitialized = true;

    // 1. Reuse existing DOM audio element or create new
    let audio = document.getElementById("her-universe-soundtrack") as HTMLAudioElement | null;
    if (!audio) {
      audio = new Audio("/assets/music/one-of-the-girls.mp3");
      audio.id = "her-universe-soundtrack";
    }

    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    (audio as any).playsInline = true;
    this.audio = audio;

    audio.addEventListener("play", () => this.notifyListeners(true));
    audio.addEventListener("pause", () => this.notifyListeners(false));
    audio.addEventListener("playing", () => this.notifyListeners(true));
    audio.addEventListener("ended", () => {
      // Ensure continuous looping
      audio?.play().catch(() => {});
    });

    // 2. Attach comprehensive gesture listeners immediately
    this.attachGestureUnlock();

    // 3. Attempt immediate unmuted autoplay
    this.attemptAutoplay();
  }

  private attemptAutoplay() {
    if (!this.audio) return;

    // Try unmuted playback first
    this.audio.muted = false;
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Unmuted autoplay was blocked by browser policy.
        // Fall back to muted autoplay to start the audio pipeline, then unmute on first gesture.
        if (this.audio) {
          this.audio.muted = true;
          this.audio
            .play()
            .then(() => {
              this.notifyListeners(false); // Muted, so treat as waiting for audible activation
            })
            .catch(() => {
              // Both blocked, gesture unlock will start it on first touch
            });
        }
      });
    }
  }

  private attachGestureUnlock() {
    if (this.gestureListenersAttached || typeof window === "undefined") return;
    this.gestureListenersAttached = true;

    const unlock = () => {
      // 1. Resume AudioContext if suspended
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

      // 2. Unmute and start HTML5 Audio
      if (this.audio) {
        this.audio.muted = false;
        this.audio.volume = 0.75;
        if (this.audio.paused) {
          this.audio.play().then(() => {
            this.notifyListeners(true);
            this.removeGestureUnlock(unlock);
          }).catch(() => {});
        } else {
          // Already playing (was muted) -> now unmuted
          this.notifyListeners(true);
          this.removeGestureUnlock(unlock);
        }
      }
    };

    const events = [
      "pointerdown",
      "touchstart",
      "touchend",
      "mousedown",
      "mouseup",
      "click",
      "keydown",
      "wheel",
      "scroll",
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, unlock, { capture: true, passive: true });
      document.addEventListener(evt, unlock, { capture: true, passive: true });
    });
  }

  private removeGestureUnlock(handler: () => void) {
    if (typeof window === "undefined") return;
    const events = [
      "pointerdown",
      "touchstart",
      "touchend",
      "mousedown",
      "mouseup",
      "click",
      "keydown",
      "wheel",
      "scroll",
    ];
    events.forEach((evt) => {
      window.removeEventListener(evt, handler, { capture: true } as any);
      document.removeEventListener(evt, handler, { capture: true } as any);
    });
  }

  public play() {
    this.init();
    if (this.audio) {
      this.audio.muted = false;
      if (this.audio.paused) {
        this.audio.play().catch(() => {});
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
    if (this.audio.paused || this.audio.muted) {
      this.play();
      return true;
    } else {
      this.pause();
      return false;
    }
  }

  public isPlaying(): boolean {
    return this.audio ? !this.audio.paused && !this.audio.muted : false;
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
