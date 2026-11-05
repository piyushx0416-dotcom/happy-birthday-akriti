"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData } from "@/lib/data/experienceData";
import { soundEngine } from "@/lib/audio/soundtrack";
import { Sparkles, Heart, ArrowRight, Mail } from "lucide-react";

interface BirthdayLetterProps {
  onContinue: () => void;
}

export default function BirthdayLetter({ onContinue }: BirthdayLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, celebrant } = experienceData;

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    soundEngine.playWaxSeal();
    soundEngine.playChime(659.25);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-universe-black flex flex-col justify-between px-6 py-8 select-none">
      {/* Background Starry Atmosphere */}
      <div className="absolute inset-0 z-0 bg-universe-black pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-pink/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-accent-rose text-sm">Chapter 05</span>
          <span className="text-accent-pink">✦</span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent-ivory/60">
            THE BIRTHDAY LETTER
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

      {/* Main Letter Stage */}
      <div className="relative z-10 max-w-2xl mx-auto w-full my-auto py-6 flex flex-col items-center justify-center">
        {!isOpen ? (
          /* ========================================================
             CLOSED PHYSICAL ENVELOPE (INTERACTIVE WAX SEAL)
             ======================================================== */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            onClick={handleOpenEnvelope}
            className="group relative w-full max-w-lg aspect-[1.5/1] cursor-pointer"
          >
            {/* Envelope Body */}
            <div className="relative w-full h-full bg-[#151522] rounded-2xl border-2 border-accent-gold/40 shadow-2xl p-6 flex flex-col justify-between overflow-hidden group-hover:border-accent-pink transition-all duration-500">
              {/* Envelope Flap Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 330">
                {/* Triangular Top Flap */}
                <path d="M 0 0 L 250 170 L 500 0" fill="#181827" stroke="#E8C994" strokeWidth="1.5" strokeOpacity="0.4" />
                {/* Side Creases */}
                <path d="M 0 330 L 210 140" stroke="#E8C994" strokeWidth="1" strokeOpacity="0.2" />
                <path d="M 500 330 L 290 140" stroke="#E8C994" strokeWidth="1" strokeOpacity="0.2" />
              </svg>

              {/* Envelope Top Addressee Tag */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[11px] tracking-widest text-accent-rose/70 uppercase">
                <span>PAR AVION • SPECIAL DEDICATION</span>
                <span>06 • 11 • 2026</span>
              </div>

              {/* Central Wax Seal */}
              <div className="relative z-20 mx-auto my-auto flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-accent-pink via-red-600 to-accent-pink/80 border-2 border-accent-gold flex items-center justify-center shadow-[0_0_25px_rgba(255,61,145,0.6)]"
                >
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-accent-ivory">
                    A
                  </span>
                </motion.div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-rose mt-3 group-hover:text-accent-pink transition-colors">
                  CLICK TO BREAK SEAL & OPEN
                </span>
              </div>

              {/* Envelope Recipient Footer */}
              <div className="relative z-10 text-center font-serif italic text-sm text-accent-ivory/80">
                To Akriti Singh • Her Universe
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================
             OPENED LETTER ON LUXURY IVORY STATIONERY
             ======================================================== */
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full ivory-card rounded-2xl p-8 sm:p-12 md:p-14 border border-accent-gold/50 shadow-2xl overflow-hidden"
          >
            {/* Stationery Header Ornament */}
            <div className="flex flex-col items-center text-center space-y-2 border-b border-accent-gold/30 pb-6 mb-6">
              <div className="w-8 h-8 rounded-full bg-accent-pink/10 border border-accent-pink/30 flex items-center justify-center text-accent-pink">
                <Heart className="w-4 h-4 fill-accent-pink" />
              </div>
              <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-universe-charcoal/50">
                PRIVATE ARCHIVAL CORRESPONDENCE • {messages.letterDate}
              </div>
            </div>

            {/* Letter Salutation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-universe-charcoal"
            >
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-universe-charcoal tracking-tight">
                {messages.letterSalutation}
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-serif text-base sm:text-lg md:text-xl leading-relaxed text-universe-charcoal/90">
                {messages.letterBody.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.2 }}
                    className="italic"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Signoff */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="pt-6 border-t border-accent-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-universe-charcoal/70 gap-2"
              >
                <div>
                  <p className="font-serif italic text-sm">{messages.letterSignoff}</p>
                  <p className="font-serif font-bold text-base text-universe-charcoal">
                    {messages.letterAuthor}
                  </p>
                </div>
                <div className="font-mono text-xs text-accent-pink">
                  CHAPTER 19 • COMMENCED
                </div>
              </motion.div>
            </motion.div>

            {/* Navigation Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-8 text-center"
            >
              <button
                onClick={() => {
                  soundEngine.playCardFlip();
                  onContinue();
                }}
                className="group relative px-8 py-3.5 rounded-full bg-universe-black text-accent-ivory font-mono text-xs tracking-[0.25em] uppercase shadow-lg hover:shadow-xl hover:bg-accent-pink transition-all duration-300 inline-flex items-center gap-3"
              >
                <span>Discover Her Qualities</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-accent-rose/40 border-t border-accent-pink/15 pt-4">
        <div>THE BIRTHDAY LETTER // ACT V</div>
        <div>STATIONERY EDITION • AKRITI SINGH</div>
      </div>
    </div>
  );
}
