"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData } from "@/lib/data/experienceData";
import { soundEngine } from "@/lib/audio/soundtrack";
import { Heart, ArrowRight, Sparkles } from "lucide-react";

interface BirthdayMessageProps {
  onContinue: () => void;
}

export default function BirthdayMessage({ onContinue }: BirthdayMessageProps) {
  const { messages, celebrant } = experienceData;
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
      soundEngine.playChime(784);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-universe-black flex flex-col justify-between px-6 py-8 select-none">
      {/* Dark Starry Atmosphere */}
      <div className="absolute inset-0 z-0 bg-universe-black pointer-events-none">
        {/* Subtle radial starlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent-pink/10 via-accent-lavender/5 to-transparent rounded-full blur-[120px]" />
        
        {/* Small scattered starlight specks */}
        <div className="absolute top-1/4 left-1/6 w-1 h-1 rounded-full bg-accent-gold animate-ping opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse opacity-70" />
        <div className="absolute top-1/5 right-1/6 w-1 h-1 rounded-full bg-accent-lavender opacity-60" />
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-accent-ivory opacity-50" />
      </div>

      {/* Top Meta Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-accent-rose text-sm">Chapter 03</span>
          <span className="text-accent-pink">✦</span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent-ivory/60">
            THE BIRTHDAY MESSAGE
          </span>
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
      </motion.div>

      {/* Central Warm-Ivory Message Panel */}
      <div className="relative z-10 max-w-2xl mx-auto w-full my-auto py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative ivory-card rounded-2xl p-8 sm:p-12 md:p-14 border border-accent-gold/40 relative overflow-hidden"
        >
          {/* Subtle Paper Texture & Corner Gold Filigree */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent-gold/60 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent-gold/60 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent-gold/60 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent-gold/60 pointer-events-none" />

          {/* Embossed Watermark in Ivory Background */}
          <div className="absolute -bottom-8 -right-8 font-serif text-[130px] font-bold text-accent-gold/5 pointer-events-none select-none">
            19
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            {/* Small Animated Heart & Header Emblem */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-12 h-12 rounded-full bg-accent-pink/10 border border-accent-pink/30 flex items-center justify-center text-accent-pink"
            >
              <Heart className="w-5 h-5 fill-accent-pink animate-pulse" />
            </motion.div>

            {/* Date Tag */}
            <div className="font-mono text-[11px] tracking-[0.35em] uppercase text-universe-charcoal/60">
              NOVEMBER 06, {celebrant.year} • EDITION XIX
            </div>

            {/* Headline: "Happy birthday, my love." with gradual reveal */}
            <AnimatePresence>
              {revealed && (
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-universe-charcoal leading-tight"
                >
                  {messages.birthdayCardHeadline}
                </motion.h2>
              )}
            </AnimatePresence>

            {/* Thin Decorative Divider */}
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-accent-pink/50 to-transparent" />

            {/* Introductory Message Body */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="space-y-3 font-serif text-base sm:text-lg md:text-xl text-universe-charcoal/85 leading-relaxed max-w-lg"
            >
              {messages.birthdayCardBody.split("\n").map((line, idx) => (
                <p key={idx} className="italic">
                  {line}
                </p>
              ))}
            </motion.div>

            {/* The CONTINUE Interaction */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="pt-4"
            >
              <button
                onClick={() => {
                  soundEngine.playCardFlip();
                  onContinue();
                }}
                className="group relative px-8 py-3.5 rounded-full bg-universe-black text-accent-ivory font-mono text-xs tracking-[0.25em] uppercase shadow-lg hover:shadow-xl hover:bg-accent-pink transition-all duration-300 flex items-center gap-3"
              >
                <span>Explore Photographs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-accent-rose/40 border-t border-accent-pink/15 pt-4"
      >
        <div>THE BIRTHDAY MESSAGE // ACT III</div>
        <div>DEDICATED TO AKRITI SINGH</div>
      </motion.div>
    </div>
  );
}
