"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface CosmicIntroductionProps {
  onNext?: () => void;
}

export default function CosmicIntroduction({ onNext }: CosmicIntroductionProps) {
  // Animation phases:
  // 1: "text-intro" -> text appears with cinematic blur & float
  // 2: "revealing-image" -> image blooms into view behind the text
  // 3: "complete" -> image settled into view
  const [phase, setPhase] = useState<"text-intro" | "revealing-image" | "complete">("text-intro");
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // 1. Image starts revealing after 2.8s
    const t1 = setTimeout(() => {
      setPhase("revealing-image");
    }, 2800);

    // 2. Image settles into full view at 4.8s
    const t2 = setTimeout(() => {
      setPhase("complete");
    }, 4800);

    // 3. Exactly 5 seconds after the image appears (~7.8s total), the text disappears!
    const t3 = setTimeout(() => {
      setShowText(false);
    }, 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleContainerClick = () => {
    if (phase === "text-intro") {
      setPhase("revealing-image");
      setTimeout(() => {
        setShowText(false);
      }, 5000);
    }
  };

  return (
    <section
      onClick={handleContainerClick}
      className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#06040A] text-[#F8F1E8] select-none m-0 p-0 cursor-default"
    >
      {/* Background Star Particles (Subtle twinkle during text intro) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#13091F] via-[#06040A] to-[#020104]" />
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 27) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              opacity: 0.2 + (i % 5) * 0.15,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i % 3) * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* ============================================================== */}
      {/* THE COSMIC PHOTOGRAPH (Blooms and scales into view in Phase 2) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {(phase === "revealing-image" || phase === "complete") && (
          <motion.div
            key="cosmic-photo"
            className="absolute inset-0 z-10 w-full h-full"
            initial={{ opacity: 0, scale: 1.18, filter: "brightness(0.3) blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "none" }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/assets/cosmic/akriti-birthday-cosmic.jpg"
              alt="Akriti Birthday Cosmic Sky"
              fill
              priority
              sizes="100vw"
              quality={100}
              className="object-cover object-center pointer-events-none"
            />

            {/* Soft vignette that dissolves when text disappears, leaving 100% unobstructed photo */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: showText ? 1 : 0 }}
              transition={{ duration: 1.6 }}
              className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* CINEMATIC TEXT & ACTIONS                                       */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-between p-6 sm:p-10 pointer-events-none">
        {/* Top Header Pill (Fades away along with text) */}
        <AnimatePresence>
          {phase === "complete" && showText && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 1.2 }}
              className="pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md text-xs font-mono uppercase tracking-[0.25em] text-[#FF9FCB] shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#FF3D91]" />
                <span>November 6 &bull; Akriti&apos;s Cosmic Horizon</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Central Poetic Statement (Disappears after 5 seconds) */}
        <div className="my-auto max-w-4xl px-4 text-center">
          <AnimatePresence mode="wait">
            {phase === "text-intro" && showText && (
              <motion.div
                key="intro-text"
                initial={{ opacity: 0, y: 35, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-[0.3em] uppercase text-[#FF69B4]/80">
                  <span>✦ A Glimpse Into Eternity ✦</span>
                </div>
                <h1 className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F8F1E8] font-light tracking-wide leading-[1.25] drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">
                  &ldquo;This is how the universe looked the day when you were born&rdquo;
                </h1>
                <p className="font-serif italic text-sm sm:text-base text-white/50 tracking-wider">
                  The stars aligned in this exact celestial portrait...
                </p>
              </motion.div>
            )}

            {(phase === "revealing-image" || phase === "complete") && showText && (
              <motion.div
                key="settled-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 1.4 }}
                className="space-y-3"
              >
                <h2 className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-white font-light tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                  &ldquo;This is how the universe looked the day when you were born&rdquo;
                </h2>
                <p className="font-sans text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  The deep sky photographed on your birthday. A boundless turquoise nebula surrounded by millions of ancient stars, all witnessing your arrival into the world.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation: Exact same position and style as the next page button in the heart page */}
        <AnimatePresence>
          {phase === "complete" && onNext && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="group px-3 py-1 rounded-full bg-black/75 hover:bg-[#FF2B85] border border-white/20 hover:border-white/60 text-white/75 hover:text-white text-[9px] sm:text-[10px] font-sans font-medium tracking-widest uppercase transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-1 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Enter 3D Birthday Universe</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
