/**
 * Background Audio Engine: One of the Girls (with JENNIE & Lily-Rose Depp) - The Weeknd
 * Ultra-reliable HTML5 Audio singleton with browser autoplay policy handling.
 */

type AudioListener = (isPlaying: boolean) => void;

class BackgroundSoundtrack {
  private audio: HTMLAudioElement | null = null;
  private isInitialized: boolean = false;
  private isAttemptingPlay: boolean = false;
  private listeners: Set<AudioListener> = new Set();
  private gestureCleanup: (() => void) | null = null;

  public init(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;

    if (this.isInitialized && this.audio) {
      return this.audio;
    }

    // 1. Reuse existing DOM audio element or create single instance
    let el = document.getElementById("her-universe-soundtrack") as HTMLAudioElement | null;
    if (!el) {
      el = new Audio("/assets/music/one-of-the-girls.mp3");
      el.id = "her-universe-soundtrack";
      document.body.appendChild(el);
    }

    el.loop = true;
    el.volume = 0.8;
    el.preload = "auto";
    el.setAttribute("playsinline", "true");
    (el as any).playsInline = true;

    this.audio = el;
    this.isInitialized = true;

    // Synchronize state listeners
    el.addEventListener("play", () => this.notifyListeners(true));
    el.addEventListener("playing", () => this.notifyListeners(true));
    el.addEventListener("pause", () => this.notifyListeners(false));

    // Guarantee seamless looping across all platforms
    el.addEventListener("ended", () => {
      if (this.audio) {
        this.audio.currentTime = 0;
        this.audio.play().catch(() => {});
      }
    });

    // 2. Attempt immediate playback with sound as early as possible
    this.attemptAutoplay();

    return el;
  }

  private attemptAutoplay() {
    if (!this.audio || this.isAttemptingPlay) return;

    this.isAttemptingPlay = true;
    this.audio.muted = false;
    this.audio.volume = 0.8;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Browser allowed autoplay with sound!
          this.isAttemptingPlay = false;
          this.notifyListeners(true);
        })
        .catch((_error) => {
          // Browser blocked un-interacted autoplay (NotAllowedError).
          // Register trusted one-time gesture listeners to start sound on first user touch/click.
          this.isAttemptingPlay = false;
          this.notifyListeners(false);
          this.setupGestureUnlock();
        });
    } else {
      this.isAttemptingPlay = false;
    }
  }

  private setupGestureUnlock() {
    if (this.gestureCleanup || typeof window === "undefined") return;

    const unlockHandler = () => {
      if (this.audio && this.audio.paused) {
        this.audio.muted = false;
        this.audio.volume = 0.8;
        this.audio
          .play()
          .then(() => {
            this.notifyListeners(true);
            this.removeGestureUnlock();
          })
          .catch(() => {});
      } else {
        this.removeGestureUnlock();
      }
    };

    const events = ["pointerdown", "touchstart", "touchend", "mousedown", "click", "keydown"];

    events.forEach((evt) => {
      window.addEventListener(evt, unlockHandler, { capture: true, passive: true });
    });

    this.gestureCleanup = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, unlockHandler, { capture: true } as any);
      });
      this.gestureCleanup = null;
    };
  }

  private removeGestureUnlock() {
    if (this.gestureCleanup) {
      this.gestureCleanup();
    }
  }

  public play() {
    if (!this.isInitialized) {
      this.init();
      return;
    }
    if (this.audio && this.audio.paused) {
      this.audio.muted = false;
      this.audio.volume = 0.8;
      this.audio
        .play()
        .then(() => {
          this.notifyListeners(true);
          this.removeGestureUnlock();
        })
        .catch(() => {});
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

// Auto-initialize immediately on DOM readiness
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => backgroundMusic.init(), { once: true });
  } else {
    backgroundMusic.init();
  }
}
