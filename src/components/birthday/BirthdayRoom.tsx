"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Flame, Volume2, RotateCcw, Mail, Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { InteractiveCake } from "./InteractiveCake";
import { HeartLetterModal } from "./HeartLetterModal";
import { BIRTHDAY_DATA } from "@/data/birthday";
import { useSound } from "@/hooks/useSound";

export function BirthdayRoom() {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(false);
  const { playBlowCandle, playCelebration, playEnvelope, playClick } = useSound();

  const handleBlowCandles = () => {
    if (candlesBlown) return;

    // 1. Play candle blowing whoosh
    playBlowCandle();

    // 2. Extinguish candles state
    setCandlesBlown(true);

    // 3. Trigger celebratory fanfare
    setTimeout(() => {
      playCelebration();
    }, 400);

    // 4. Trigger fireworks & golden stardust burst
    triggerFireworks();
  };

  const triggerFireworks = () => {
    const end = Date.now() + 4 * 1000;
    const colors = ["#D6BD8B", "#FFF4DE", "#C5B2E8", "#DDAEBC", "#FFFFFF"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleResetCandles = () => {
    playClick(880);
    setCandlesBlown(false);
  };

  return (
    <section id="birthday" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Celebration Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-royal/20 blur-[140px] pointer-events-none -z-10" />

      {/* Editorial Chapter Header */}
      <SectionHeader
        badge="THE GRAND FINALE"
        title="THE CELESTIAL BIRTHDAY ROOM"
        romanticNote="Honouring nineteen years of Akriti's radiant light"
        subtitle="Today, the universe stands still to celebrate the day someone extraordinary came into existence."
      />

      {/* Main Birthday Greeting Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ivory tracking-wide leading-tight font-normal">
          HAPPY 19TH BIRTHDAY, <span className="text-gold">AKRITI</span>.
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-lavender mt-3">
          &ldquo;Today, the universe celebrates the day someone extraordinary came into existence.&rdquo;
        </p>
      </div>

      {/* Interactive Birthday Cake Presentation */}
      <div className="flex flex-col items-center justify-center my-8">
        <InteractiveCake isBlownOut={candlesBlown} />

        {/* Wish Prompt & Action Button */}
        <div className="text-center mt-6 max-w-md">
          {!candlesBlown ? (
            <>
              <p className="text-sm font-serif italic text-gold-light mb-4">
                &ldquo;{BIRTHDAY_DATA.wishPrompt}&rdquo;
              </p>
              <button
                onClick={handleBlowCandles}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-gold/90 via-gold-light to-gold text-midnight font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-medium border border-gold/70 shadow-[0_0_35px_rgba(214,189,139,0.5)] hover:shadow-[0_0_50px_rgba(214,189,139,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer mx-auto"
              >
                <Flame className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>MAKE A WISH & BLOW CANDLES</span>
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-purple-deep/60 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
                <span className="text-xs font-sans tracking-widest text-gold uppercase">
                  WISH SENT TO THE STARS
                </span>
              </div>
              <p className="font-script text-2xl text-ivory">
                May every secret desire of your heart find its way to you this year.
              </p>
              <button
                onClick={handleResetCandles}
                className="inline-flex items-center gap-1.5 text-xs font-sans tracking-widest text-ivory/60 hover:text-gold transition-colors cursor-pointer uppercase"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relight the 19 candles</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Grand Birthday Message Card */}
      <AnimatePresence>
        {candlesBlown && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="editorial-frame max-w-3xl mx-auto p-8 sm:p-12 md:p-16 rounded-3xl mt-16 text-center space-y-6 relative overflow-hidden border border-gold/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)]"
          >
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto bg-gold/10">
              <Heart className="w-6 h-6 text-gold fill-gold/20" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal">
              A Birthday Blessing for Akriti
            </h3>

            <div className="w-16 h-[1px] bg-gold/40 mx-auto" />

            <div className="space-y-4 text-base sm:text-lg text-ivory/85 font-serif font-light leading-relaxed max-w-2xl mx-auto">
              <p>
                Happy Birthday, Akriti.
              </p>
              <p>
                I hope this year brings you everything your heart has been quietly wishing for.
              </p>
              <p>
                May you always find reasons to smile, people who make you feel valued, and moments that remind you how beautiful life can be.
              </p>
              <p className="text-gold font-normal">
                Never forget how special you are.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  playEnvelope();
                  setIsLetterOpen(true);
                }}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-deep via-purple-royal to-purple-deep text-ivory font-sans text-xs tracking-[0.25em] uppercase border border-gold/50 shadow-xl hover:border-gold hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                <span>A LETTER FROM MY HEART</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SECTION 15: FINAL CINEMATIC EXPERIENCE
         ========================================================================= */}
      <div className="mt-32 pt-20 border-t border-gold/20 text-center max-w-3xl mx-auto space-y-8">
        <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center mx-auto bg-purple-deep/50 shadow-[0_0_20px_rgba(214,189,139,0.3)]">
          <Star className="w-4 h-4 text-gold animate-pulse" />
        </div>

        <h3 className="font-serif text-3xl sm:text-5xl text-ivory font-normal tracking-wide leading-tight">
          &ldquo;THE UNIVERSE IS BIG.
          <br />
          <span className="text-gold font-normal">
            BUT MY FAVOURITE PART OF IT WILL ALWAYS BE YOU.
          </span>
          &rdquo;
        </h3>

        <p className="font-script text-2xl text-lavender">
          Made with love, exclusively for Akriti Singh.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            onClick={() => playClick(1100)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass-pill border border-gold/30 text-xs font-sans tracking-[0.25em] uppercase text-ivory hover:text-gold hover:border-gold transition-all duration-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REVISIT YOUR UNIVERSE</span>
          </Link>
        </div>
      </div>

      {/* Heart Letter Modal */}
      <HeartLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />
    </section>
  );
}
