"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Compass, Palette, Music, Coffee, CloudSun, Utensils, Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AKRITI_DATA } from "@/data/akriti";
import { PERSONALITY_QUALITIES } from "@/data/qualities";
import { useSound } from "@/hooks/useSound";

export function MuseumOfHer() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const { playClick } = useSound();

  const exhibitions = [
    { id: 1, label: "01. The Masterpiece" },
    { id: 2, label: "02. Personality Gallery" },
    { id: 3, label: "03. The Little Things" },
    { id: 4, label: "04. Beautiful Details" },
    { id: 5, label: "05. Favourite Things" },
    { id: 6, label: "06. The Final Portrait" },
  ];

  return (
    <section id="museum" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Chapter Header */}
      <SectionHeader
        badge="CURATED EXHIBITION"
        title="THE MUSEUM OF HER"
        romanticNote="An art gallery dedicated to an extraordinary soul"
        subtitle="Step into a bespoke exhibition hall celebrating Akriti Singh — her poise, her subtle habits, and the timeless beauty she brings into this world."
      />

      {/* Museum Navigation Bar / Exhibition Selector (Ref 1 inspired) */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 sm:mb-16 gap-2 no-scrollbar">
        {exhibitions.map((ex) => (
          <button
            key={ex.id}
            onClick={() => {
              playClick(920);
              setActiveTab(ex.id);
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-sans tracking-widest transition-all duration-300 border cursor-pointer ${
              activeTab === ex.id
                ? "bg-gold text-midnight border-gold font-medium shadow-[0_0_20px_rgba(214,189,139,0.35)]"
                : "border-gold/20 text-ivory/70 hover:text-gold hover:border-gold/40 bg-purple-deep/30"
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Exhibition Contents */}
      <div className="min-h-[500px]">
        {/* EXHIBITION 01: THE MASTERPIECE */}
        {activeTab === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            <div className="lg:col-span-5 relative">
              <div className="editorial-frame p-3 sm:p-4 rounded-2xl relative group">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/akriti/reference/akriti-reference-01.jpg"
                    alt="The Masterpiece — Akriti Singh"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
                </div>
                <div className="mt-4 px-2 flex justify-between items-center text-[11px] font-sans text-gold/80 tracking-widest uppercase">
                  <span>PLATE NO. 001</span>
                  <span>AKRITI SINGH • 19</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-gold">
                EXHIBITION 01 • INTRODUCTION
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal leading-tight">
                The Masterpiece in Motion
              </h3>
              <p className="font-script text-2xl text-lavender">
                &ldquo;Some works of art are painted on canvas; others simply exist and make the world brighter.&rdquo;
              </p>
              <p className="text-sm sm:text-base text-ivory/80 font-sans leading-relaxed font-light">
                There are individuals whose presence naturally elevates everything around them. Akriti represents that rare balance of effortless elegance, deep empathy, and an infectious warmth that turns ordinary days into lasting poetry.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-gold/15">
                <div className="p-4 rounded-xl glass-card">
                  <span className="block text-[10px] font-sans tracking-widest text-gold uppercase">
                    NATURAL TRAITS
                  </span>
                  <p className="font-serif text-base text-ivory mt-1">
                    Dark Waves & Contemplative Gaze
                  </p>
                </div>
                <div className="p-4 rounded-xl glass-card">
                  <span className="block text-[10px] font-sans tracking-widest text-gold uppercase">
                    SIGNATURE ACCENT
                  </span>
                  <p className="font-serif text-base text-ivory mt-1">
                    Glimmering Nose Stud & Hoops
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* EXHIBITION 02: THE PERSONALITY GALLERY */}
        {activeTab === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-gold">
                EXHIBITION 02 • CORE VIRTUES
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-ivory mt-2">
                The Nine Luminaries
              </h3>
              <p className="text-xs sm:text-sm text-ivory/70 mt-2 font-sans font-light">
                Nine profound facets of her character that leave an indelible mark on those lucky enough to know her.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PERSONALITY_QUALITIES.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    playClick(1020);
                    setSelectedQuality(selectedQuality === q.id ? null : q.id);
                  }}
                  className="editorial-frame p-6 rounded-2xl cursor-pointer group hover:border-gold/60 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-sans tracking-widest text-gold uppercase px-2.5 py-0.5 rounded-full border border-gold/30 bg-purple-deep/40">
                      {q.tag}
                    </span>
                    <Sparkles className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-ivory group-hover:text-gold transition-colors">
                    {q.title}
                  </h4>
                  <p className="font-script text-base text-lavender/90 mt-1 mb-3">
                    {q.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-ivory/75 font-sans font-light leading-relaxed">
                    {q.description}
                  </p>
                  {q.quote && (
                    <div className="mt-4 pt-3 border-t border-gold/15 flex items-start gap-2 text-xs italic text-gold/80 font-serif">
                      <Quote className="w-3.5 h-3.5 shrink-0 text-gold/60" />
                      <span>{q.quote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* EXHIBITION 03: THE LITTLE THINGS */}
        {activeTab === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-gold">
                EXHIBITION 03 • HABITS & EXPRESSIONS
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-ivory mt-2">
                The Quiet Poetry of Her Habits
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AKRITI_DATA.littleThings.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-gold/20 hover:border-gold/50 transition-all duration-300"
                >
                  <span className="text-[10px] font-sans tracking-widest text-gold/70 uppercase">
                    DETAIL NO. 0{idx + 1} • {item.category}
                  </span>
                  <h4 className="font-serif text-xl text-ivory mt-2 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-ivory/75 font-sans font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* EXHIBITION 04: THE BEAUTIFUL DETAILS */}
        {activeTab === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-5 relative">
              <div className="editorial-frame p-3 sm:p-4 rounded-2xl">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/akriti/reference/akriti-reference-02.jpg"
                    alt="Akriti Singh — Natural Elegance"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
                </div>
                <div className="mt-4 px-2 flex justify-between items-center text-[11px] font-sans text-gold/80 tracking-widest uppercase">
                  <span>PLATE NO. 002</span>
                  <span>SUBTLE POETRY</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AKRITI_DATA.beautifulDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="editorial-frame p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] tracking-widest text-gold uppercase font-sans">
                      SIGNATURE DETAIL
                    </span>
                    <h4 className="font-serif text-2xl text-ivory mt-1 mb-2">
                      {detail.title}
                    </h4>
                    <p className="text-sm text-gold-light font-sans font-medium mb-3">
                      {detail.detail}
                    </p>
                  </div>
                  <p className="text-xs text-ivory/70 font-sans italic border-t border-gold/15 pt-3">
                    &ldquo;{detail.poeticNote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* EXHIBITION 05: HER FAVOURITE THINGS */}
        {activeTab === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-gold">
                EXHIBITION 05 • CURATED PREFERENCES
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-ivory mt-2">
                A Cabinet of Favourite Things
              </h3>
              <p className="text-xs sm:text-sm text-ivory/70 mt-2 font-sans font-light">
                The small, delightful things that bring happiness and warmth to her days.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AKRITI_DATA.favoriteThings.map((fav, idx) => (
                <div
                  key={idx}
                  className="editorial-frame p-6 rounded-2xl border border-gold/20 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-sans tracking-widest text-gold uppercase">
                      {fav.category}
                    </span>
                    <h4 className="font-serif text-2xl text-ivory mt-2 mb-2">
                      {fav.value}
                    </h4>
                  </div>
                  {fav.note && (
                    <p className="text-xs text-ivory/70 font-sans font-light mt-3 pt-3 border-t border-gold/15">
                      {fav.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* EXHIBITION 06: THE FINAL PORTRAIT */}
        {activeTab === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto editorial-frame p-8 sm:p-12 rounded-3xl text-center space-y-6"
          >
            <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-gold">
              EXHIBITION 06 • CONCLUDING TRIBUTE
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-ivory font-normal leading-tight">
              The Living Masterpiece
            </h3>
            <p className="font-script text-3xl text-lavender">
              Akriti Singh
            </p>
            <div className="w-16 h-[1px] bg-gold/40 mx-auto" />
            <p className="font-serif text-lg sm:text-xl text-ivory/90 font-light leading-relaxed">
              &ldquo;You don&apos;t just walk through this universe; you sculpt it with your kindness, your laughter, and your unwavering grace. Never forget that you are the central star of this celestial story.&rdquo;
            </p>
            <div className="pt-4">
              <span className="text-xs font-sans tracking-widest text-gold uppercase">
                HONOURED ON HER 19TH BIRTHDAY • NOVEMBER 6, 2026
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
