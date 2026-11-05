"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, CheckCircle2, RotateCw, RotateCcw } from "lucide-react";
import { gameAudio } from "@/lib/audio/gameAudio";

interface OrbitalPuzzleProps {
  onComplete: () => void;
  onCollectStardust: (amount: number) => void;
}

export default function OrbitalPuzzle({
  onComplete,
  onCollectStardust,
}: OrbitalPuzzleProps) {
  // Angles in degrees (0 = aligned at top)
  const [outerAngle, setOuterAngle] = useState(120);
  const [middleAngle, setMiddleAngle] = useState(240);
  const [innerAngle, setInnerAngle] = useState(90);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeRing, setActiveRing] = useState<"outer" | "middle" | "inner">("outer");

  // Check if angle is within snap threshold (±15 degrees of 0 or 360)
  const isAligned = (angle: number) => {
    const norm = (angle % 360 + 360) % 360;
    return norm <= 15 || norm >= 345;
  };

  const outerAligned = isAligned(outerAngle);
  const middleAligned = isAligned(middleAngle);
  const innerAligned = isAligned(innerAngle);

  useEffect(() => {
    if (outerAligned && middleAligned && innerAligned && !isCompleted) {
      setIsCompleted(true);
      gameAudio.playLevelComplete();
      setTimeout(() => {
        onCollectStardust(30);
        onComplete();
      }, 1300);
    }
  }, [outerAligned, middleAligned, innerAligned, isCompleted, onComplete, onCollectStardust]);

  const rotateRing = (ring: "outer" | "middle" | "inner", delta: number) => {
    if (isCompleted) return;
    gameAudio.playRingTurn();
    if (ring === "outer") {
      setOuterAngle((prev) => (prev + delta) % 360);
    } else if (ring === "middle") {
      setMiddleAngle((prev) => (prev + delta) % 360);
    } else {
      setInnerAngle((prev) => (prev + delta) % 360);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center space-y-2 mb-4">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#F4E2C7] px-3 py-1 rounded-full bg-[#E5C388]/15 border border-[#E5C388]/30">
          Align All 3 Rings to the Top Meridian
        </span>
        <p className="text-xs font-mono text-white/50">
          Rotate each celestial ring until its glowing glyph locks with the top star arrow.
        </p>
      </div>

      {/* Astrolabe Canvas */}
      <div className="relative w-full aspect-square max-w-[390px] rounded-3xl bg-[#0D0512]/95 border border-[#F4E2C7]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden">
        {/* Top Alignment Meridian Arrow */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-[#F4E2C7] filter drop-shadow-[0_0_8px_#F4E2C7]" />
          <span className="text-[9px] font-mono tracking-widest text-[#F4E2C7]/70 pt-0.5">
            MERIDIAN
          </span>
        </div>

        {/* Ambient background rays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,226,199,0.06)_0%,transparent_70%)]" />

        {/* OUTER RING */}
        <div
          onClick={() => setActiveRing("outer")}
          className={`absolute rounded-full border cursor-pointer transition-all duration-300 flex items-center justify-center ${
            activeRing === "outer" ? "ring-2 ring-[#FF69B4]/40" : ""
          }`}
          style={{
            width: "300px",
            height: "300px",
            borderColor: outerAligned
              ? "#E5C388"
              : "rgba(244, 226, 199, 0.25)",
            boxShadow: outerAligned
              ? "0 0 25px rgba(229, 195, 136, 0.4)"
              : "none",
            transform: `rotate(${outerAngle}deg)`,
          }}
        >
          {/* Outer glyph (at top of ring) */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                outerAligned
                  ? "bg-[#E5C388] text-black border-white shadow-[0_0_15px_#E5C388]"
                  : "bg-[#1B0B1E] text-[#F4E2C7] border-[#F4E2C7]/50"
              }`}
            >
              ♈
            </div>
          </div>
        </div>

        {/* MIDDLE RING */}
        <div
          onClick={() => setActiveRing("middle")}
          className={`absolute rounded-full border cursor-pointer transition-all duration-300 flex items-center justify-center ${
            activeRing === "middle" ? "ring-2 ring-[#FF69B4]/40" : ""
          }`}
          style={{
            width: "215px",
            height: "215px",
            borderColor: middleAligned
              ? "#FFB6D9"
              : "rgba(255, 182, 217, 0.25)",
            boxShadow: middleAligned
              ? "0 0 25px rgba(255, 182, 217, 0.4)"
              : "none",
            transform: `rotate(${middleAngle}deg)`,
          }}
        >
          {/* Middle glyph (at top of ring) */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                middleAligned
                  ? "bg-[#FF3D91] text-white border-white shadow-[0_0_15px_#FF3D91]"
                  : "bg-[#1B0B1E] text-[#FFB6D9] border-[#FFB6D9]/50"
              }`}
            >
              ♏
            </div>
          </div>
        </div>

        {/* INNER RING */}
        <div
          onClick={() => setActiveRing("inner")}
          className={`absolute rounded-full border cursor-pointer transition-all duration-300 flex items-center justify-center ${
            activeRing === "inner" ? "ring-2 ring-[#FF69B4]/40" : ""
          }`}
          style={{
            width: "135px",
            height: "135px",
            borderColor: innerAligned
              ? "#C4A1D9"
              : "rgba(196, 161, 217, 0.25)",
            boxShadow: innerAligned
              ? "0 0 25px rgba(196, 161, 217, 0.4)"
              : "none",
            transform: `rotate(${innerAngle}deg)`,
          }}
        >
          {/* Inner glyph (at top of ring) */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                innerAligned
                  ? "bg-[#C4A1D9] text-black border-white shadow-[0_0_15px_#C4A1D9]"
                  : "bg-[#1B0B1E] text-[#C4A1D9] border-[#C4A1D9]/50"
              }`}
            >
              ✦
            </div>
          </div>
        </div>

        {/* Central Core Star */}
        <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF1493] via-[#F4E2C7] to-white flex items-center justify-center shadow-[0_0_30px_#FF69B4]">
          <Sparkles className="w-5 h-5 text-black" />
        </div>

        {/* Completed Flash */}
        {isCompleted && (
          <div className="absolute inset-0 bg-[#E5C388]/20 backdrop-blur-[2px] flex flex-col items-center justify-center animate-fade-in pointer-events-none z-30">
            <CheckCircle2 className="w-16 h-16 text-[#F4E2C7] animate-bounce filter drop-shadow-[0_0_20px_#F4E2C7]" />
            <p className="font-serif text-2xl text-white font-medium mt-2">
              Harmony Restored!
            </p>
            <p className="text-xs font-mono text-[#FFB6D9] mt-1">
              +100 Stardust • Cipher Unlocked
            </p>
          </div>
        )}
      </div>

      {/* Ring Selector & Rotation Controls */}
      <div className="w-full mt-6 space-y-4">
        {/* Ring selection tabs */}
        <div className="flex items-center justify-center gap-2">
          {(["outer", "middle", "inner"] as const).map((ring) => {
            const aligned =
              ring === "outer"
                ? outerAligned
                : ring === "middle"
                ? middleAligned
                : innerAligned;
            return (
              <button
                key={ring}
                onClick={() => setActiveRing(ring)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all border ${
                  activeRing === ring
                    ? "bg-white/20 border-white text-white shadow-md"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                }`}
              >
                <span>{ring.toUpperCase()} RING</span>
                {aligned && <span className="ml-1 text-emerald-400">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Rotate buttons for active ring */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => rotateRing(activeRing, -30)}
            disabled={isCompleted}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs font-mono tracking-wider transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Rotate -30°</span>
          </button>

          <button
            onClick={() => rotateRing(activeRing, 30)}
            disabled={isCompleted}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs font-mono tracking-wider transition-all active:scale-95"
          >
            <span>Rotate +30°</span>
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
