"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Shuffle, ChevronLeft, ChevronRight, Grid, Compass } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getAll365Reasons } from "@/data/reasons";
import { ReasonToSmile } from "@/types";
import { useSound } from "@/hooks/useSound";
import { formatReasonNumber } from "@/lib/utils";

export function ReasonsToSmile() {
  const allReasons = useMemo(() => getAll365Reasons(), []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");
  const [likedReasons, setLikedReasons] = useState<number[]>([]);
  const { playClick } = useSound();

  const currentReason = allReasons[currentIndex];

  const handleNext = () => {
    playClick(920);
    setCurrentIndex((prev) => (prev + 1) % allReasons.length);
  };

  const handlePrev = () => {
    playClick(880);
    setCurrentIndex((prev) => (prev - 1 + allReasons.length) % allReasons.length);
  };

  const handleRandom = () => {
    playClick(1050);
    const randomIndex = Math.floor(Math.random() * allReasons.length);
    setCurrentIndex(randomIndex);
  };

  const toggleLike = (id: number) => {
    playClick(1150);
    setLikedReasons((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <section id="reasons" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Chapter Header */}
      <SectionHeader
        badge="DAILY INSPIRATION"
        title="365 REASONS TO SMILE"
        romanticNote="A reason for every single sunrise of her 19th year"
        subtitle="One for each day between this birthday and her next. Discover why Akriti brings unmeasured light to those who love her."
      />

      {/* Mode Controls */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <button
          onClick={() => setViewMode("card")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans tracking-widest uppercase transition-all cursor-pointer ${
            viewMode === "card"
              ? "bg-gold text-midnight font-medium shadow-md"
              : "border border-gold/20 text-ivory/60 hover:text-gold"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Card</span>
        </button>

        <button
          onClick={() => setViewMode("grid")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans tracking-widest uppercase transition-all cursor-pointer ${
            viewMode === "grid"
              ? "bg-gold text-midnight font-medium shadow-md"
              : "border border-gold/20 text-ivory/60 hover:text-gold"
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Browse All 365</span>
        </button>
      </div>

      {viewMode === "card" ? (
        /* Single Card Deck View */
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReason.id}
              initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotate: 1 }}
              transition={{ duration: 0.4 }}
              className="editorial-frame w-full p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[320px]"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-dustypink/15 rounded-full blur-[80px] pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gold/20">
                <span className="font-mono text-sm tracking-wider text-gold font-semibold">
                  {formatReasonNumber(currentReason.id)} / 365
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans tracking-widest text-lavender uppercase px-2.5 py-0.5 rounded-full bg-purple-deep border border-purple-royal">
                    {currentReason.category.replace("_", " ")}
                  </span>
                  <button
                    onClick={() => toggleLike(currentReason.id)}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-dustypink cursor-pointer"
                    aria-label="Save Reason"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedReasons.includes(currentReason.id)
                          ? "fill-dustypink text-dustypink"
                          : "text-dustypink/60"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Reason Text */}
              <div className="my-8 text-center px-2">
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory font-normal leading-relaxed">
                  &ldquo;{currentReason.reason}&rdquo;
                </p>
              </div>

              {/* Card Footer Indicator */}
              <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-[11px] font-sans text-ivory/50">
                <span>AKRITI SINGH • 19TH YEAR</span>
                <span>HER UNIVERSE</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full glass-pill border border-gold/30 text-ivory hover:text-gold transition-colors cursor-pointer"
              title="Previous Reason"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleRandom}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-gold/90 to-gold text-midnight font-sans text-xs tracking-widest uppercase font-medium border border-gold/60 shadow-[0_0_25px_rgba(214,189,139,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>GIVE ME ANOTHER REASON</span>
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full glass-pill border border-gold/30 text-ivory hover:text-gold transition-colors cursor-pointer"
              title="Next Reason"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Full 365 Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allReasons.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                playClick(960);
                setCurrentIndex(item.id - 1);
                setViewMode("card");
              }}
              className="editorial-frame p-5 rounded-2xl group cursor-pointer hover:border-gold/60 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-gold mb-2">
                <span>{formatReasonNumber(item.id)}</span>
                <span className="text-lavender/80 uppercase font-sans">
                  {item.category.replace("_", " ")}
                </span>
              </div>
              <p className="font-serif text-base text-ivory/85 line-clamp-3 my-2 font-normal">
                {item.reason}
              </p>
              <span className="text-[10px] font-sans tracking-widest text-gold/60 uppercase opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                EXPAND CARD →
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
