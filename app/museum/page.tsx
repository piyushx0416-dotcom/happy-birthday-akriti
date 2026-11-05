"use client";

import React from "react";
import MuseumGallery from "@/components/museum/MuseumGallery";
import StarfieldBackground from "@/components/3d/StarfieldBackground";
import { Camera, Sparkles, FolderArchive, Info } from "lucide-react";

export default function MuseumPage() {
  return (
    <div className="relative min-h-screen w-full bg-obsidian-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <StarfieldBackground particleCount={110} speed={0.25} />

      {/* Header Dossier */}
      <div className="max-w-7xl mx-auto mb-10 text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-metallic/30 glass-panel text-gold-champagne text-xs font-mono tracking-[0.25em] uppercase">
          <Camera className="w-3.5 h-3.5 text-gold-metallic" />
          <span>CURATED LUXURY RETROSPECTIVE • 5 EXHIBITIONS</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-warm tracking-tight">
          THE MUSEUM OF <span className="font-bold text-gold-gradient italic">HER</span>
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-rose-blush/90 max-w-2xl mx-auto">
          An archival photography exhibition celebrating the milestones, expressions, subtle details,
          and unforgettable memories of Akriti Singh.
        </p>

        {/* Curation Info Pill */}
        <div className="pt-2 flex items-center justify-center gap-4 text-xs font-mono text-ivory-warm/50">
          <span className="flex items-center gap-1.5">
            <FolderArchive className="w-3.5 h-3.5 text-gold-metallic" />
            Archive Directory: public/assets/akriti/
          </span>
        </div>
      </div>

      {/* Museum Gallery Component */}
      <div className="max-w-7xl mx-auto relative z-10">
        <MuseumGallery />
      </div>
    </div>
  );
}
