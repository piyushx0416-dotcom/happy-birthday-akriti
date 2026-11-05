"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData, AkritiPhoto } from "@/lib/data/experienceData";
import { soundEngine } from "@/lib/audio/soundtrack";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Sparkles,
  ArrowRight,
  Layers,
  LayoutGrid,
  Maximize2,
  Camera,
  Heart,
} from "lucide-react";

type LayoutMode = "editorial" | "spotlight" | "stacked" | "polaroid";

interface PhotographExperienceProps {
  onContinue: () => void;
}

export default function PhotographExperience({ onContinue }: PhotographExperienceProps) {
  const { photographs } = experienceData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("editorial");
  const [isFlipped, setIsFlipped] = useState(false);

  const currentPhoto = photographs[currentIndex] || photographs[0];

  const handleNext = () => {
    setIsFlipped(false);
    soundEngine.playCardFlip();
    setCurrentIndex((prev) => (prev + 1) % photographs.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    soundEngine.playCardFlip();
    setCurrentIndex((prev) => (prev - 1 + photographs.length) % photographs.length);
  };

  const toggleFlip = () => {
    soundEngine.playCardFlip();
    setIsFlipped(!isFlipped);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " " || e.key === "Enter") toggleFlip();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-universe-black flex flex-col justify-between px-4 sm:px-8 py-8 select-none">
      {/* Background Starry Atmosphere */}
      <div className="absolute inset-0 z-0 bg-universe-black pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-accent-pink/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-lavender/5 rounded-full blur-[150px]" />
      </div>

      {/* Top Header & Layout Switcher */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-accent-rose text-sm">Chapter 04</span>
          <span className="text-accent-pink">✦</span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent-ivory/70">
            THE PHOTOGRAPH EXPERIENCE
          </span>
        </div>

        {/* Layout Arrangements Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-full border border-accent-pink/25 glass-panel-dark text-xs font-mono">
          <button
            onClick={() => {
              soundEngine.playChime(660);
              setLayoutMode("editorial");
            }}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              layoutMode === "editorial"
                ? "bg-accent-pink text-white shadow-sm"
                : "text-accent-ivory/60 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Two-Photo Editorial</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playChime(700);
              setLayoutMode("spotlight");
            }}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              layoutMode === "spotlight"
                ? "bg-accent-pink text-white shadow-sm"
                : "text-accent-ivory/60 hover:text-white"
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Spotlight</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playChime(740);
              setLayoutMode("stacked");
            }}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              layoutMode === "stacked"
                ? "bg-accent-pink text-white shadow-sm"
                : "text-accent-ivory/60 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Stacked Cards</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playChime(780);
              setLayoutMode("polaroid");
            }}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              layoutMode === "polaroid"
                ? "bg-accent-pink text-white shadow-sm"
                : "text-accent-ivory/60 hover:text-white"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Polaroids</span>
          </button>
        </div>

        <button
          onClick={() => {
            soundEngine.playChime(880);
            onContinue();
          }}
          className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-accent-rose hover:text-white transition-colors"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Main Photographic Stage Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-6 flex flex-col items-center">
        {/* ========================================================
            LAYOUT A: TWO-PHOTO EDITORIAL
            ======================================================== */}
        {layoutMode === "editorial" && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center justify-center">
            {/* Primary Interactive Card (with 3D Flip) */}
            <div className="perspective-1000 w-full max-w-md mx-auto aspect-[4/5]">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={toggleFlip}
                className={`relative w-full h-full cursor-pointer transform-style-3d transition-transform duration-700 ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* FRONT: Warm Ivory Frame with Akriti Photo */}
                <div className="absolute inset-0 backface-hidden ivory-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-accent-gold/40">
                  <div className="relative w-full h-[82%] rounded-xl overflow-hidden bg-universe-charcoal border border-accent-gold/20">
                    <Image
                      src={currentPhoto.src}
                      alt={currentPhoto.title}
                      fill
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass-panel-dark text-[10px] font-mono tracking-widest text-accent-rose uppercase">
                      TAP TO FLIP
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-universe-charcoal">
                    <div>
                      <h3 className="font-serif text-lg font-bold tracking-tight">
                        {currentPhoto.title}
                      </h3>
                      <p className="font-serif italic text-xs text-universe-charcoal/70">
                        {currentPhoto.subtitle}
                      </p>
                    </div>
                    <RotateCw className="w-4 h-4 text-accent-pink animate-spin-slow" />
                  </div>
                </div>

                {/* BACK: Caption & Note */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 ivory-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-accent-pink/50 text-universe-charcoal">
                  <div className="flex items-center justify-between border-b border-accent-gold/30 pb-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 fill-accent-pink text-accent-pink" />
                      <span className="font-mono text-xs tracking-widest uppercase">
                        EXHIBIT {currentIndex + 1} OF {photographs.length}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-universe-charcoal/60">
                      {currentPhoto.date}
                    </span>
                  </div>

                  <div className="space-y-4 my-auto text-center">
                    <h4 className="font-serif text-2xl font-semibold italic text-accent-pink">
                      “{currentPhoto.title}”
                    </h4>
                    <p className="font-serif text-base sm:text-lg leading-relaxed text-universe-charcoal/85 italic">
                      {currentPhoto.caption}
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                      {currentPhoto.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-accent-pink/10 text-accent-pink font-mono text-[10px] tracking-wider uppercase"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-center font-mono text-[10px] tracking-widest uppercase text-universe-charcoal/50 pt-3 border-t border-accent-gold/20">
                    CLICK TO VIEW PHOTOGRAPH
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Secondary Editorial Pairing Card */}
            {(() => {
              const pairIndex = (currentIndex + 1) % photographs.length;
              const pairPhoto = photographs[pairIndex];
              return (
                <div className="w-full max-w-md mx-auto aspect-[4/5] ivory-card-subtle rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-accent-gold/30 opacity-90 hover:opacity-100 transition-opacity">
                  <div className="relative w-full h-[82%] rounded-xl overflow-hidden bg-universe-charcoal border border-accent-gold/20">
                    <Image
                      src={pairPhoto.src}
                      alt={pairPhoto.title}
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass-panel-dark text-[10px] font-mono tracking-widest text-accent-ivory uppercase">
                      CURATED PAIR
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-universe-charcoal">
                    <div>
                      <h3 className="font-serif text-lg font-bold tracking-tight">
                        {pairPhoto.title}
                      </h3>
                      <p className="font-serif italic text-xs text-universe-charcoal/70">
                        {pairPhoto.subtitle}
                      </p>
                    </div>
                    <button
                      onClick={handleNext}
                      className="text-xs font-mono uppercase tracking-widest text-accent-pink hover:underline"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================
            LAYOUT B: SINGLE PHOTO SPOTLIGHT
            ======================================================== */}
        {layoutMode === "spotlight" && (
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
            <div className="perspective-1000 w-full aspect-[4/5] sm:aspect-[1/1] max-w-lg">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={toggleFlip}
                className={`relative w-full h-full cursor-pointer transform-style-3d transition-transform duration-700 ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                <div className="absolute inset-0 backface-hidden ivory-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between border-2 border-accent-gold/50 shadow-2xl">
                  <div className="relative w-full h-[85%] rounded-xl overflow-hidden bg-universe-charcoal">
                    <Image
                      src={currentPhoto.src}
                      alt={currentPhoto.title}
                      fill
                      priority
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="pt-3 flex items-center justify-between text-universe-charcoal">
                    <div>
                      <h3 className="font-serif text-xl font-bold">{currentPhoto.title}</h3>
                      <p className="font-serif italic text-xs text-universe-charcoal/70">
                        {currentPhoto.subtitle}
                      </p>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-accent-pink">
                      TAP FOR DOSSIER
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 backface-hidden rotate-y-180 ivory-card rounded-2xl p-8 flex flex-col justify-between border-2 border-accent-pink/50 text-universe-charcoal">
                  <div className="font-mono text-xs tracking-widest uppercase text-accent-pink">
                    MUSEUM SPOTLIGHT ARCHIVE • {currentPhoto.date}
                  </div>
                  <div className="space-y-4 my-auto text-center">
                    <h3 className="font-serif text-3xl font-bold italic">{currentPhoto.title}</h3>
                    <p className="font-serif text-lg leading-relaxed text-universe-charcoal/85">
                      {currentPhoto.caption}
                    </p>
                  </div>
                  <div className="font-mono text-xs text-center text-universe-charcoal/50">
                    CLICK TO FLIP BACK
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* ========================================================
            LAYOUT C: STACKED MEMORY CARDS
            ======================================================== */}
        {layoutMode === "stacked" && (
          <div className="relative w-full max-w-md h-[440px] sm:h-[480px] flex items-center justify-center">
            {photographs.slice(0, 5).map((photo, idx) => {
              const offset = (idx - (currentIndex % 5) + 5) % 5;
              const isTop = offset === 0;

              return (
                <motion.div
                  key={photo.id}
                  animate={{
                    scale: 1 - offset * 0.05,
                    y: offset * 18,
                    rotate: (offset % 2 === 0 ? 1 : -1) * offset * 3,
                    zIndex: 20 - offset,
                    opacity: offset > 3 ? 0 : 1 - offset * 0.2,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  onClick={isTop ? toggleFlip : handleNext}
                  className="absolute w-[290px] sm:w-[340px] aspect-[4/5] cursor-pointer"
                >
                  <div className="w-full h-full ivory-card rounded-2xl p-4 flex flex-col justify-between border border-accent-gold/40 shadow-xl">
                    <div className="relative w-full h-[82%] rounded-xl overflow-hidden bg-universe-charcoal">
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="pt-2 flex items-center justify-between text-universe-charcoal">
                      <span className="font-serif font-bold text-sm">{photo.title}</span>
                      <span className="font-mono text-[10px] uppercase text-accent-pink tracking-widest">
                        {isTop ? "ACTIVE" : "SHUFFLE"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ========================================================
            LAYOUT D: POLAROID COLLECTION
            ======================================================== */}
        {layoutMode === "polaroid" && (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 items-center">
            {photographs.slice(0, 8).map((photo, idx) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.05, rotate: (idx % 2 === 0 ? 2 : -2) }}
                onClick={() => {
                  setCurrentIndex(idx);
                  setLayoutMode("editorial");
                  soundEngine.playCardFlip();
                }}
                className="ivory-card rounded-lg p-3 sm:p-4 flex flex-col justify-between border border-accent-gold/30 cursor-pointer shadow-md"
              >
                <div className="relative w-full aspect-square rounded overflow-hidden bg-universe-charcoal mb-2">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="text-center font-serif italic text-xs text-universe-charcoal truncate">
                  {photo.title}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Navigation & Counter Bar */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-accent-pink/30 glass-panel-dark flex items-center justify-center text-accent-ivory hover:text-white hover:border-accent-pink transition-all"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="font-mono text-xs tracking-[0.3em] uppercase text-accent-rose">
            <span>{String(currentIndex + 1).padStart(2, "0")}</span>
            <span className="text-accent-pink mx-2">/</span>
            <span>{String(photographs.length).padStart(2, "0")}</span>
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-accent-pink/30 glass-panel-dark flex items-center justify-center text-accent-ivory hover:text-white hover:border-accent-pink transition-all"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-accent-rose/40 border-t border-accent-pink/15 pt-4">
        <div>THE PHOTOGRAPH EXPERIENCE // ACT IV</div>
        <div>CLICK TO FLIP • ARROW KEYS TO NAVIGATE</div>
      </div>
    </div>
  );
}
