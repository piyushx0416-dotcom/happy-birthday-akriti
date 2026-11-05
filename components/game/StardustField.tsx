"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Diamond, Flame } from "lucide-react";
import { gameAudio } from "@/lib/audio/gameAudio";

interface StardustFieldProps {
  onComplete: () => void;
  onCollectStardust: (amount: number) => void;
}

interface Fragment {
  id: number;
  label: string;
  x: number; // percentage
  y: number;
  color: string;
  name: string;
}

const FRAGMENTS: Fragment[] = [
  { id: 1, label: "Fragment I", x: 20, y: 25, color: "#FF69B4", name: "Tender Rose Shard" },
  { id: 2, label: "Fragment II", x: 80, y: 28, color: "#C4A1D9", name: "Lavender Dream Shard" },
  { id: 3, label: "Fragment III", x: 26, y: 75, color: "#F4E2C7", name: "Champagne Light Shard" },
  { id: 4, label: "Fragment IV", x: 74, y: 72, color: "#67E8F9", name: "Celestial Cyan Shard" },
];

export default function StardustField({
  onComplete,
  onCollectStardust,
}: StardustFieldProps) {
  const [collected, setCollected] = useState<number[]>([]);
  const [isFused, setIsFused] = useState(false);

  const handleCollectFragment = (frag: Fragment) => {
    if (collected.includes(frag.id) || isFused) return;
    gameAudio.playFragmentCollect();
    setCollected((prev) => [...prev, frag.id]);
    onCollectStardust(10); // mini reward per fragment
  };

  const handleFuse = () => {
    if (collected.length < 4 || isFused) return;
    setIsFused(true);
    gameAudio.playLevelComplete();
    setTimeout(() => {
      onCollectStardust(85);
      onComplete();
    }, 1400);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center space-y-2 mb-4">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#C4A1D9] px-3 py-1 rounded-full bg-[#C4A1D9]/15 border border-[#C4A1D9]/30">
          Locate and Reunite the 4 Scattered Shards
        </span>
        <p className="text-xs font-mono text-white/50">
          Tap the glowing crystals in the nebula, then fuse them at the center.
        </p>
      </div>

      {/* Nebula Starfield Canvas */}
      <div className="relative w-full aspect-square max-w-[400px] rounded-3xl bg-[#09040D] border border-[#C4A1D9]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden">
        {/* Swirling Nebula Clouds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,105,180,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(196,161,217,0.2)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,226,199,0.08)_0%,transparent_70%)]" />

        {/* Ambient static stars */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]" />

        {/* Central Crucible */}
        <div className="relative z-10 flex flex-col items-center">
          <div
            className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
              isFused
                ? "bg-gradient-to-tr from-[#FF1493] via-[#F4E2C7] to-white border-white shadow-[0_0_50px_#FF69B4] scale-110"
                : collected.length === 4
                ? "bg-[#1B0B1E] border-[#F4E2C7] shadow-[0_0_25px_rgba(244,226,199,0.5)] animate-pulse"
                : "bg-white/5 border-white/20 text-white/30"
            }`}
          >
            {isFused ? (
              <span className="text-3xl animate-bounce">💖</span>
            ) : (
              <Diamond
                className={`w-8 h-8 ${
                  collected.length === 4
                    ? "text-[#F4E2C7] animate-spin"
                    : "text-white/40"
                }`}
              />
            )}
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/50 pt-2">
            {isFused
              ? "CRYSTAL HEART FORMED"
              : collected.length === 4
              ? "READY TO FUSE"
              : `CRUCIBLE (${collected.length}/4)`}
          </span>
        </div>

        {/* Floating Fragments */}
        {FRAGMENTS.map((frag) => {
          const isCollected = collected.includes(frag.id);

          return (
            <div
              key={frag.id}
              onClick={() => handleCollectFragment(frag)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-4 group select-none transition-all duration-500"
              style={{
                left: isFused ? "50%" : `${frag.x}%`,
                top: isFused ? "50%" : `${frag.y}%`,
                opacity: isFused ? 0 : isCollected ? 0.4 : 1,
                transform: isFused
                  ? "translate(-50%, -50%) scale(0)"
                  : "translate(-50%, -50%)",
              }}
            >
              {/* Outer glow ring */}
              {!isCollected && (
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-50 pointer-events-none"
                  style={{ backgroundColor: frag.color }}
                />
              )}

              {/* Shard Icon */}
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-lg transition-transform ${
                  isCollected
                    ? "bg-white/10 border-white/20 text-white/30"
                    : "group-hover:scale-125"
                }`}
                style={{
                  backgroundColor: isCollected
                    ? undefined
                    : "rgba(27, 11, 30, 0.9)",
                  borderColor: isCollected ? undefined : frag.color,
                  boxShadow: isCollected ? undefined : `0 0 20px ${frag.color}`,
                }}
              >
                <Sparkles
                  className="w-5 h-5"
                  style={{ color: isCollected ? "rgba(255,255,255,0.3)" : frag.color }}
                />
              </div>

              <span className="absolute top-full left-1/2 -translate-x-1/2 text-[9px] font-mono whitespace-nowrap text-white/60 pt-1">
                {isCollected ? "Found" : frag.name}
              </span>
            </div>
          );
        })}

        {/* Completed Flash */}
        {isFused && (
          <div className="absolute inset-0 bg-[#C4A1D9]/25 backdrop-blur-[2px] flex flex-col items-center justify-center animate-fade-in pointer-events-none z-30">
            <CheckCircle2 className="w-16 h-16 text-[#F4E2C7] animate-bounce filter drop-shadow-[0_0_20px_#F4E2C7]" />
            <p className="font-serif text-2xl text-white font-medium mt-2">
              Stardust Reunited!
            </p>
            <p className="text-xs font-mono text-[#FFB6D9] mt-1">
              +125 Stardust • Mini Love Letter Unlocked
            </p>
          </div>
        )}
      </div>

      {/* Action button */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {collected.length === 4 && !isFused && (
          <button
            onClick={handleFuse}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#FF3D91] via-[#C4A1D9] to-[#F4E2C7] text-black font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(255,61,145,0.7)] hover:scale-105 active:scale-95 animate-pulse"
          >
            <Flame className="w-4 h-4 text-black" />
            <span>Fuse 4 Fragments</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          {FRAGMENTS.map((f) => (
            <div
              key={f.id}
              className={`w-3 h-3 rounded-full border ${
                collected.includes(f.id)
                  ? "bg-[#F4E2C7] border-white shadow-[0_0_8px_#F4E2C7]"
                  : "bg-white/10 border-white/20"
              }`}
            />
          ))}
          <span className="text-xs font-mono text-white/50 ml-2">
            {collected.length} of 4 shards collected
          </span>
        </div>
      </div>
    </div>
  );
}
