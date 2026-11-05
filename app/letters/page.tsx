"use client";

import React from "react";
import LetterEnvelope from "@/components/letters/LetterEnvelope";
import StarfieldBackground from "@/components/3d/StarfieldBackground";
import { OPEN_WHEN_LETTERS } from "@/lib/data/letters";
import { Mail, Sparkles, Feather } from "lucide-react";

export default function LettersPage() {
  return (
    <div className="relative min-h-screen w-full bg-obsidian-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <StarfieldBackground particleCount={130} speed={0.3} />

      {/* Header Dossier */}
      <div className="max-w-7xl mx-auto mb-12 text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-metallic/30 glass-panel text-gold-champagne text-xs font-mono tracking-[0.25em] uppercase">
          <Mail className="w-3.5 h-3.5 text-gold-metallic" />
          <span>TIMELESS SANCTUARY • 8 SOULFUL LETTERS</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-warm tracking-tight">
          OPEN WHEN <span className="font-bold text-gold-gradient italic">LETTERS</span>
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-rose-blush/90 max-w-xl mx-auto">
          Digital letters sealed in wax, written for specific emotional weathers. Whenever you need
          comfort, courage, laughter, or reassurance, choose an envelope.
        </p>

        <div className="pt-2 text-xs font-mono text-ivory-warm/40">
          Editable Data File: <span className="text-violet-glow">lib/data/letters.ts</span>
        </div>
      </div>

      {/* Grid of 8 Letters */}
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {OPEN_WHEN_LETTERS.map((letter) => (
          <LetterEnvelope key={letter.id} letter={letter} />
        ))}
      </div>
    </div>
  );
}
