"use client";

import React, { useState } from "react";
import { OpenWhenLetter } from "@/lib/data/letters";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Sparkles, Feather, Clock } from "lucide-react";

interface LetterEnvelopeProps {
  letter: OpenWhenLetter;
}

export default function LetterEnvelope({ letter }: LetterEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Closed Envelope Card */}
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer group relative rounded-3xl overflow-hidden glass-panel border border-gold-metallic/30 p-6 flex flex-col justify-between h-[320px] transition-all duration-300 hover:border-gold-champagne hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] bg-gradient-to-br from-obsidian-900/90 via-midnight-950/80 to-obsidian-950/90"
      >
        {/* Envelope Flap Simulation Graphic */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-midnight-800/40 to-transparent pointer-events-none" />

        {/* Top Meta */}
        <div className="flex items-center justify-between text-xs tracking-widest uppercase text-ivory-warm/50 z-10">
          <span className="flex items-center gap-1.5 text-gold-metallic">
            <Feather className="w-3.5 h-3.5" />
            {letter.dateTag}
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3" />
            {letter.readTime}
          </span>
        </div>

        {/* Central Wax Seal Emblem */}
        <div className="my-auto text-center z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-champagne via-gold-metallic to-amber-700 flex items-center justify-center shadow-lg border-2 border-gold-champagne group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
            <span className="text-2xl select-none">{letter.waxSealIcon}</span>
          </div>
          <div className="mt-3 text-[10px] tracking-[0.3em] uppercase text-gold-champagne/80 font-medium">
            SEALED FOR AKRITI
          </div>
        </div>

        {/* Title & Preview */}
        <div className="z-10 text-center">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory-warm group-hover:text-gold-champagne transition-colors">
            {letter.title}
          </h3>
          <p className="text-xs text-ivory-warm/60 line-clamp-2 mt-1 font-sans">
            {letter.subtitle}
          </p>
        </div>

        {/* Hover Click Hint */}
        <div className="mt-2 text-center text-[10px] tracking-widest uppercase text-violet-glow font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Click to Break Seal & Read</span>
        </div>
      </motion.div>

      {/* Expanded Modal Letter */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-obsidian-950/85 backdrop-blur-md">
            {/* Backdrop click */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel p-6 sm:p-10 border border-gold-metallic/40 shadow-2xl bg-gradient-to-b from-[#181128] via-[#100a1d] to-[#0a0714] text-ivory-warm z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-gold-metallic/30 bg-midnight-900/60 hover:bg-midnight-800 text-ivory-warm hover:text-gold-champagne transition-colors"
                aria-label="Close Letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-gold-metallic/20 pb-6 mb-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-glow mb-2">
                  <Feather className="w-3.5 h-3.5 text-gold-metallic" />
                  <span>Open When Archive • {letter.dateTag}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-gold-champagne font-bold">
                  {letter.title}
                </h2>
                <p className="text-xs sm:text-sm text-ivory-warm/60 mt-1 italic font-serif">
                  “{letter.quote}”
                </p>
              </div>

              {/* Letter Body Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-ivory-warm/85 font-sans leading-relaxed">
                {letter.content.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? "font-serif text-lg text-gold-champagne" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Letter Footer */}
              <div className="mt-8 pt-6 border-t border-gold-metallic/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-warm/50">
                <span className="font-serif italic text-gold-champagne">
                  Woven with love for Akriti Singh • 19th Birthday
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-full border border-gold-metallic/40 bg-midnight-900 hover:bg-midnight-800 text-gold-champagne text-xs uppercase tracking-wider font-medium transition-all"
                >
                  Fold & Return to Archive
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
