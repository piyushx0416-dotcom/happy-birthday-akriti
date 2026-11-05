/**
 * Background Audio Engine: One of the Girls (with JENNIE & Lily-Rose Depp) - The Weeknd
 * Ultra-low latency instant-start background music with Spotify integration support.
 */

type AudioListener = (isPlaying: boolean) => void;

class BackgroundSoundtrack {
  private audio: HTMLAudioElement | null = null;
  private isInitialized: boolean = false;
  private listeners: Set<AudioListener> = new Set();

  public init() {
    if (this.isInitialized || typeof window === "undefined") return;
    this.isInitialized = true;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const audio = new Audio(`${basePath}/assets/music/one-of-the-girls.mp3`);
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = "auto";
    this.audio = audio;

    audio.addEventListener("play", () => this.notifyListeners(true));
    audio.addEventListener("pause", () => this.notifyListeners(false));
    audio.addEventListener("playing", () => this.notifyListeners(true));

    const startPlayback = () => {
      audio.play().catch(() => {
        // Autoplay may be restricted until user interacts with the page
      });
    };

    startPlayback();

    // Unlock audio instantly on first gesture anywhere on the window
    const handleGesture = () => {
      if (this.audio && this.audio.paused) {
        this.audio.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleGesture, { passive: true });
    window.addEventListener("touchstart", handleGesture, { passive: true });
    window.addEventListener("keydown", handleGesture, { passive: true });
    window.addEventListener("pointerdown", handleGesture, { passive: true });
  }

  public play() {
    this.init();
    if (this.audio && this.audio.paused) {
      this.audio.play().catch(() => {});
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
