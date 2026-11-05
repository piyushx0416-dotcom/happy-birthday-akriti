"use client";

import React from "react";
import ConstellationMap from "@/components/3d/ConstellationMap";
import StarfieldBackground from "@/components/3d/StarfieldBackground";
import { Star, Sparkles, Compass } from "lucide-react";

export default function ConstellationPage() {
  return (
    <div className="relative min-h-screen w-full bg-obsidian-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <StarfieldBackground particleCount={140} speed={0.3} />

      {/* Header Dossier */}
      <div className="max-w-7xl mx-auto mb-10 text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-metallic/30 glass-panel text-gold-champagne text-xs font-mono tracking-[0.25em] uppercase">
          <Star className="w-3.5 h-3.5 text-gold-metallic" />
          <span>CELESTIAL CARTOGRAPHY • 8 LUMINOUS VIRTUES</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-warm tracking-tight">
          HER <span className="font-bold text-gold-gradient italic">CONSTELLATION</span>
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-rose-blush/90 max-w-xl mx-auto">
          Every star in this celestial formation represents an enduring quality of Akriti Singh. Select
          any star node to reveal its celestial coordinates and lore.
        </p>

        <div className="pt-2 text-xs font-mono text-ivory-warm/40">
          Editable Data File: <span className="text-violet-glow">lib/data/constellation.ts</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ConstellationMap />
      </div>
    </div>
  );
}
