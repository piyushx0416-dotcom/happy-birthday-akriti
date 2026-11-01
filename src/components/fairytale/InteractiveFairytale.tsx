"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, BookOpen, Crown, Star, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FAIRYTALE_CHAPTERS } from "@/data/fairytale";
import { useSound } from "@/hooks/useSound";

export function InteractiveFairytale() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const { playClick } = useSound();

  const chapter = FAIRYTALE_CHAPTERS[currentChapterIndex];

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      playClick(880);
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentChapterIndex < FAIRYTALE_CHAPTERS.length - 1) {
      playClick(920);
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  return (
    <section id="fairytale" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Chapter Header */}
      <SectionHeader
        badge="INTERACTIVE STORYBOOK"
        title="THE CELESTIAL FAIRYTALE"
        romanticNote="A legendary chronicle where Akriti is the protagonist"
        subtitle="Step between the pages of an enchanted mythos where stars whisper her name and everyday moments carry ancient magic."
      />

      {/* Chapter Progress Bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          {FAIRYTALE_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                playClick(960);
                setCurrentChapterIndex(idx);
              }}
              className={`flex-1 flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                idx === currentChapterIndex
                  ? "text-gold font-medium"
                  : "text-ivory/50 hover:text-ivory/80"
              }`}
            >
              <span className="text-[10px] font-sans tracking-widest uppercase hidden sm:block">
                {ch.numberString}
              </span>
              <div
                className={`w-full h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentChapterIndex
                    ? "bg-gradient-to-r from-gold to-gold-light shadow-[0_0_12px_rgba(214,189,139,0.8)]"
                    : idx < currentChapterIndex
                    ? "bg-gold/40"
                    : "bg-white/10"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Fairytale Parchment / Book Viewer */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="editorial-frame p-8 sm:p-12 md:p-16 rounded-3xl relative overflow-hidden shadow-2xl border border-gold/30"
          >
            {/* Background Atmosphere Glow */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-30"
              style={{ backgroundColor: chapter.accentColor }}
            />

            {/* Chapter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gold/20 gap-4 mb-8">
              <div>
                <span className="text-xs font-sans tracking-[0.25em] text-gold uppercase">
                  {chapter.numberString}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-ivory mt-1">
                  {chapter.title}
                </h3>
                <p className="font-script text-2xl text-lavender mt-1">
                  {chapter.subtitle}
                </p>
              </div>

              {/* Magical Artifact Badge */}
              <div className="sm:text-right shrink-0">
                <span className="block text-[9px] font-sans tracking-widest text-gold/60 uppercase">
                  MAGICAL ARTIFACT
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-serif text-ivory/90 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  {chapter.magicalArtifact}
                </span>
              </div>
            </div>

            {/* Narrative Prose */}
            <div className="space-y-6 text-sm sm:text-base md:text-lg text-ivory/85 font-serif font-light leading-relaxed">
              {chapter.prose.map((paragraph, pIdx) => (
                <p key={pIdx} className="first-letter:text-3xl first-letter:font-normal first-letter:text-gold first-letter:float-left first-letter:mr-2">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Chapter Quote */}
            <div className="mt-10 p-6 rounded-2xl bg-purple-deep/50 border border-gold/20 text-center">
              <p className="font-serif italic text-base sm:text-lg text-gold-light">
                &ldquo;{chapter.quote}&rdquo;
              </p>
            </div>

            {/* Chapter Footer Navigation */}
            <div className="mt-10 pt-6 border-t border-gold/20 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentChapterIndex === 0}
                className={`flex items-center gap-2 text-xs font-sans tracking-widest uppercase transition-colors cursor-pointer ${
                  currentChapterIndex === 0
                    ? "opacity-30 cursor-not-allowed text-ivory"
                    : "text-ivory hover:text-gold"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS CHAPTER</span>
              </button>

              {currentChapterIndex < FAIRYTALE_CHAPTERS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-gold hover:text-white transition-colors cursor-pointer"
                >
                  <span>NEXT CHAPTER</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/birthday"
                  className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-gold hover:text-white transition-colors cursor-pointer font-medium"
                >
                  <span>ENTER BIRTHDAY ROOM</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
