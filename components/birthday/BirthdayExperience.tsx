"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { calculateTimeUntilBirthday, CountdownTime } from "@/lib/utils/countdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Gift,
  Flame,
  Heart,
  RotateCcw,
  Star,
  Send,
  Award,
  Music,
  CheckCircle2
} from "lucide-react";
import { ambientSound } from "@/lib/audio/soundtrack";

export default function BirthdayExperience() {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 4,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isReached: false,
    totalSeconds: 100,
  });

  const [isCelebrationActive, setIsCelebrationActive] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishText, setWishText] = useState("");
  const [submittedWishes, setSubmittedWishes] = useState<string[]>([]);
  const [wishSaved, setWishSaved] = useState(false);

  // Live countdown ticker
  useEffect(() => {
    const updateTime = () => {
      const t = calculateTimeUntilBirthday();
      setCountdown(t);
      if (t.isReached && !isCelebrationActive) {
        triggerCelebration();
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [isCelebrationActive]);

  // Load saved wishes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("akriti_birthday_wishes");
      if (saved) {
        setSubmittedWishes(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const triggerCelebration = () => {
    setIsCelebrationActive(true);
    ambientSound.play();

    // Trigger golden and violet fireworks confetti
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#d4af37", "#f5e7c8", "#8b5cf6", "#e2b4bd", "#ffffff"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#d4af37", "#f5e7c8", "#8b5cf6", "#e2b4bd", "#ffffff"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    triggerCelebration();
  };

  const handleReplay = () => {
    setCandlesBlown(false);
    triggerCelebration();
  };

  const handleSaveWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    const newWishes = [wishText.trim(), ...submittedWishes];
    setSubmittedWishes(newWishes);
    setWishText("");
    setWishSaved(true);

    try {
      localStorage.setItem("akriti_birthday_wishes", JSON.stringify(newWishes));
    } catch {}

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#d4af37", "#f5e7c8", "#8b5cf6"],
    });

    setTimeout(() => setWishSaved(false), 4000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      {/* Hero Birthday Banner */}
      <div className="relative rounded-3xl p-8 sm:p-14 glass-panel border border-gold-metallic/40 shadow-2xl text-center overflow-hidden bg-gradient-to-b from-[#1b1033]/90 via-[#100821]/95 to-[#070310]/95">
        {/* Shimmering Backlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-metallic/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-metallic/40 bg-midnight-900/80 text-gold-champagne text-xs font-mono tracking-[0.3em] uppercase mb-6">
          <Sparkles className="w-4 h-4 text-gold-metallic animate-spin-slow" />
          <span>NOVEMBER 6, 2026 • 19TH CELEBRATION</span>
        </div>

        <motion.h1
          animate={{ scale: isCelebrationActive ? [1, 1.03, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-gold-gradient tracking-tight leading-tight"
        >
          HAPPY 19TH BIRTHDAY,
          <br />
          <span className="text-ivory-warm">AKRITI.</span>
        </motion.h1>

        <p className="mt-4 font-serif italic text-base sm:text-xl text-rose-blush/90 max-w-2xl mx-auto">
          “Out of all the universes that could exist, I am glad yours exists in mine.”
        </p>

        {/* Countdown Timer Grid */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "DAYS", value: countdown.days },
              { label: "HOURS", value: countdown.hours },
              { label: "MINUTES", value: countdown.minutes },
              { label: "SECONDS", value: countdown.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-3 sm:p-5 border border-gold-metallic/30 flex flex-col items-center justify-center shadow-lg bg-midnight-900/60"
              >
                <div className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-gold-champagne">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-[10px] sm:text-xs font-mono tracking-widest text-ivory-warm/60 mt-1 uppercase">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] font-mono tracking-widest text-violet-glow uppercase">
            Timezone: Asia/Kolkata (IST) • Midnight Arrival
          </div>
        </div>

        {/* Celebration Action Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={triggerCelebration}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-champagne via-gold-metallic to-amber-600 text-obsidian-950 font-bold uppercase tracking-wider text-xs sm:text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isCelebrationActive ? "Trigger Fireworks Again" : "Celebrate Now (Preview Finale)"}</span>
          </button>

          {isCelebrationActive && (
            <button
              onClick={handleReplay}
              className="px-6 py-3.5 rounded-full border border-gold-metallic/40 glass-panel text-gold-champagne hover:border-gold-champagne text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Finale</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Birthday Cake with Clickable Candles */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-gold-metallic/30 shadow-2xl text-center relative overflow-hidden bg-gradient-to-b from-midnight-950 to-obsidian-950">
        <div className="text-xs uppercase tracking-[0.25em] text-violet-glow mb-2 font-mono">
          TRADITIONAL CELESTIAL RITUAL
        </div>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-gold-champagne mb-2">
          Make a 19th Birthday Wish
        </h3>
        <p className="text-xs sm:text-sm text-ivory-warm/70 italic font-serif max-w-lg mx-auto mb-8">
          Touch the candles to extinguish the flames and release your wishes into the starlight.
        </p>

        {/* Stylized CSS Birthday Cake */}
        <div
          onClick={handleBlowCandles}
          className="cursor-pointer inline-flex flex-col items-center justify-center p-6 group select-none"
        >
          {/* 19 Candles */}
          <div className="flex items-end justify-center gap-3 sm:gap-4 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Candle Flame */}
                <div
                  className={`w-3.5 h-6 rounded-full transition-all duration-500 ${
                    candlesBlown
                      ? "opacity-0 scale-50"
                      : "bg-gradient-to-t from-amber-500 via-yellow-300 to-white animate-pulse shadow-[0_0_15px_#f59e0b]"
                  }`}
                />
                {/* Candle Stick */}
                <div className="w-2.5 h-10 bg-gradient-to-b from-gold-champagne to-rose-gold rounded-t-sm shadow-md" />
              </div>
            ))}
          </div>

          {/* Tier 1 Cake Top */}
          <div className="w-44 sm:w-56 h-12 bg-gradient-to-r from-ivory-warm via-rose-blush to-ivory-warm rounded-t-2xl border-t-2 border-gold-champagne flex items-center justify-center shadow-lg">
            <span className="text-[11px] tracking-widest text-obsidian-950 font-serif font-bold">
              19 YEARS OF LIGHT
            </span>
          </div>

          {/* Tier 2 Cake Base */}
          <div className="w-60 sm:w-72 h-16 bg-gradient-to-r from-[#2a1b4d] via-[#3a2663] to-[#2a1b4d] rounded-b-2xl border-b-2 border-gold-metallic flex items-center justify-center shadow-2xl">
            <span className="text-xs tracking-[0.3em] text-gold-champagne font-mono">
              ✦ AKRITI SINGH ✦
            </span>
          </div>

          <div className="mt-5 text-xs text-gold-champagne font-mono tracking-wider flex items-center gap-1.5 group-hover:scale-105 transition-transform">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>
              {candlesBlown
                ? "✨ Candles Extinguished! Wishes Whispered to the Stars ✨"
                : "Click cake to blow out candles & celebrate"}
            </span>
          </div>
        </div>
      </div>

      {/* The 19th Birthday Letter Finale */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-gold-metallic/40 shadow-2xl space-y-6 bg-gradient-to-b from-[#160d2e]/90 to-[#0a0517]/95">
        <div className="border-b border-gold-metallic/20 pb-6 text-center sm:text-left">
          <span className="text-[11px] uppercase tracking-[0.25em] text-violet-glow font-mono">
            GOLDEN OCCASION LETTER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gold-champagne font-bold mt-1">
            To Akriti at Nineteen
          </h2>
          <p className="text-xs sm:text-sm text-rose-blush italic font-serif">
            A message preserved for this exact moment.
          </p>
        </div>

        <div className="space-y-4 font-serif text-base sm:text-lg text-ivory-warm/85 leading-relaxed">
          <p>
            Nineteen is not merely a number; it is an extraordinary golden bridge. Behind you lies
            every lesson, every quiet triumph, and every childhood memory that shaped your graceful
            character. Ahead of you lies a wide-open canvas where your intellect, talent, and dreams
            will paint reality.
          </p>
          <p>
            I hope you look in the mirror today and feel immense reverence for who you are. The way
            you listen, the way you laugh, the way you stand firm in your values—these are rare gifts.
            Never let the noise of the world persuade you to dim your light.
          </p>
          <p className="text-gold-champagne italic">
            May this 19th year bring you boundless courage, radiant health, deep peace, and joy that
            fills your chest to the brim. Happy Birthday, Akriti!
          </p>
        </div>
      </div>

      {/* Celestial Wish Box (Interactive) */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold-metallic/30 shadow-2xl space-y-6 bg-midnight-950/80">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-metallic font-mono">
            ETERNAL WISH ARCHIVE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-champagne mt-1">
            Send a Wish into Her Universe
          </h3>
          <p className="text-xs sm:text-sm text-ivory-warm/60 font-sans mt-1">
            Write a birthday wish, blessing, or personal prayer for Akriti to preserve it forever in
            this starfield.
          </p>
        </div>

        <form onSubmit={handleSaveWish} className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="Write your heartfelt wish for Akriti's 19th year..."
              className="w-full bg-obsidian-950 border border-gold-metallic/30 rounded-2xl p-4 text-sm text-ivory-warm placeholder-ivory-warm/40 focus:outline-none focus:border-gold-champagne transition-all"
            />
          </div>

          <div className="flex items-center justify-between">
            {wishSaved ? (
              <span className="text-xs text-gold-champagne flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold-metallic" />
                Wish etched into the constellation!
              </span>
            ) : (
              <span className="text-[11px] text-ivory-warm/40">
                Wishes are saved locally in your star ledger
              </span>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gold-champagne text-obsidian-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-shimmer transition-all flex items-center gap-2 shadow-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inscribe Wish</span>
            </button>
          </div>
        </form>

        {/* Existing Submitted Wishes */}
        {submittedWishes.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gold-metallic/15 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-violet-glow">
              Recent Inscriptions ({submittedWishes.length})
            </div>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2">
              {submittedWishes.map((w, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-midnight-900/60 border border-gold-metallic/15 text-xs text-ivory-warm/80 font-serif italic"
                >
                  “{w}”
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
