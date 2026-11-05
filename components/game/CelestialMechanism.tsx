"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, Cog, Sun, Moon, Sparkle, RotateCw } from "lucide-react";
import { gameAudio } from "@/lib/audio/gameAudio";

interface CelestialMechanismProps {
  onComplete: () => void;
  onCollectStardust: (amount: number) => void;
}

export default function CelestialMechanism({
  onComplete,
  onCollectStardust,
}: CelestialMechanismProps) {
  // Target: Sun = 90, Moon = 180, Venus = 270
  const [sunAngle, setSunAngle] = useState(0);
  const [moonAngle, setMoonAngle] = useState(60);
  const [venusAngle, setVenusAngle] = useState(150);
  const [isCompleted, setIsCompleted] = useState(false);

  const sunAligned = (sunAngle % 360 + 360) % 360 === 90;
  const moonAligned = (moonAngle % 360 + 360) % 360 === 180;
  const venusAligned = (venusAngle % 360 + 360) % 360 === 270;

  useEffect(() => {
    if (sunAligned && moonAligned && venusAligned && !isCompleted) {
      setIsCompleted(true);
      gameAudio.playLevelComplete();
      setTimeout(() => {
        onCollectStardust(35);
        onComplete();
      }, 1400);
    }
  }, [sunAligned, moonAligned, venusAligned, isCompleted, onComplete, onCollectStardust]);

  const turnDial = (dial: "sun" | "moon" | "venus") => {
    if (isCompleted) return;
    gameAudio.playRingTurn();
    if (dial === "sun") {
      setSunAngle((prev) => (prev + 30) % 360);
    } else if (dial === "moon") {
      setMoonAngle((prev) => (prev + 30) % 360);
    } else {
      setVenusAngle((prev) => (prev + 30) % 360);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center space-y-2 mb-4">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#E5C388] px-3 py-1 rounded-full bg-[#E5C388]/15 border border-[#E5C388]/30">
          Set the Three Celestial Dials to Ancient Alignment
        </span>
        <p className="text-xs font-mono text-white/50">
          Target: Sun to 90° (East), Moon to 180° (South), Venus to 270° (West).
        </p>
      </div>

      {/* Mechanism Housing */}
      <div className="relative w-full aspect-square max-w-[420px] rounded-3xl bg-[#0F0714] border border-[#E5C388]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-6 flex flex-col justify-between overflow-hidden">
        {/* Background gear engravings */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <Cog className={`w-96 h-96 text-[#F4E2C7] ${isCompleted ? "animate-spin" : ""}`} />
        </div>

        {/* Top Astrolabe Scale */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#F4E2C7]/70 pb-2 border-b border-white/10">
          <span>THE GRAND CHRONOMETER</span>
          <span>CELESTIAL HARMONICS</span>
        </div>

        {/* 3 Interlocking Dials in a Triangle Layout */}
        <div className="relative w-full h-[240px] my-auto flex items-center justify-around">
          {/* DIAL 1: SUN */}
          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => turnDial("sun")}
              className={`relative w-24 h-24 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                sunAligned
                  ? "border-[#E5C388] bg-[#E5C388]/20 shadow-[0_0_25px_#E5C388]"
                  : "border-white/20 bg-white/5 hover:border-white/40"
              }`}
              style={{ transform: `rotate(${sunAngle}deg)` }}
            >
              {/* Pointer Marker */}
              <div className="absolute top-1 w-2.5 h-2.5 rounded-full bg-[#E5C388] shadow-md" />
              <Sun className={`w-7 h-7 ${sunAligned ? "text-[#E5C388]" : "text-white/60"}`} />
            </div>
            <div className="text-center">
              <span className="text-xs font-mono text-white font-medium">SOLAR DIAL</span>
              <p className="text-[10px] font-mono text-[#E5C388]">
                {sunAngle}° {sunAligned && "✓ (Target 90°)"}
              </p>
            </div>
          </div>

          {/* DIAL 2: MOON */}
          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => turnDial("moon")}
              className={`relative w-24 h-24 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                moonAligned
                  ? "border-[#C4A1D9] bg-[#C4A1D9]/20 shadow-[0_0_25px_#C4A1D9]"
                  : "border-white/20 bg-white/5 hover:border-white/40"
              }`}
              style={{ transform: `rotate(${moonAngle}deg)` }}
            >
              {/* Pointer Marker */}
              <div className="absolute top-1 w-2.5 h-2.5 rounded-full bg-[#C4A1D9] shadow-md" />
              <Moon className={`w-7 h-7 ${moonAligned ? "text-[#C4A1D9]" : "text-white/60"}`} />
            </div>
            <div className="text-center">
              <span className="text-xs font-mono text-white font-medium">LUNAR DIAL</span>
              <p className="text-[10px] font-mono text-[#C4A1D9]">
                {moonAngle}° {moonAligned && "✓ (Target 180°)"}
              </p>
            </div>
          </div>

          {/* DIAL 3: VENUS */}
          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => turnDial("venus")}
              className={`relative w-24 h-24 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                venusAligned
                  ? "border-[#FF69B4] bg-[#FF69B4]/20 shadow-[0_0_25px_#FF69B4]"
                  : "border-white/20 bg-white/5 hover:border-white/40"
              }`}
              style={{ transform: `rotate(${venusAngle}deg)` }}
            >
              {/* Pointer Marker */}
              <div className="absolute top-1 w-2.5 h-2.5 rounded-full bg-[#FF69B4] shadow-md" />
              <Sparkle className={`w-7 h-7 ${venusAligned ? "text-[#FF69B4]" : "text-white/60"}`} />
            </div>
            <div className="text-center">
              <span className="text-xs font-mono text-white font-medium">VENUS DIAL</span>
              <p className="text-[10px] font-mono text-[#FF69B4]">
                {venusAngle}° {venusAligned && "✓ (Target 270°)"}
              </p>
            </div>
          </div>
        </div>

        {/* Tap to rotate hints */}
        <div className="pt-2 border-t border-white/10 text-center text-[11px] font-mono text-white/50">
          Tap any dial to rotate by 30°
        </div>

        {/* Level Complete Flash */}
        {isCompleted && (
          <div className="absolute inset-0 bg-[#E5C388]/25 backdrop-blur-[2px] flex flex-col items-center justify-center animate-fade-in pointer-events-none z-30">
            <CheckCircle2 className="w-16 h-16 text-[#F4E2C7] animate-bounce filter drop-shadow-[0_0_20px_#F4E2C7]" />
            <p className="font-serif text-2xl text-white font-medium mt-2">
              Mechanism Engaged!
            </p>
            <p className="text-xs font-mono text-[#FFB6D9] mt-1">
              +150 Stardust • Celestial Keepsake Unlocked
            </p>
          </div>
        )}
      </div>

      {/* Manual Turn Buttons for Mobile */}
      <div className="mt-5 flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => turnDial("sun")}
          disabled={isCompleted}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#E5C388] hover:bg-white/10"
        >
          <RotateCw className="w-3 h-3" />
          <span>Turn Sun</span>
        </button>
        <button
          onClick={() => turnDial("moon")}
          disabled={isCompleted}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#C4A1D9] hover:bg-white/10"
        >
          <RotateCw className="w-3 h-3" />
          <span>Turn Moon</span>
        </button>
        <button
          onClick={() => turnDial("venus")}
          disabled={isCompleted}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#FF69B4] hover:bg-white/10"
        >
          <RotateCw className="w-3 h-3" />
          <span>Turn Venus</span>
        </button>
      </div>
    </div>
  );
}
