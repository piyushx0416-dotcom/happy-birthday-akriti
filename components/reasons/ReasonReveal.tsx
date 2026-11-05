"use client";

import React, { useState, useEffect } from "react";
import { Reason365, REASONS_365, CATEGORY_COLORS } from "@/data/reasons365";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shuffle, ChevronLeft, ChevronRight, Heart, Share2, Check } from "lucide-react";
import { gameAudio } from "@/lib/audio/gameAudio";

interface ReasonRevealProps {
  initialReasonId?: number;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onDiscover: (id: number) => void;
  onOpenArchive?: () => void;
}

export default function ReasonReveal({
  initialReasonId = 1,
  favorites,
  onToggleFavorite,
  onDiscover,
  onOpenArchive,
}: ReasonRevealProps) {
  const [currentId, setCurrentId] = useState<number>(initialReasonId);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1);

  const reason: Reason365 =
    REASONS_365.find((r) => r.id === currentId) || REASONS_365[0];

  useEffect(() => {
    onDiscover(currentId);
  }, [currentId, onDiscover]);

  const handleNext = () => {
    setDirection(1);
    gameAudio.playStarChime(700);
    setCurrentId((prev) => (prev >= 365 ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    gameAudio.playStarChime(550);
    setCurrentId((prev) => (prev <= 1 ? 365 : prev - 1));
  };

  const handleRandom = () => {
    setDirection(1);
    gameAudio.playStarChime(880);
    const randomId = Math.floor(Math.random() * 365) + 1;
    setCurrentId(randomId);
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `Reason #${reason.number}: ${reason.title}\n"${reason.text}"\n— Dedicated to Akriti Singh (Her Universe)`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const isFavorited = favorites.includes(reason.id);
  const catColor = CATEGORY_COLORS[reason.category] || {
    bg: "rgba(245, 166, 205, 0.12)",
    text: "#FFB6D9",
    border: "rgba(245, 166, 205, 0.35)",
    glow: "rgba(245, 166, 205, 0.4)",
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-25 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${catColor.text} 0%, transparent 70%)`,
        }}
      />

      {/* Main Reason Parchment Card */}
      <div className="w-full relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, y: direction * 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction * -25, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-7 md:p-11 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border backdrop-blur-xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(26, 11, 30, 0.85) 0%, rgba(10, 4, 13, 0.95) 100%)",
              borderColor: catColor.border,
              boxShadow: `0 15px 50px rgba(0,0,0,0.7), 0 0 35px ${catColor.glow}22`,
            }}
          >
            {/* Top Bar inside card */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span
                  className="px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase border font-medium"
                  style={{
                    backgroundColor: catColor.bg,
                    borderColor: catColor.border,
                    color: catColor.text,
                  }}
                >
                  {reason.category}
                </span>
                <span className="text-xs font-mono text-[#F4E2C7]/70">
                  #{reason.number} of 365
                </span>
              </div>

              {/* Bookmark & Copy Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  title="Copy Reason"
                  className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all bg-white/5 active:scale-95"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => {
                    gameAudio.playStarChime(900);
                    onToggleFavorite(reason.id);
                  }}
                  title={isFavorited ? "Saved in Favourites" : "Save to Favourites"}
                  className={`p-2 rounded-full border transition-all active:scale-90 ${
                    isFavorited
                      ? "border-[#FF3D91] bg-[#FF3D91]/20 text-[#FF69B4] shadow-[0_0_15px_rgba(255,61,145,0.4)]"
                      : "border-white/10 hover:border-[#FF3D91]/50 text-white/60 hover:text-[#FF9FCB] bg-white/5"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      isFavorited ? "fill-current scale-110" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Core Reason Typography */}
            <div className="py-8 md:py-12 space-y-5 text-center sm:text-left">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#E5C388]/80 flex items-center justify-center sm:justify-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E5C388]" />
                <span>Why I Love Akriti</span>
              </p>

              <h3 className="font-serif text-2xl md:text-4xl text-white/95 font-normal tracking-tight leading-snug">
                {reason.title}
              </h3>

              <div className="relative py-2">
                <span className="absolute -top-3 -left-3 text-4xl font-serif text-[#FFB6D9]/20 select-none">
                  “
                </span>
                <p className="font-serif italic text-lg md:text-2xl text-[#FFF5FA]/90 leading-relaxed pl-2 pr-4">
                  {reason.text}
                </p>
                <span className="inline-block text-3xl font-serif text-[#FFB6D9]/20 select-none align-bottom ml-1">
                  ”
                </span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-white/40 gap-3">
              <span>FOR AKRITI SINGH • 19TH BIRTHDAY</span>
              <span className="text-[#FFB6D9]/80 font-serif italic text-sm">
                Nov 6, 2026 • Chapter III
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Exploration Controls */}
      <div className="w-full mt-6 flex flex-wrap items-center justify-between gap-4">
        {/* Prev / Next buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-mono tracking-wider transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-mono tracking-wider transition-all active:scale-95"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Surprise Me / Random Button */}
        <button
          onClick={handleRandom}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F5A6CD]/25 to-[#C4A1D9]/25 hover:from-[#F5A6CD]/40 hover:to-[#C4A1D9]/40 border border-[#F5A6CD]/40 text-[#FFB6D9] text-xs font-mono font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(245,166,205,0.2)] hover:scale-105 active:scale-95"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Random Reason</span>
        </button>

        {/* View Archive link */}
        {onOpenArchive && (
          <button
            onClick={onOpenArchive}
            className="text-xs font-mono tracking-wider text-[#F4E2C7]/70 hover:text-[#F4E2C7] underline underline-offset-4 transition-colors"
          >
            Browse All 365 ➔
          </button>
        )}
      </div>
    </div>
  );
}
