"use client";

import React, { useState } from "react";
import { X, Sparkles, Heart } from "lucide-react";

interface TopHeaderProps {
  currentAct: number;
  totalActs: number;
  actTitle: string;
  onSelectAct: (act: number) => void;
}

const actsList = [
  { id: 1, title: "THE MUSE", subtitle: "A Muse in Motion • Hero Showcase" },
  { id: 2, title: "THE CHRONICLES", subtitle: "Royal Decree & Her Essence" },
  { id: 3, title: "CLAW OF DESTINY", subtitle: "Akriti's Interactive Claw Arcade" },
  { id: 4, title: "THE CONFESSION", subtitle: "To The Incomparable • Private Letter" },
  { id: 5, title: "CELESTIAL VAULT", subtitle: "Surprise Box & Candle Ceremony" },
  { id: 6, title: "THE TIMEPIECE", subtitle: "Precision Birthday Countdown" },
];

export default function TopHeader({
  currentAct,
  totalActs,
  actTitle,
  onSelectAct,
}: TopHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between pointer-events-auto">
        {/* Left: Brand Monogram & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#E8C994]/50 bg-[#13101C]/80 flex items-center justify-center shadow-[0_0_15px_rgba(232,201,148,0.15)]">
            <span className="font-serif text-xs font-bold text-[#E8C994] tracking-wider">
              AS
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#F8F1E8]">
              AKRITI SINGH
            </span>
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#E8C994]/80 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>06 NOVEMBER • HAUTE ÉDITION</span>
            </div>
          </div>
        </div>

        {/* Center: Act Indicator Pill */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8C994]/30 bg-[#13101C]/80 backdrop-blur-md shadow-lg">
          <span className="font-mono text-xs text-[#E8C994] font-semibold">
            {String(currentAct).padStart(2, "0")} / {String(totalActs).padStart(2, "0")}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#E8C994]/40" />
          <span className="font-mono text-xs text-[#F8F1E8] tracking-widest uppercase font-medium">
            {actTitle}
          </span>
        </div>

        {/* Right: Audio Visualizer + Hamburger Menu */}
        <div className="flex items-center gap-2.5">
          {/* Audio Visualizer Pill (Plays continuously by default - NO option to turn off) */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8C994]/30 bg-[#13101C]/80 backdrop-blur-md text-[10px] sm:text-xs font-mono tracking-wider text-[#E8C994] shadow-md select-none"
            title="Now Playing: One of the Girls (Continuous Background Audio)"
          >
            {/* Animated Equalizer Waves */}
            <div className="flex items-end gap-[2px] h-3">
              <span className="w-[2px] h-full bg-[#E8C994] animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-[2px] h-2/3 bg-[#FF9FCB] animate-[pulse_1.1s_ease-in-out_infinite]" />
              <span className="w-[2px] h-4/5 bg-[#E8C994] animate-[pulse_0.9s_ease-in-out_infinite]" />
              <span className="w-[2px] h-1/2 bg-[#FF9FCB] animate-[pulse_1.2s_ease-in-out_infinite]" />
            </div>
            <span className="font-medium tracking-widest">ONE OF THE GIRLS</span>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-full border border-[#E8C994]/30 bg-[#13101C]/80 flex flex-col items-center justify-center gap-1 hover:border-[#E8C994] transition-colors"
            aria-label="Open Navigation"
          >
            <span className="w-4 h-[1.5px] bg-[#F8F1E8]" />
            <span className="w-4 h-[1.5px] bg-[#F8F1E8]" />
          </button>
        </div>
      </header>

      {/* Navigation Drawer / Modal */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#07050B]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-[#E8C994]/20 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#E8C994] flex items-center justify-center font-serif text-xs font-bold text-[#E8C994]">
                AS
              </div>
              <span className="font-serif text-base tracking-[0.2em] text-[#F8F1E8]">
                AKRITI SINGH • HAUTE ÉDITION
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full border border-[#E8C994]/40 hover:bg-[#E8C994]/10 text-[#F8F1E8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full my-auto py-8">
            {actsList.map((act) => (
              <button
                key={act.id}
                onClick={() => {
                  onSelectAct(act.id);
                  setMenuOpen(false);
                }}
                className={`p-4 rounded-xl border text-left transition-all flex items-start gap-4 ${
                  currentAct === act.id
                    ? "border-[#E8C994] bg-[#E8C994]/10 shadow-[0_0_20px_rgba(232,201,148,0.2)]"
                    : "border-[#E8C994]/20 bg-[#13101C]/50 hover:border-[#E8C994]/50"
                }`}
              >
                <span className="font-mono text-sm font-bold text-[#E8C994]">
                  0{act.id}
                </span>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#F8F1E8]">
                    {act.title}
                  </h4>
                  <p className="text-xs text-[#F8F1E8]/60 mt-0.5">
                    {act.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center font-mono text-xs tracking-widest text-[#E8C994]/60 border-t border-[#E8C994]/20 pt-4">
            AKRITI SINGH • 19TH BIRTHDAY • NOVEMBER 06, 2026
          </div>
        </div>
      )}
    </>
  );
}
