"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, ArrowRight } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { AKRITI_DATA } from "@/data/akriti";

interface OpeningScreenProps {
  onEnter: () => void;
}

export function OpeningScreen({ onEnter }: OpeningScreenProps) {
  const { toggleSound, playClick } = useSound();
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = (enableAudio: boolean = false) => {
    if (enableAudio) {
      toggleSound();
    }
    playClick(1100);
    setHasEntered(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight text-ivory px-6 text-center overflow-hidden select-none"
        >
          {/* Cosmic Background Nebulae */}
          <div className="absolute inset-0 bg-cosmic-glow pointer-events-none" />
          <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-royal/25 blur-[120px] pointer-events-none" />

          {/* Skip Intro Link */}
          <button
            onClick={() => handleEnter(false)}
            className="absolute top-6 right-6 text-xs font-sans tracking-widest text-ivory/50 hover:text-gold transition-colors duration-300 cursor-pointer uppercase"
          >
            Skip Intro →
          </button>

          {/* Main Cinematic Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 max-w-2xl flex flex-col items-center"
          >
            {/* Top Emblem */}
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-8 bg-purple-deep/40 shadow-[0_0_25px_rgba(214,189,139,0.3)]">
              <Sparkles className="w-5 h-5 text-gold animate-spin-slow" />
            </div>

            {/* Opening Poetic Narrative */}
            <p className="font-serif text-lg sm:text-2xl text-ivory/85 leading-relaxed font-light mb-6">
              &ldquo;{AKRITI_DATA.openingQuote}&rdquo;
            </p>

            {/* Name Reveal */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.18em] uppercase text-ivory mb-2"
            >
              AKRITI SINGH
            </motion.h1>

            {/* Script Subtext */}
            <p className="font-script text-2xl sm:text-3xl text-lavender mb-10">
              A universe created just for you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => handleEnter(true)}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-gold/90 via-gold-light to-gold text-midnight font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-medium border border-gold/60 shadow-[0_0_35px_rgba(214,189,139,0.4)] hover:shadow-[0_0_50px_rgba(214,189,139,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-midnight group-hover:animate-pulse" />
                <span>ENTER WITH SOUND</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleEnter(false)}
                className="px-6 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase text-ivory/70 hover:text-gold border border-transparent hover:border-gold/30 transition-all cursor-pointer"
              >
                ENTER SILENTLY
              </button>
            </div>

            {/* Subtle Footnote */}
            <span className="mt-12 text-[10px] tracking-widest text-gold/60 font-sans uppercase">
              19TH BIRTHDAY • NOVEMBER 6, 2026
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
