"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw } from "lucide-react";

interface Act06TheTimepieceProps {
  onReplay: () => void;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Act06TheTimepiece({ onReplay }: Act06TheTimepieceProps) {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 3,
    hours: 21,
    minutes: 33,
    seconds: 28,
  });

  // Calculate live countdown to November 6, 2026
  useEffect(() => {
    const targetDate = new Date("2026-11-06T00:00:00+05:30").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#FF3D91", "#E8C994", "#FF9FCB", "#FFFFFF"],
    });
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-20 lg:py-24 bg-[#07050B] select-none text-center">
      {/* Background Subtle Magenta Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-purple-950/20 rounded-full blur-[180px]" />
      </div>

      {/* Top Header Information */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-2 pt-2">
        <div className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-[#E8C994] font-medium">
          PRECISION COUNTDOWN // NOV 06
        </div>

        <h2 className="font-editorial-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#F8F1E8] tracking-tight uppercase">
          COUNTING DOWN TO AKRITI&apos;S DAY
        </h2>
      </div>

      {/* Main Countdown & Birthday Dedication Centerpiece */}
      <div className="relative z-10 max-w-3xl mx-auto w-full space-y-8 my-auto py-6">
        {/* Precision Clock Container */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 sm:px-10 py-5 rounded-3xl border border-[#E8C994]/30 bg-[#13101C]/80 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#F8F1E8]">
              {String(countdown.days).padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#F8F1E8]/50 mt-1">
              DAYS
            </span>
          </div>

          <span className="text-[#E8C994]/40 font-serif text-2xl hidden sm:inline">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#F8F1E8]">
              {String(countdown.hours).padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#F8F1E8]/50 mt-1">
              HOURS
            </span>
          </div>

          <span className="text-[#E8C994]/40 font-serif text-2xl hidden sm:inline">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#F8F1E8]">
              {String(countdown.minutes).padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#F8F1E8]/50 mt-1">
              MINUTES
            </span>
          </div>

          <span className="text-[#E8C994]/40 font-serif text-2xl hidden sm:inline">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#E8C994]">
              {String(countdown.seconds).padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#E8C994]/70 mt-1">
              SECONDS
            </span>
          </div>
        </div>

        {/* The Reveal Texts */}
        <div className="space-y-3">
          <div className="font-cinzel-caps text-base sm:text-xl md:text-2xl tracking-[0.35em] text-[#F8F1E8]/80 uppercase">
            HAPPY BIRTHDAY
          </div>

          <h1 className="font-editorial-serif text-5xl sm:text-7xl md:text-8xl font-normal text-pink-gradient tracking-tight leading-none py-1">
            Akriti Singh.
          </h1>

          <p className="font-sans text-xs sm:text-base text-[#F8F1E8]/70 italic max-w-lg mx-auto pt-2">
            “May your day be as effortless, luminous, and extraordinary as you are.”
          </p>
        </div>

        {/* Glowing Diamond Emblem */}
        <div
          onClick={triggerCelebration}
          className="cursor-pointer inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-950/40 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-125 transition-transform duration-300"
          title="Click for Celebration Sparkles!"
        >
          <span className="text-xl">💎</span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-4">
        <button
          onClick={onReplay}
          className="group px-6 py-2.5 rounded-full border border-[#E8C994]/40 bg-[#13101C] text-[#E8C994] font-mono text-xs tracking-widest uppercase hover:bg-[#E8C994]/15 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform" />
          <span>REPLAY EXPERIENCE</span>
        </button>

        <button
          onClick={triggerCelebration}
          className="px-6 py-2.5 rounded-full bg-[#E8C994] text-[#07050B] font-mono font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-[0_0_20px_rgba(232,201,148,0.4)] flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>CELEBRATE AKRITI</span>
        </button>
      </div>
    </div>
  );
}
