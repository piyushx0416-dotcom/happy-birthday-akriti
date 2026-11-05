"use client";

import React from "react";

interface BottomDockProps {
  currentAct: number;
  totalActs: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectAct: (act: number) => void;
}

export default function BottomDock({
  currentAct,
  totalActs,
  onPrev,
  onNext,
  onSelectAct,
}: BottomDockProps) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-3 sm:px-4 py-2 rounded-full border border-[#E8C994]/30 bg-[#13101C]/85 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center gap-1.5 sm:gap-2.5 max-w-[95vw]">
      {/* PREV Button */}
      <button
        onClick={onPrev}
        className="px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-widest text-[#F8F1E8]/70 hover:text-[#E8C994] hover:bg-[#E8C994]/10 transition-colors uppercase"
      >
        ← PREV
      </button>

      <div className="w-[1px] h-3.5 bg-[#E8C994]/20" />

      {/* Act Numbers (01 - 06) */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {Array.from({ length: totalActs }, (_, idx) => {
          const actNum = idx + 1;
          const isActive = actNum === currentAct;
          return (
            <button
              key={actNum}
              onClick={() => onSelectAct(actNum)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[11px] sm:text-xs font-mono font-semibold transition-all flex items-center justify-center ${
                isActive
                  ? "bg-[#E8C994] text-[#07050B] shadow-[0_0_15px_rgba(232,201,148,0.7)] scale-105"
                  : "text-[#F8F1E8]/60 hover:text-[#E8C994] hover:bg-[#E8C994]/15"
              }`}
            >
              {String(actNum).padStart(2, "0")}
            </button>
          );
        })}
      </div>

      <div className="w-[1px] h-3.5 bg-[#E8C994]/20" />

      {/* NEXT Button */}
      <button
        onClick={onNext}
        className="px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-widest text-[#F8F1E8]/70 hover:text-[#E8C994] hover:bg-[#E8C994]/10 transition-colors uppercase"
      >
        NEXT →
      </button>
    </nav>
  );
}
