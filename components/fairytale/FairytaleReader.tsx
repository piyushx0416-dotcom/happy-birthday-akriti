"use client";

import React, { useState } from "react";
import { FAIRYTALE_CHAPTERS, FairytaleChapter } from "@/lib/data/fairytale";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Star, Compass } from "lucide-react";
import Link from "next/link";

export default function FairytaleReader() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const chapter = FAIRYTALE_CHAPTERS[currentChapterIndex];

  const handleNext = () => {
    if (currentChapterIndex < FAIRYTALE_CHAPTERS.length - 1) {
      setCurrentChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Chapter Progress Nav */}
      <div className="glass-panel rounded-full p-2 border border-gold-metallic/30 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto px-2">
          {FAIRYTALE_CHAPTERS.map((chap, idx) => (
            <button
              key={chap.number}
              onClick={() => setCurrentChapterIndex(idx)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
                idx === currentChapterIndex
                  ? "bg-gold-champagne text-obsidian-950 font-bold shadow-md"
                  : "text-ivory-warm/60 hover:text-ivory-warm hover:bg-midnight-900/60"
              }`}
            >
              <span>{chap.romanNumeral}.</span>
              <span className="hidden md:inline">{chap.title.split(" ")[0]}...</span>
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-gold-champagne/80 px-3 hidden sm:block">
          Chapter {chapter.number} of {FAIRYTALE_CHAPTERS.length}
        </div>
      </div>

      {/* Main Storybook Chapter View */}
      <AnimatePresence mode="wait">
        <motion.article
          key={chapter.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-3xl p-8 sm:p-14 border border-gold-metallic/40 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#140c26]/90 via-[#0e071c]/95 to-[#07040d]/95"
        >
          {/* Decorative Corner Filigree */}
          <div className="absolute top-6 left-6 text-gold-metallic/30 select-none font-serif text-2xl">
            ❧
          </div>
          <div className="absolute top-6 right-6 text-gold-metallic/30 select-none font-serif text-2xl">
            ☙
          </div>

          {/* Chapter Roman & Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-metallic/30 bg-midnight-900/70 text-gold-champagne text-xs font-mono tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
              <span>CHAPTER {chapter.romanNumeral}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-champagne tracking-tight">
              {chapter.title}
            </h2>

            <p className="font-serif italic text-sm sm:text-base text-rose-blush/90">
              {chapter.subtitle}
            </p>
          </div>

          {/* Key Quote Callout */}
          <div className="my-8 p-6 rounded-2xl bg-midnight-900/60 border-l-4 border-gold-metallic max-w-2xl mx-auto">
            <p className="font-serif text-lg sm:text-xl text-gold-champagne text-center italic leading-relaxed">
              {chapter.keyQuote}
            </p>
          </div>

          {/* Story Narrative Paragraphs */}
          <div className="max-w-2xl mx-auto space-y-6 text-base sm:text-lg text-ivory-warm/85 font-serif leading-relaxed">
            {chapter.paragraphs.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-gold-champagne first-letter:leading-none"
                    : ""
                }
              >
                {para}
              </p>
            ))}
          </div>

          {/* Interactive Clue & Final Chapter Route to Birthday */}
          <div className="mt-12 pt-8 border-t border-gold-metallic/20 text-center">
            {chapter.number === 5 ? (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-violet-glow">
                  THE FAIRYTALE REACHES ITS DESTINY
                </p>
                <Link
                  href="/birthday"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-champagne via-gold-metallic to-amber-600 text-obsidian-950 font-bold uppercase tracking-wider text-xs sm:text-sm shadow-xl hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enter The Birthday Room</span>
                </Link>
              </div>
            ) : (
              <p className="text-xs uppercase tracking-[0.2em] text-ivory-warm/50 flex items-center justify-center gap-2">
                <Star className="w-3.5 h-3.5 text-gold-metallic" />
                <span>{chapter.interactiveClue}</span>
              </p>
            )}
          </div>
        </motion.article>
      </AnimatePresence>

      {/* Prev / Next Pagination Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentChapterIndex === 0}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold-metallic/30 glass-panel text-xs uppercase tracking-wider text-ivory-warm hover:border-gold-champagne disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Chapter</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentChapterIndex === FAIRYTALE_CHAPTERS.length - 1}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold-metallic/30 glass-panel text-xs uppercase tracking-wider text-ivory-warm hover:border-gold-champagne disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <span>Next Chapter</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
