"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData, HerQuality } from "@/lib/data/experienceData";
import { soundEngine } from "@/lib/audio/soundtrack";
import { Sparkles, ArrowRight, Heart, Star, Compass } from "lucide-react";

interface HerQualitiesProps {
  onContinue: () => void;
}

export default function HerQualities({ onContinue }: HerQualitiesProps) {
  const { qualities, photographs } = experienceData;
  const [activeId, setActiveId] = useState<string>(qualities[0].id);

  const activeQuality = qualities.find((q) => q.id === activeId) || qualities[0];
  const activePhoto = photographs[activeQuality.photoIndex] || photographs[0];

  const handleSelectQuality = (quality: HerQuality) => {
    setActiveId(quality.id);
    soundEngine.playCardFlip();
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-universe-black flex flex-col justify-between px-6 sm:px-12 py-8 select-none">
      {/* Background Atmosphere that subtly adapts to the active quality */}
      <div className="absolute inset-0 z-0 bg-universe-black pointer-events-none transition-colors duration-1000">
        <motion.div
          key={activeQuality.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{
            background: `radial-gradient(circle, ${activeQuality.accentColor}25 0%, transparent 70%)`,
          }}
        />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-accent-lavender/5 rounded-full blur-[140px]" />
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-accent-rose text-sm">Chapter 06</span>
          <span className="text-accent-pink">✦</span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent-ivory/60">
            HER QUALITIES
          </span>
        </div>

        <button
          onClick={() => {
            soundEngine.playChime(880);
            onContinue();
          }}
          className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-accent-rose hover:text-white transition-colors"
        >
          <span>The Finale</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Main Luxury Editorial Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Oversized Editorial Typography Navigation */}
          <div className="lg:col-span-6 space-y-1 sm:space-y-2">
            <div className="font-mono text-xs tracking-[0.35em] uppercase text-accent-rose/70 mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent-pink" />
              <span>THE EIGHT PILLARS OF HER GRACE</span>
            </div>

            {qualities.map((item) => {
              const isActive = item.id === activeId;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectQuality(item)}
                  className="group cursor-pointer py-1.5 flex items-baseline gap-4 transition-all duration-300"
                >
                  <span
                    className={`font-mono text-xs sm:text-sm tracking-widest transition-colors ${
                      isActive ? "text-accent-pink font-bold" : "text-accent-ivory/30 group-hover:text-accent-rose"
                    }`}
                  >
                    {item.number}
                  </span>

                  <h3
                    className={`font-serif text-2xl sm:text-4xl md:text-5xl font-light tracking-tight transition-all duration-300 ${
                      isActive
                        ? "text-accent-ivory font-semibold translate-x-2 glow-pink"
                        : "text-accent-ivory/40 group-hover:text-accent-ivory/80 group-hover:translate-x-1"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right Column: Editorial Dossier & Framed Photograph */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuality.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative ivory-card rounded-2xl p-6 sm:p-10 border border-accent-gold/40 shadow-2xl flex flex-col justify-between text-universe-charcoal overflow-hidden"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-accent-gold/30 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-accent-pink">
                      {activeQuality.number} // 08
                    </span>
                    <span className="text-universe-charcoal/30">|</span>
                    <span className="font-serif italic text-xs text-universe-charcoal/70">
                      {activeQuality.subtitle}
                    </span>
                  </div>
                  <Heart className="w-4 h-4 text-accent-pink fill-accent-pink" />
                </div>

                {/* Dossier Body with Quote & Description */}
                <div className="space-y-4">
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-universe-charcoal tracking-tight">
                    {activeQuality.title}
                  </h4>

                  <p className="font-serif text-lg sm:text-xl italic text-accent-pink leading-snug">
                    {activeQuality.quote}
                  </p>

                  <p className="font-serif text-sm sm:text-base leading-relaxed text-universe-charcoal/85 pt-1">
                    {activeQuality.description}
                  </p>
                </div>

                {/* Paired Framed Photograph of Akriti */}
                <div className="mt-6 pt-4 border-t border-accent-gold/20 flex items-center gap-4">
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-accent-gold/40 shrink-0 shadow-md">
                    <Image
                      src={activePhoto.src}
                      alt={activePhoto.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="font-serif font-bold text-universe-charcoal">
                      Archival Portrait: {activePhoto.title}
                    </div>
                    <div className="font-serif italic text-universe-charcoal/60">
                      “{activePhoto.caption}”
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note & Grand Finale CTA */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono tracking-widest text-accent-rose/40 border-t border-accent-pink/15 pt-4 gap-2">
        <div>HER QUALITIES // ACT VI</div>
        <button
          onClick={() => {
            soundEngine.playChime(880);
            onContinue();
          }}
          className="text-accent-pink hover:text-white uppercase tracking-[0.25em] flex items-center gap-2 font-mono"
        >
          <span>Continue to The Grand Finale</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
