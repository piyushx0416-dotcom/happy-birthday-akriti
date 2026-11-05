"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { backgroundMusic } from "@/lib/audio/soundtrack";
import { PixelTextEngine } from "@/lib/pixelTextEngine";
import StarlightQuest from "@/components/game/StarlightQuest";
import CosmicIntroduction from "@/components/intro/CosmicIntroduction";
import ThreeHeartGalaxy from "./ThreeHeartGalaxy";

type SceneState =
  | "matrix-intro"
  | "gift-reveal"
  | "memory-book"
  | "heart-collage"
  | "starlight-quest"
  | "cosmic-reveal"
  | "3d-heart-galaxy";

interface PhysicalPageData {
  id: number;
  frontImage: string;
  frontAlt: string;
  backImage: string;
  backAlt: string;
}

// Authentic Memory Book pages exactly as shown in reference video
const BOOK_PHYSICAL_PAGES: PhysicalPageData[] = [
  {
    id: 0,
    frontImage: "/assets/aya/theend.jpg", // Cute front cover (hands holding heart) from the video
    frontAlt: "Akriti's Memory Card Cover",
    backImage: "/assets/akriti/card-photo-01.png", // Inside Left Page 1 (Childhood Party Dress)
    backAlt: "Akriti - Childhood Party Dress",
  },
  {
    id: 1,
    frontImage: "/assets/akriti/card-photo-02.jpg", // Inside Right Page 1 (Garden Toddler Portrait)
    frontAlt: "Akriti - Garden Toddler Portrait",
    backImage: "/assets/akriti/photo-03.jpg", // Inside Left Page 2
    backAlt: "Akriti - Sweet Memory",
  },
  {
    id: 2,
    frontImage: "/assets/akriti/card-photo-04.jpg", // Inside Right Page 2 (Portrait in Striped Top - Zoomed Out)
    frontAlt: "Akriti - Beautiful Smile",
    backImage: "/assets/aya/theend.jpg", // Cute back cover (hands holding heart) from the video
    backAlt: "Forever and Always ❤️",
  },
];

// Spreads messages synced with the authentic video typing effect
const BOOK_SPREAD_MESSAGES: Record<number, string> = {
  1: "Happy birthday my love 🤎",
  2: "As long as you’re smiling, I’m happy. Stay happy, my love.",
};

// Authentic 7 real photographs of Akriti for the Grand Cardioid Heart Collage
const HEART_COLLAGE_IMAGES: string[] = [
  "/assets/akriti/heart-photo-01.jpg", // Yellow ruffled dress portrait
  "/assets/akriti/heart-photo-02.jpg", // Pink earmuffs with alien stickers selfie
  "/assets/akriti/heart-photo-03.jpg", // Yellow floral dress by the lakeside
  "/assets/akriti/heart-photo-04.jpg", // Colorful patterned top with nose stud portrait
  "/assets/akriti/heart-photo-05.jpg", // Pink floral top close selfie
  "/assets/akriti/heart-photo-06.jpg", // White sunglasses on head smiling selfie
  "/assets/akriti/heart-photo-07.jpg", // Elegant green striped sari portrait
];

interface AyaExperienceProps {
  isActive?: boolean;
}

export default function AyaExperience({ isActive = true }: AyaExperienceProps) {
  // Experience Navigation State
  const [currentScene, setCurrentScene] = useState<SceneState>("matrix-intro");

  // 3D Flippable Memory Book State
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pagesFlipped, setPagesFlipped] = useState<boolean[]>([false, false, false]);
  const [flippingPageIndex, setFlippingPageIndex] = useState<number | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [showContentCard, setShowContentCard] = useState(false);

  // Background twinkling stars (matching aya-sigma-six showStars)
  const [stars, setStars] = useState<
    Array<{ id: number; top: number; left: number; size: "small" | "medium" | "large"; delay: number }>
  >([]);

  useEffect(() => {
    const starList = [];
    const sizes: ("small" | "medium" | "large")[] = [
      "small", "small", "small", "medium", "medium", "large"
    ];
    for (let i = 0; i < 90; i++) {
      starList.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        delay: +(Math.random() * 2.5).toFixed(2),
      });
    }
    setStars(starList);
  }, []);

  // Floating emoji hearts pool (emerging one by one from below screen)
  const floatingHearts = useMemo(() => {
    const symbols = ["❤️", "💕", "💖", "💗", "💓", "💞"];
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: Math.floor(6 + (i * 6.1) % 88),
      delay: +(i * 0.75).toFixed(2),
      duration: +(6.5 + (i % 3) * 1.5).toFixed(2),
      size: Math.floor(18 + (i % 4) * 4),
    }));
  }, []);


  // Grand Heart Montage Photos (30 points around cardioid)
  const [heartPhotos, setHeartPhotos] = useState<
    Array<{
      id: number;
      src: string;
      targetX: number;
      targetY: number;
      visible: boolean;
    }>
  >([]);
  const [photoDimensions, setPhotoDimensions] = useState<{ size: number }>({ size: 105 });
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Canvas refs for Scene 1
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pixelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pixelEngineRef = useRef<PixelTextEngine | null>(null);

  // -------------------------------------------------------------
  // AUDIO INITIALIZATION: One of the Girls (Tonight)
  // All sound effects silenced, only soundtrack plays
  // -------------------------------------------------------------
  const playAudio = useCallback(() => {
    try {
      backgroundMusic.init();
      backgroundMusic.play();
    } catch {}
  }, []);

  useEffect(() => {
    if (!isActive) return;
    playAudio();

    // Auto-unlock audio on first touch/click anywhere on window
    const handleFirstGesture = () => {
      playAudio();
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };
  }, [isActive, playAudio]);

  // -------------------------------------------------------------
  // SCENE 1: Matrix Digital Rain & Authentic Pixel / Dot Matrix Typography
  // Words and numbers written purely with glowing pixels (dots)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isActive || currentScene !== "matrix-intro") return;

    // 1. Matrix Digital Rain Canvas
    const mCanvas = matrixCanvasRef.current;
    if (!mCanvas) return;
    const mCtx = mCanvas.getContext("2d");
    if (!mCtx) return;

    // High-DPI Retina scaling for crisp vector characters
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const cssWidth = window.innerWidth;
    const cssHeight = window.innerHeight;

    mCanvas.width = Math.floor(cssWidth * dpr);
    mCanvas.height = Math.floor(cssHeight * dpr);
    mCanvas.style.width = `${cssWidth}px`;
    mCanvas.style.height = `${cssHeight}px`;
    mCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isMobile = cssWidth < 768;
    const fontSize = isMobile ? 14 : 22;
    const columns = Math.floor(cssWidth / fontSize);
    const drops: number[] = [];
    const columnColors: string[] = [];
    const delays: number[] = [];
    const started: boolean[] = [];

    const maxLength = Math.floor(cssHeight / fontSize) + 3;
    const startTime = Date.now();
    const matrixChars = "HAPPYBIRTHDAYAKRITI0123456789".split("");

    for (let x = 0; x < columns; x++) {
      drops[x] = 0;
      columnColors[x] = x % 2 === 0 ? "#FF3D91" : "#FF1493";
      delays[x] = Math.random() * 1500;
      started[x] = false;
    }

    const matrixInterval = setInterval(() => {
      mCtx.fillStyle = "rgba(0, 0, 0, 0.08)";
      mCtx.fillRect(0, 0, cssWidth, cssHeight);
      mCtx.font = `bold ${fontSize}px Menlo, Consolas, Monaco, monospace`;

      const currentTime = Date.now();
      for (let i = 0; i < drops.length; i++) {
        if (!started[i] && currentTime - startTime >= delays[i]) {
          started[i] = true;
        }

        if (started[i] && drops[i] < maxLength) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          const color = columnColors[i];

          mCtx.fillStyle = color;
          mCtx.shadowColor = color;
          mCtx.shadowBlur = 8;
          mCtx.fillText(char, x, y);
          mCtx.shadowBlur = 0;
        }

        if (started[i]) {
          drops[i]++;
        }

        if (drops[i] >= maxLength) {
          drops[i] = 0;
          delays[i] = Math.random() * 800;
          started[i] = false;
        }
      }
    }, 45);

    // 2. Foreground Pixel / Dot Matrix Engine (Authentic pixels/dots, zero scattering)
    const pCanvas = pixelCanvasRef.current;
    if (!pCanvas) return;

    const engine = new PixelTextEngine(pCanvas, "#FF69B4");
    pixelEngineRef.current = engine;
    engine.start();

    // Sequence: 3 -> 2 -> 1 -> Happy -> Birthday -> Akriti -> ❤️
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => engine.switchShape("3"), 400));
    timers.push(setTimeout(() => engine.switchShape("2"), 1900));
    timers.push(setTimeout(() => engine.switchShape("1"), 3400));
    timers.push(setTimeout(() => engine.switchShape("Happy"), 4900));
    timers.push(setTimeout(() => engine.switchShape("Birthday"), 6900));
    timers.push(setTimeout(() => engine.switchShape("Akriti"), 8900));
    timers.push(setTimeout(() => engine.switchShape("❤️"), 10900));

    // Smooth transition to Scene 2 (Gift reveal)
    timers.push(
      setTimeout(() => {
        engine.switchShape("");
        setTimeout(() => {
          engine.stop();
          setCurrentScene("gift-reveal");
        }, 500);
      }, 12900)
    );

    const handleResize = () => {
      if (mCanvas && mCtx) {
        const newDpr = Math.min(window.devicePixelRatio || 1, 2.5);
        const newW = window.innerWidth;
        const newH = window.innerHeight;
        mCanvas.width = Math.floor(newW * newDpr);
        mCanvas.height = Math.floor(newH * newDpr);
        mCanvas.style.width = `${newW}px`;
        mCanvas.style.height = `${newH}px`;
        mCtx.setTransform(newDpr, 0, 0, newDpr, 0, 0);
      }
      if (pixelEngineRef.current) {
        pixelEngineRef.current.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(matrixInterval);
      timers.forEach(clearTimeout);
      if (pixelEngineRef.current) pixelEngineRef.current.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, currentScene]);

  // -------------------------------------------------------------
  // SCENE 2: Gift Illustration Reveal with giftCelebration Pulse
  // -------------------------------------------------------------
  useEffect(() => {
    if (currentScene !== "gift-reveal") return;

    const timer = setTimeout(() => {
      setCurrentScene("memory-book");
    }, 3200);

    return () => clearTimeout(timer);
  }, [currentScene]);

  // -------------------------------------------------------------
  // SCENE 3: 3D Multi-Page Memory Book Typewriter Sync
  // -------------------------------------------------------------
  useEffect(() => {
    if (currentScene !== "memory-book") return;

    const message = BOOK_SPREAD_MESSAGES[currentPage];
    if (message) {
      setShowContentCard(true);
      setDisplayedText("");

      // Delay typewriter slightly when turning pages to keep 3D flip 60 FPS
      const delay = currentPage === 0 ? 0 : 500;
      let typeTimer: NodeJS.Timeout | null = null;
      const startTimer = setTimeout(() => {
        let i = 0;
        typeTimer = setInterval(() => {
          if (i < message.length) {
            setDisplayedText(message.slice(0, i + 1));
            i++;
          } else if (typeTimer) {
            clearInterval(typeTimer);
          }
        }, 45);
      }, delay);

      return () => {
        clearTimeout(startTimer);
        if (typeTimer) clearInterval(typeTimer);
      };
    } else {
      setShowContentCard(false);
      setDisplayedText("");
    }
  }, [currentScene, currentPage]);

  // Turn to Next Page in 3D Book (Authentic Aya reference 2-phase 3D flip)
  const handleTurnPage = () => {
    if (flippingPageIndex !== null) return;
    const totalPhysicalPages = BOOK_PHYSICAL_PAGES.length;

    if (currentPage < totalPhysicalPages) {
      const pageToFlip = currentPage;
      setFlippingPageIndex(pageToFlip);

      setTimeout(() => {
        setPagesFlipped((prev) => {
          const next = [...prev];
          next[pageToFlip] = true;
          return next;
        });
        setFlippingPageIndex(null);
        const nextPage = pageToFlip + 1;
        setCurrentPage(nextPage);

        // When all pages are flipped (showing back cover theend.jpg)
        if (nextPage === totalPhysicalPages) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FF3D91", "#FF69B4", "#FF9FCB", "#FFD1DC", "#FFF"],
          });
          setTimeout(() => {
            triggerHeartCelebration();
          }, 2800);
        }
      }, 400);
    } else {
      // If already at end (showing back cover), clicking proceeds to Heart Celebration!
      triggerHeartCelebration();
    }
  };

  // -------------------------------------------------------------
  // SCENE 4: Heart Celebration Transition
  // -------------------------------------------------------------
  const triggerHeartCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#FF3D91", "#FF69B4", "#FF9FCB", "#FFD1DC", "#FFF"],
    });

    setCurrentScene("heart-collage");
  };

  // -------------------------------------------------------------
  // SCENE 4: Heart Collage Initialization & Cardioid Positioning
  // -------------------------------------------------------------
  useEffect(() => {
    if (currentScene !== "heart-collage") return;

    const totalPoints = 28; // Evenly distributes all 7 photos (4 of each) symmetrically around the cardioid heart
    const photos = [];
    const scale = window.innerWidth < 768 ? 9 : 16;
    for (let i = 0; i < totalPoints; i++) {
      const t = (i / totalPoints) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3) * scale;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
      const imageSrc = HEART_COLLAGE_IMAGES[i % HEART_COLLAGE_IMAGES.length];
      photos.push({
        id: i,
        src: imageSrc,
        targetX: x,
        targetY: y,
        visible: false,
      });
    }
    setHeartPhotos(photos);

    // Stagger photo reveal
    photos.forEach((_, idx) => {
      setTimeout(() => {
        setHeartPhotos((prev) => {
          if (!prev[idx]) return prev;
          const next = [...prev];
          next[idx] = { ...next[idx], visible: true };
          return next;
        });
      }, idx * 100);
    });
  }, [currentScene]);

  return (
    <div
      onClick={playAudio}
      onTouchStart={playAudio}
      onPointerDown={playAudio}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden select-none font-sans"
    >
      {/* ========================================================= */}
      {/* PERSISTENT BACKGROUND STARFIELD                            */}
      {/* ========================================================= */}
      <div className="stars-container pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,61,145,0.12)_0%,rgba(139,40,90,0.04)_45%,rgba(0,0,0,0.95)_100%)]" />
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              opacity: 0.15 + (i % 5) * 0.15,
              animationDuration: `${2.5 + (i % 4)}s`,
              animationDelay: `${(i % 3) * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* SCENE 1: Matrix Digital Rain & Authentic Pixel / Dot Typography */}
      {/* Numbers & Words written purely with glowing pixels (dots) */}
      {/* ========================================================= */}
      {currentScene === "matrix-intro" && (
        <div
          onClick={() => playAudio()}
          className="relative w-full h-screen z-10 flex flex-col items-center justify-center overflow-hidden cursor-default"
        >
          {/* Falling Matrix Characters Canvas */}
          <canvas
            ref={matrixCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Authentic Pixel / Dot Matrix Canvas (zero scattering, pure pixel grid) */}
          <canvas
            ref={pixelCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 2: Gift / Animated Illustration Reveal              */}
      {/* ========================================================= */}
      {currentScene === "gift-reveal" && (
        <div
          onClick={() => setCurrentScene("memory-book")}
          className="relative w-full h-screen z-20 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
        >
          <div className="relative animate-giftCelebration flex flex-col items-center text-center space-y-4 pointer-events-none">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 drop-shadow-[0_0_40px_rgba(255,61,145,0.6)]">
              <Image
                src="/assets/aya/happy3.gif"
                alt="Happy Birthday Celebration"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="font-serif italic text-xl sm:text-2xl text-[#FF9FCB] tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              A little serenade for your special day...
            </p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 3: The 3D Interactive Memory Book                   */}
      {/* Authentic aya-sigma-six layout and video animations       */}
      {/* ========================================================= */}
      {currentScene === "memory-book" && (
        <div className="relative w-full h-screen z-20 flex flex-col items-center justify-center p-4 overflow-hidden">
          {/* Twinkling Background Stars (Authentic aya-sigma-six) */}
          <div className="stars-container">
            {stars.map((s) => (
              <div
                key={s.id}
                className={`star ${s.size}`}
                style={{
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                  animationDelay: `${s.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Floating Emoji Hearts (Emerging one by one from below screen) */}
          <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
            {floatingHearts.map((h) => (
              <div
                key={h.id}
                className="heart"
                style={{
                  left: `${h.left}%`,
                  fontSize: `${h.size}px`,
                  animationDelay: `${h.delay}s`,
                  animationDuration: `${h.duration}s`,
                }}
              >
                {h.symbol}
              </div>
            ))}
          </div>

          {/* Authentic Top Rounded Cream Card with Typewriter Cursive Text & Beating Heart */}
          <div className={`content-display ${showContentCard ? "show" : ""}`}>
            <p>{displayedText}</p>
          </div>

          {/* 3D Realistic Flippable Memory Book */}
          <div className="book-container show z-20 my-auto">
            <div
              className="book show"
              onClick={handleTurnPage}
              title="Click or tap to turn the page"
            >
              {BOOK_PHYSICAL_PAGES.map((page, index) => {
                const totalPages = BOOK_PHYSICAL_PAGES.length;
                const isFlipped = pagesFlipped[index];
                const isFlipping = flippingPageIndex === index;
                const normalZIndex = totalPages - index;
                const flippedZIndex = index + 1;

                return (
                  <div
                    key={page.id}
                    data-page={index}
                    style={
                      {
                        "--page-z-index": normalZIndex,
                        "--page-flipped-z-index": flippedZIndex,
                        zIndex: isFlipping
                          ? 50
                          : isFlipped
                          ? flippedZIndex
                          : normalZIndex,
                      } as React.CSSProperties
                    }
                    className={`page ${isFlipped ? "flipped" : ""} ${
                      isFlipping ? "flipping" : ""
                    }`}
                  >
                    {/* Front Face */}
                    <div className="page-front">
                      <Image
                        src={page.frontImage}
                        alt={page.frontAlt}
                        fill
                        sizes="(max-width: 768px) 50vw, 600px"
                        quality={95}
                        priority
                        className="object-cover"
                      />
                    </div>

                    {/* Back Face */}
                    <div className="page-back">
                      <Image
                        src={page.backImage}
                        alt={page.backAlt}
                        fill
                        sizes="(max-width: 768px) 50vw, 600px"
                        quality={95}
                        priority
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 4: The Grand Cardioid Heart Photo Collage           */}
      {/* Clean layout, single forward action lower down            */}
      {/* ========================================================= */}
      {currentScene === "heart-collage" && (
        <div className="relative w-full h-screen z-20 flex flex-col items-center justify-center overflow-hidden">
          {/* Photos arranged into the clean Cardioid Heart shape */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {heartPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(photo.src);
                }}
                className={`photo absolute pointer-events-auto cursor-pointer rounded-2xl overflow-hidden border-4 border-white shadow-[0_0_25px_rgba(255,61,145,0.85)] bg-white transition-all duration-1000 hover:scale-125 hover:z-50 ${
                  photo.visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{
                  width: `${photoDimensions.size}px`,
                  height: `${photoDimensions.size}px`,
                  left: `calc(50% + ${photo.targetX}px)`,
                  top: `calc(46% + ${photo.targetY}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Image
                  src={photo.src}
                  alt={`Akriti Heart Memory ${photo.id + 1}`}
                  fill
                  quality={95}
                  className="object-cover"
                  sizes="(max-width: 768px) 180px, 300px"
                />
              </div>
            ))}
          </div>

          {/* Bottom Navigation: Very small, sleek, unobtrusive Starlight Quest pill */}
          <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-auto">
            <button
              onClick={() => setCurrentScene("starlight-quest")}
              className="group px-3 py-1 rounded-full bg-black/75 hover:bg-[#FF2B85] border border-white/20 hover:border-white/60 text-white/75 hover:text-white text-[9px] sm:text-[10px] font-sans font-medium tracking-widest uppercase transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-1 hover:scale-105 active:scale-95"
            >
              <span>Chapter II: Starlight Quest</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>
          </div>

          {/* Lightbox Modal if user taps any photo */}
          {selectedPhoto && (
            <div
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            >
              <div className="relative max-w-xl w-full max-h-[85vh] h-[75vh] rounded-2xl overflow-hidden border-4 border-white shadow-[0_0_50px_rgba(255,61,145,0.8)] bg-black/95 p-2 flex items-center justify-center">
                <Image
                  src={selectedPhoto}
                  alt="Akriti full view"
                  fill
                  quality={100}
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 95vw, 800px"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* Chapter II: The Starlight Quest (Interactive Game)        */}
      {/* ========================================================= */}
      {currentScene === "starlight-quest" && (
        <StarlightQuest
          onNext={() => setCurrentScene("cosmic-reveal")}
        />
      )}

      {/* ========================================================= */}
      {/* Chapter III: Cosmic Horizon (The Day Akriti Was Born)     */}
      {/* ========================================================= */}
      {currentScene === "cosmic-reveal" && (
        <CosmicIntroduction
          onNext={() => setCurrentScene("3d-heart-galaxy")}
        />
      )}

      {/* ========================================================= */}
      {/* Chapter IV: The Interactive 3D Birthday Universe Finale   */}
      {/* ========================================================= */}
      {currentScene === "3d-heart-galaxy" && (
        <ThreeHeartGalaxy />
      )}
    </div>
  );
}
