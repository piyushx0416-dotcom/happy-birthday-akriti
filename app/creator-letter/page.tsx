"use client";

import React from "react";
import StarfieldBackground from "@/components/3d/StarfieldBackground";
import { CREATOR_LETTER } from "@/lib/data/creatorLetter";
import { Feather, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

export default function CreatorLetterPage() {
  return (
    <div className="relative min-h-screen w-full bg-obsidian-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <StarfieldBackground particleCount={130} speed={0.3} />

      {/* Header Dossier */}
      <div className="max-w-7xl mx-auto mb-10 text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-metallic/30 glass-panel text-gold-champagne text-xs font-mono tracking-[0.25em] uppercase">
          <Feather className="w-3.5 h-3.5 text-gold-metallic" />
          <span>AUTOGRAPH DEDICATION • PERSONAL MEMORANDUM</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-warm tracking-tight">
          A LETTER FROM <span className="font-bold text-gold-gradient italic">THE CREATOR</span>
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-rose-blush/90 max-w-xl mx-auto">
          The honest motivation, thoughts, and heartfelt reasons behind the creation of this universe.
        </p>

        <div className="pt-2 text-xs font-mono text-ivory-warm/40">
          Editable Data File: <span className="text-violet-glow">lib/data/creatorLetter.ts</span>
        </div>
      </div>

      {/* Luxury Parchment / Editorial Letter Frame */}
      <div className="max-w-3xl mx-auto relative z-10">
        <article className="glass-panel rounded-3xl p-8 sm:p-14 border border-gold-metallic/40 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#18102d]/95 via-[#100921]/95 to-[#07040f]/95 text-ivory-warm space-y-8">
          {/* Header Seal & Meta */}
          <div className="border-b border-gold-metallic/20 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-[0.3em] text-violet-glow">
                FOR: {CREATOR_LETTER.recipient}
              </div>
              <div className="font-serif text-2xl font-bold text-gold-champagne mt-0.5">
                On Her {CREATOR_LETTER.occasion}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono text-gold-metallic">{CREATOR_LETTER.date}</div>
              <div className="text-[10px] text-ivory-warm/50 font-mono tracking-wider">
                COORDINATES: UNIVERSE 01
              </div>
            </div>
          </div>

          {/* Lead Quote Callout */}
          <div className="p-5 rounded-2xl bg-midnight-900/60 border-l-4 border-gold-metallic text-base sm:text-lg font-serif italic text-gold-champagne leading-relaxed text-center">
            {CREATOR_LETTER.leadQuote}
          </div>

          {/* Letter Paragraphs */}
          <div className="space-y-6 text-base sm:text-lg text-ivory-warm/85 font-serif leading-relaxed">
            {CREATOR_LETTER.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Postscript & Signature */}
          <div className="pt-8 border-t border-gold-metallic/20 space-y-4">
            <div className="font-serif italic text-gold-champagne text-lg">
              {CREATOR_LETTER.authorSignature}
            </div>

            <p className="text-xs sm:text-sm text-rose-blush italic font-serif">
              {CREATOR_LETTER.postscript}
            </p>
          </div>

          {/* Footer Call to Action */}
          <div className="pt-6 border-t border-gold-metallic/15 flex items-center justify-between">
            <span className="text-[11px] font-mono text-ivory-warm/40 uppercase tracking-widest">
              Her Universe • Akriti Singh
            </span>
            <Link
              href="/birthday"
              className="text-xs uppercase tracking-wider text-gold-champagne font-mono hover:underline flex items-center gap-1.5"
            >
              <span>Go to Birthday Room</span>
              <span>→</span>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
