"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

interface Act01TheMuseProps {
  onNext: () => void;
}

export default function Act01TheMuse({ onNext }: Act01TheMuseProps) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-14 py-20 lg:py-24 overflow-hidden bg-[#07050B] select-none">
      {/* Background Subtle Nebula & Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E8C994]/5 rounded-full blur-[160px]" />
        {/* Scattered Starlight */}
        <div className="absolute top-1/5 left-1/12 w-1 h-1 rounded-full bg-white opacity-40 animate-pulse" />
        <div className="absolute top-2/3 left-1/6 w-1 h-1 rounded-full bg-[#E8C994] opacity-50" />
        <div className="absolute top-1/4 right-1/10 w-1.5 h-1.5 rounded-full bg-[#FF9FCB] opacity-40 animate-ping" />
        <div className="absolute bottom-1/3 right-1/8 w-1 h-1 rounded-full bg-white opacity-30" />
      </div>

      {/* Main Grid: Left Typography & Right Editorial Portrait */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Editorial Headlines */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8C994]/40 bg-[#13101C]/60 text-[#E8C994] text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase shadow-sm">
            <span>✦ NOVEMBER 06 // HAUTE ÉDITION</span>
          </div>

          {/* Subheading */}
          <div className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-[#F8F1E8]/70">
            THE UNMISTAKABLE
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="font-editorial-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#F8F1E8] leading-[1.05]">
              Akriti Singh.
            </h1>
            <div className="font-editorial-script italic text-4xl sm:text-6xl md:text-7xl text-[#E8C994] tracking-wide leading-tight">
              A Muse in Motion.
            </div>
          </div>

          {/* Paragraph */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#F8F1E8]/75 leading-relaxed max-w-xl font-light pt-2">
            No fictional illustrations or artificial facades needed. In a world full of
            imitations, she commands every gaze effortlessly with just the depth in her eyes,
            that signature nose pin, and a spirit that redefines elegance.
          </p>

          {/* CTA Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onNext}
              className="group relative px-8 py-3.5 rounded-full bg-[#E8C994] text-[#07050B] font-mono font-semibold text-xs tracking-[0.25em] uppercase shadow-[0_0_25px_rgba(232,201,148,0.4)] hover:shadow-[0_0_40px_rgba(232,201,148,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5"
            >
              <span>EXPLORE HER ESSENCE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="font-mono text-[10px] tracking-widest text-[#F8F1E8]/40 uppercase">
              PRESS [ → ] OR USE DOCK
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Photograph Card with Floating Polaroid */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Main Large Portrait Card */}
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl border border-[#E8C994]/40 bg-[#13101C]/80 p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            {/* Top Card Meta */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#E8C994]/80 uppercase px-2 py-1">
              <span>MUSE VOL. 2026</span>
              <span>GRACE & INTENSITY</span>
            </div>

            {/* Photo Container */}
            <div className="relative w-full h-[84%] rounded-2xl overflow-hidden bg-[#07050B] border border-[#E8C994]/20">
              <Image
                src="/assets/akriti/photo-02.jpg"
                alt="Akriti Singh"
                fill
                priority
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Bottom Card Meta */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#F8F1E8]/50 uppercase px-2 py-1">
              <span>28° 38&apos; N • 77° 13&apos; E</span>
              <span>AUTHENTIC • UNFILTERED</span>
            </div>
          </div>

          {/* Floating Polaroid Keepsake (Overlapping bottom-left) */}
          <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 w-44 sm:w-52 rounded-2xl border border-[#E8C994]/40 bg-[#13101C]/95 p-3 shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-300">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#07050B] border border-[#E8C994]/20 mb-2">
              <Image
                src="/assets/akriti/photo-01.jpg"
                alt="Akriti Smile"
                fill
                className="object-cover object-top"
              />
            </div>
            <p className="font-editorial-script italic text-xs text-[#E8C994] text-center pt-1">
              “That effortless thoughtful smile.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
