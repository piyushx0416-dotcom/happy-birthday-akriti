"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, Heart, Lock } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { OPEN_WHEN_LETTERS } from "@/data/letters";
import { OpenWhenLetter } from "@/types";
import { LetterModal } from "./LetterModal";
import { useSound } from "@/hooks/useSound";

export function OpenWhenLetters() {
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);
  const { playEnvelope, playClick } = useSound();

  const handleOpenLetter = (letter: OpenWhenLetter) => {
    playEnvelope();
    setSelectedLetter(letter);
  };

  return (
    <section id="letters" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Chapter Header */}
      <SectionHeader
        badge="HEARTFELT LETTERS"
        title="OPEN WHEN..."
        romanticNote="A collection of private letters sealed for every mood"
        subtitle="Written from the heart, sealed with gold, and waiting for the exact moment you need to read them. Click any envelope to break the seal and unfold the message."
      />

      {/* Grid of 8 Luxury Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {OPEN_WHEN_LETTERS.map((letter, idx) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            onClick={() => handleOpenLetter(letter)}
            className="group relative cursor-pointer"
          >
            {/* Realistic Envelope Shell */}
            <div className="editorial-frame p-6 sm:p-7 rounded-2xl h-full flex flex-col justify-between border border-gold/25 group-hover:border-gold/70 group-hover:shadow-[0_12px_40px_rgba(214,189,139,0.2)] transition-all duration-500 overflow-hidden">
              {/* Envelope Flap Accent Lines */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

              <div>
                {/* Envelope Header & Seal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-gold/60 uppercase">
                    LETTER #{idx + 1}
                  </span>
                  {/* Wax Seal Imitation */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shadow-md border border-white/20 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: letter.sealColor }}
                  >
                    <Heart className="w-3.5 h-3.5 text-white/90 fill-white/80" />
                  </div>
                </div>

                {/* Trigger Question */}
                <h3 className="font-serif text-2xl text-ivory group-hover:text-gold transition-colors duration-300 font-normal leading-snug">
                  {letter.trigger}
                </h3>

                {/* Prompt Teaser */}
                <p className="text-xs text-ivory/65 font-sans font-light mt-3 leading-relaxed">
                  {letter.previewPrompt}
                </p>
              </div>

              {/* Action Prompt */}
              <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-xs text-gold/80 font-sans tracking-widest uppercase">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>UNFOLD LETTER</span>
                </span>
                <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Letter Modal */}
      <LetterModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
      />
    </section>
  );
}
