"use client";

import React from "react";
import FairytaleReader from "@/components/fairytale/FairytaleReader";
import StarfieldBackground from "@/components/3d/StarfieldBackground";
import { BookOpen, Sparkles } from "lucide-react";

export default function FairytalePage() {
  return (
    <div className="relative min-h-screen w-full bg-obsidian-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <StarfieldBackground particleCount={120} speed={0.3} />

      {/* Header Dossier */}
      <div className="max-w-7xl mx-auto mb-10 text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-metallic/30 glass-panel text-gold-champagne text-xs font-mono tracking-[0.25em] uppercase">
          <BookOpen className="w-3.5 h-3.5 text-gold-metallic" />
          <span>CINEMATIC NARRATIVE • 5 CHRONICLES</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-warm tracking-tight">
          THE <span className="font-bold text-gold-gradient italic">FAIRYTALE</span>
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-rose-blush/90 max-w-xl mx-auto">
          An illustrated mythic journey chronicling how one girl’s presence transformed an ordinary
          world into an infinite, glowing universe.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FairytaleReader />
      </div>
    </div>
  );
}
