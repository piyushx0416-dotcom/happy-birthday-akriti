"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData } from "@/lib/data/experienceData";
import { soundEngine } from "@/lib/audio/soundtrack";
import { Heart, RotateCcw, Sparkles, Compass, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";

interface HeartCollageFinaleProps {
  onReplayAll: () => void;
}

type FinaleStage =
  | "darkness"
  | "stars"
  | "seedHeart"
  | "emerging"
  | "revealQuote"
  | "revealBirthday"
  | "celebrating";

interface HeartPoint {
  x: number;
  y: number;
  photoIndex: number;
  delay: number;
  scale: number;
}

export default function HeartCollageFinale({ onReplayAll }: HeartCollageFinaleProps) {
  const { messages, celebrant, photographs } = experienceData;
  const [stage, setStage] = useState<FinaleStage>("darkness");
  const [heartPoints, setHeartPoints] = useState<HeartPoint[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Generate Parametric Heart Coordinates
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const numPoints = isMobile ? 18 : 22;
    const points: HeartPoint[] = [];

    // Scale factors
    const scaleX = isMobile ? 10.5 : 18;
    const scaleY = isMobile ? 10.5 : 18;

    // Perimeter points along heart parametric curve
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2;
      // Parametric Heart Equation
      const x = 16 * Math.pow(Math.sin(t), 3) * scaleX;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scaleY;

      points.push({
        x,
        y: y + (isMobile ? -20 : -10), // slight vertical optical center
        photoIndex: i % photographs.length,
        delay: 0.15 * i,
        scale: isMobile ? 0.8 : 1,
      });
    }

    // Add 2 interior anchor points for full heart density
    points.push({
      x: -scaleX * 4,
      y: -scaleY * 2,
      photoIndex: 0,
      delay: 0.15 * numPoints,
      scale: isMobile ? 0.75 : 0.95,
    });
    points.push({
      x: scaleX * 4,
      y: -scaleY * 2,
      photoIndex: 1,
      delay: 0.15 * (numPoints + 1),
      scale: isMobile ? 0.75 : 0.95,
    });

    setHeartPoints(points);
  }, [photographs.length]);

  // Choreographed Finale Sequence
  const runSequence = () => {
    setStage("darkness");

    const t1 = setTimeout(() => {
      setStage("stars");
      soundEngine.playChime(440);
    }, 1200);

    const t2 = setTimeout(() => {
      setStage("seedHeart");
      soundEngine.playChime(659.25);
    }, 2800);

    const t3 = setTimeout(() => {
      setStage("emerging");
      soundEngine.playChime(880);
    }, 4500);

    const t4 = setTimeout(() => {
      setStage("revealQuote");
      soundEngine.playCelebrationChime();
    }, 9500);

    const t5 = setTimeout(() => {
      setStage("revealBirthday");
      soundEngine.playCelebrationChime();
    }, 12500);

    const t6 = setTimeout(() => {
      setStage("celebrating");
      // Celebration Confetti explosion
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#FF3D91", "#FF9FCB", "#E8C994", "#FFFFFF"],
        disableForReducedMotion: true,
      });
    }, 14500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  };

  useEffect(() => {
    const cleanup = runSequence();
    return cleanup;
  }, []);

  const handleReplay = () => {
    soundEngine.playCardFlip();
    runSequence();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-universe-black flex flex-col justify-between px-4 sm:px-8 py-6 select-none"
    >
      {/* Background Starfield that awakens in Stage 'stars' */}
      <AnimatePresence>
        {stage !== "darkness" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {/* Soft pink / gold central cosmic aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] bg-gradient-radial from-accent-pink/20 via-accent-lavender/10 to-transparent rounded-full blur-[160px] animate-pulse-glow" />

            {/* Distant Twinkling Stars */}
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-accent-ivory animate-pulse"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-accent-rose text-sm">Chapter 07</span>
          <span className="text-accent-pink">✦</span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent-ivory/60">
            THE GRAND FINALE
          </span>
        </div>

        <button
          onClick={handleReplay}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-pink/30 glass-panel-dark text-xs font-mono tracking-widest uppercase text-accent-rose hover:text-white transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform" />
          <span>Replay Finale</span>
        </button>
      </div>

      {/* ========================================================
          CENTRAL HEART COLLAGE STAGE
          ======================================================== */}
      <div className="relative z-20 w-full h-[520px] sm:h-[620px] md:h-[680px] my-auto flex items-center justify-center">
        {/* Stage 2: Tiny Glowing Seed Heart in Center */}
        <AnimatePresence>
          {(stage === "seedHeart" || stage === "emerging") && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.3, 1], opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute z-10 w-12 h-12 flex items-center justify-center text-accent-pink pointer-events-none"
            >
              <Heart className="w-8 h-8 fill-accent-pink filter drop-shadow-[0_0_15px_#FF3D91]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3+: Emerging Photographic Frames forming the Heart Shape */}
        {(stage === "emerging" ||
          stage === "revealQuote" ||
          stage === "revealBirthday" ||
          stage === "celebrating") && (
          <div className="relative w-full h-full flex items-center justify-center">
            {heartPoints.map((pt, idx) => {
              const photo = photographs[pt.photoIndex];
              return (
                <motion.div
                  key={idx}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0,
                    rotate: (Math.random() - 0.5) * 60,
                  }}
                  animate={{
                    x: pt.x,
                    y: pt.y,
                    scale: pt.scale,
                    opacity: 1,
                    rotate: (idx % 2 === 0 ? 1 : -1) * (idx % 3) * 2,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: pt.delay * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ scale: pt.scale * 1.3, zIndex: 50 }}
                  className="absolute w-14 h-18 sm:w-20 sm:h-24 md:w-24 md:h-28 cursor-pointer rounded-lg ivory-card p-1 sm:p-1.5 border border-accent-pink/40 shadow-[0_4px_20px_rgba(255,61,145,0.25)] hover:border-accent-pink hover:shadow-[0_0_25px_rgba(255,61,145,0.7)] transition-shadow duration-300"
                >
                  <div className="relative w-full h-full rounded overflow-hidden bg-universe-charcoal">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Central Heart Core Content: Grand Reveals */}
            <div className="absolute z-40 max-w-lg mx-auto text-center px-4 pointer-events-none space-y-4">
              {/* Quote Reveal */}
              {(stage === "revealQuote" ||
                stage === "revealBirthday" ||
                stage === "celebrating") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-accent-gold/40 glass-panel-dark text-accent-gold text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase shadow-lg">
                    <Sparkles className="w-3 h-3 text-accent-gold" />
                    <span>THE CELESTIAL PROMISE</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-accent-ivory leading-tight tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] glow-pink">
                    “IN EVERY UNIVERSE,
                    <br />
                    <span className="font-bold text-accent-pink italic">
                      I WOULD STILL CHOOSE YOURS.”
                    </span>
                  </h2>
                </motion.div>
              )}

              {/* Birthday Grand Reveal */}
              {(stage === "revealBirthday" || stage === "celebrating") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="space-y-2 pt-2"
                >
                  <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-editorial-gradient tracking-tight drop-shadow-[0_4px_25px_rgba(255,61,145,0.7)]">
                    {messages.finaleBirthdayReveal}
                  </h1>

                  <p className="font-serif italic text-sm sm:text-base text-accent-rose/90">
                    November 06, {celebrant.year} • Dedicated to Akriti Singh
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-30 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono tracking-widest text-accent-rose/60 border-t border-accent-pink/15 pt-4 gap-4"
      >
        <div className="flex items-center gap-3">
          <span>THE GRAND FINALE // ACT VII</span>
          <span className="text-accent-pink">✦</span>
          <span>HEART COLLAGE COMPLETE</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onReplayAll}
            className="text-xs uppercase tracking-widest text-accent-ivory hover:text-accent-pink transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Entire Journey</span>
          </button>

          <Link
            href="/universe"
            className="px-5 py-2 rounded-full bg-accent-pink text-white font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,61,145,0.4)] hover:shadow-[0_0_35px_rgba(255,61,145,0.7)] transition-all flex items-center gap-2"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore 3D Universe</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
