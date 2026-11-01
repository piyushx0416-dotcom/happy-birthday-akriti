"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Compass, Heart, ArrowDown, ChevronRight } from "lucide-react";
import { GlowButton } from "@/components/common/GlowButton";
import { CharacterCanvas } from "@/components/character/CharacterCanvas";
import { AKRITI_DATA } from "@/data/akriti";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-royal/20 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Cinematic Typography & Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col items-start z-10"
        >
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-purple-deep/40 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow" />
            <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] text-gold uppercase">
              CHAPTER ZERO • THE AWAKENING
            </span>
          </div>

          {/* Main Giant Monogram Title */}
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl tracking-tight text-ivory font-normal leading-none mb-3">
            HER.
          </h1>

          <p className="font-script text-3xl sm:text-4xl text-lavender mb-6">
            Akriti Singh
          </p>

          <p className="font-serif text-lg sm:text-xl lg:text-2xl text-ivory/90 leading-relaxed font-light mb-6 border-l-2 border-gold/40 pl-4">
            &ldquo;Not just another person in this universe.
            <br />
            <span className="text-gold font-normal">
              An entire universe of her own.
            </span>
            &rdquo;
          </p>

          <p className="text-sm text-ivory/60 font-sans font-light leading-relaxed max-w-lg mb-8">
            Created in celebration of nineteen extraordinary years. Step through the celestial gates into a world sculpted from memories, fairytales, handwritten letters, and timeless starlight.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <GlowButton href="/her" variant="primary" size="md">
              Discover Her World
            </GlowButton>
            <GlowButton href="/birthday" variant="secondary" size="md">
              19th Birthday
            </GlowButton>
          </div>

          {/* Subtle Key Highlights Pill */}
          <div className="mt-10 pt-6 border-t border-gold/15 w-full grid grid-cols-3 gap-4">
            <div>
              <span className="block text-[10px] tracking-widest text-gold/70 uppercase">
                Date
              </span>
              <span className="font-serif text-base text-ivory">Nov 6, 2026</span>
            </div>
            <div>
              <span className="block text-[10px] tracking-widest text-gold/70 uppercase">
                Milestone
              </span>
              <span className="font-serif text-base text-ivory">19 Years</span>
            </div>
            <div>
              <span className="block text-[10px] tracking-widest text-gold/70 uppercase">
                Sign
              </span>
              <span className="font-serif text-base text-ivory">{AKRITI_DATA.zodiac}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Character Experience (React Three Fiber) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="lg:col-span-7 w-full z-10"
        >
          <CharacterCanvas />
        </motion.div>
      </div>

      {/* Floating Down Indicator */}
      <div className="flex justify-center mt-12">
        <Link
          href="#museum"
          className="flex flex-col items-center gap-2 text-ivory/50 hover:text-gold transition-colors duration-300 group cursor-pointer"
        >
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase">
            EXPLORE THE MUSEUM
          </span>
          <ArrowDown className="w-4 h-4 text-gold/60 group-hover:translate-y-1 group-hover:text-gold transition-all duration-300" />
        </Link>
      </div>
    </section>
  );
}
