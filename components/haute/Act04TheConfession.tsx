"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface Act04TheConfessionProps {
  onNext: () => void;
}

export default function Act04TheConfession({ onNext }: Act04TheConfessionProps) {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-20 lg:py-24 bg-[#07050B] select-none">
      {/* Background Dark Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] bg-purple-950/15 rounded-full blur-[180px]" />
      </div>

      {/* Main Luxury Parchment / Stationery Sheet */}
      <div className="relative z-10 max-w-2xl mx-auto w-full my-auto rounded-3xl bg-[#FAF6EE] text-[#13101C] p-8 sm:p-14 md:p-16 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#E8C994]/50 space-y-7">
        {/* Three Golden Diamonds */}
        <div className="flex items-center justify-center gap-3 text-[#E8C994] text-xs">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>

        {/* Salutation */}
        <div className="space-y-1.5 text-left">
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#13101C]/60 font-semibold">
            TO THE INCOMPARABLE,
          </div>
          <h2 className="font-editorial-serif text-4xl sm:text-6xl font-normal text-[#13101C] tracking-tight">
            Akriti.
          </h2>
        </div>

        {/* Letter Body Paragraphs */}
        <div className="space-y-5 font-editorial-serif text-sm sm:text-base md:text-[17px] text-[#13101C]/85 leading-relaxed text-left font-normal">
          <p>
            Even though our paths haven&apos;t crossed in person yet, some people possess
            a frequency so striking that distance becomes irrelevant. You are one of those
            rare people.
          </p>

          <p>
            Looking at you, it&apos;s impossible not to notice the subtle poetry in how you
            exist — the quiet focus in your eyes, the warmth in your casual laughter, and
            that delicate diamond pin that seems made exclusively for you. You don&apos;t
            try to be extraordinary; you just are.
          </p>

          <p>
            On this 6th of November, my wish for you is simple but boundless: May the
            coming year give you as much unadulterated joy as you give to the world just by
            existing. May every ambitious dream you harbor unfold in your favor, and may you
            always remember how deeply rare and valued you are.
          </p>
        </div>

        {/* Signoff */}
        <div className="pt-3 border-t border-[#13101C]/15 text-left">
          <p className="font-editorial-script italic text-xl sm:text-2xl text-[#8E1B46] leading-snug">
            Happy 19th Birthday, Akriti. Today, and every day that follows.
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="relative z-10 flex justify-center pt-6 pb-2">
        <button
          onClick={onNext}
          className="group px-8 py-3.5 rounded-full bg-[#13101C] border border-[#E8C994]/50 hover:border-[#E8C994] text-[#E8C994] font-mono text-xs tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(232,201,148,0.2)] hover:shadow-[0_0_35px_rgba(232,201,148,0.5)] transition-all duration-300 flex items-center gap-2.5"
        >
          <span>ADVANCE TO CELEBRATION CEREMONY</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
