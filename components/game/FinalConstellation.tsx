"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Crown, Heart, ChevronRight } from "lucide-react";
import { gameAudio } from "@/lib/audio/gameAudio";

interface FinalConstellationProps {
  onComplete: () => void;
  onCollectStardust: (amount: number) => void;
  onEnterUniverse?: () => void;
}

interface CrownStar {
  id: number;
  label: string;
  x: number;
  y: number;
}

const CROWN_STARS: CrownStar[] = [
  { id: 1, label: "Crown Left", x: 22, y: 28 },
  { id: 2, label: "Crown Peak (19)", x: 50, y: 15 },
  { id: 3, label: "Crown Right", x: 78, y: 28 },
  { id: 4, label: "Crown Center", x: 50, y: 40 },
];

export default function FinalConstellation({
  onComplete,
  onCollectStardust,
  onEnterUniverse,
}: FinalConstellationProps) {
  const [connectedStars, setConnectedStars] = useState<number[]>([1]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleConnectStar = (starId: number) => {
    if (isCompleted) return;
    const last = connectedStars[connectedStars.length - 1];
    if (starId === last + 1) {
      gameAudio.playStarChime(500 + starId * 150);
      const next = [...connectedStars, starId];
      setConnectedStars(next);

      if (next.length === CROWN_STARS.length) {
        setIsCompleted(true);
        gameAudio.playLevelComplete();
        setTimeout(() => {
          onCollectStardust(50);
          onComplete();
        }, 1500);
      }
    } else {
      gameAudio.playStarChime(260);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center space-y-2 mb-4">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#FF69B4] px-3.5 py-1 rounded-full bg-[#FF3D91]/20 border border-[#FF3D91]/40 shadow-[0_0_15px_rgba(255,61,145,0.4)]">
          The Grand Finale • Crown of the 19th Year
        </span>
        <p className="text-xs font-mono text-white/50">
          Connect the crown stars (1 ➔ 2 ➔ 3 ➔ 4) to awaken the entire observatory.
        </p>
      </div>

      {/* Grand Celestial Observatory Canvas */}
      <div
        className={`relative w-full aspect-square max-w-[420px] rounded-3xl border transition-all duration-1000 flex items-center justify-center overflow-hidden ${
          isCompleted
            ? "bg-gradient-to-b from-[#2A0E35] via-[#160620] to-[#08020B] border-[#F4E2C7] shadow-[0_0_80px_rgba(244,226,199,0.5)]"
            : "bg-[#0A040E] border-[#FF3D91]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        }`}
      >
        {/* Luminous supernova glow when completed */}
        {isCompleted && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.25)_0%,rgba(255,105,180,0.2)_45%,transparent_75%)] animate-pulse pointer-events-none" />
        )}

        {/* Ambient constellation lines in background (Heart shape) */}
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          {/* Base Heart outline connecting to crown */}
          <path
            d="M 210,180 C 120,90 40,200 210,360 C 380,200 300,90 210,180 Z"
            fill="none"
            stroke="rgba(255, 61, 145, 0.35)"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="filter drop-shadow-[0_0_8px_#FF3D91]"
          />

          {/* Connected Crown lines */}
          {connectedStars.map((id, idx) => {
            if (idx === 0) return null;
            const prev = CROWN_STARS.find((s) => s.id === connectedStars[idx - 1])!;
            const curr = CROWN_STARS.find((s) => s.id === id)!;
            return (
              <line
                key={`crown-line-${idx}`}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${curr.x}%`}
                y2={`${curr.y}%`}
                stroke="#F4E2C7"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_12px_#F4E2C7]"
              />
            );
          })}

          {/* Loop from star 4 back to 1 if complete */}
          {isCompleted && (
            <line
              x1={`${CROWN_STARS[3].x}%`}
              y1={`${CROWN_STARS[3].y}%`}
              x2={`${CROWN_STARS[0].x}%`}
              y2={`${CROWN_STARS[0].y}%`}
              stroke="#FFB6D9"
              strokeWidth="3"
              className="filter drop-shadow-[0_0_10px_#FFB6D9]"
            />
          )}
        </svg>

        {/* Central 19th Birthday Insignia */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <div
            className={`w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-700 ${
              isCompleted
                ? "bg-gradient-to-tr from-[#FF1493] via-[#F4E2C7] to-white border-white shadow-[0_0_60px_#FF69B4] scale-110"
                : "bg-[#180B1E]/80 border-[#FF3D91]/40 shadow-inner"
            }`}
          >
            <Crown
              className={`w-7 h-7 ${
                isCompleted ? "text-black animate-bounce" : "text-[#F4E2C7]"
              }`}
            />
            <span
              className={`font-serif text-2xl font-bold tracking-tight ${
                isCompleted ? "text-black" : "text-[#FFF5FA]"
              }`}
            >
              19
            </span>
            <span
              className={`text-[9px] font-mono tracking-widest uppercase ${
                isCompleted ? "text-black/80 font-bold" : "text-[#FFB6D9]"
              }`}
            >
              AKRITI
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#F4E2C7]/80 pt-3">
            NOVEMBER 6, 2026
          </span>
        </div>

        {/* Crown Stars to Click/Tap */}
        {CROWN_STARS.map((star) => {
          const isConnected = connectedStars.includes(star.id);
          const isNext = connectedStars[connectedStars.length - 1] + 1 === star.id;

          return (
            <div
              key={star.id}
              onClick={() => handleConnectStar(star.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-4 select-none z-20 group"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              {isNext && (
                <div className="absolute inset-0 rounded-full border-2 border-[#FFD700] animate-ping opacity-75 pointer-events-none" />
              )}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all duration-300 ${
                  isConnected
                    ? "bg-[#F4E2C7] text-black border-white shadow-[0_0_20px_#F4E2C7] scale-110"
                    : isNext
                    ? "bg-[#1E0D25] border-2 border-[#FFD700] text-[#FFD700] scale-105 shadow-[0_0_15px_#FFD700]"
                    : "bg-white/10 border-white/20 text-white/40 hover:text-white"
                }`}
              >
                {star.id}
              </div>

              <span className="absolute top-full left-1/2 -translate-x-1/2 text-[9px] font-mono whitespace-nowrap text-[#F4E2C7] opacity-80 pt-1">
                {star.label}
              </span>
            </div>
          );
        })}

        {/* Finale Completed Supernova Flash */}
        {isCompleted && (
          <div className="absolute inset-0 bg-[#F4E2C7]/20 backdrop-blur-[2px] flex flex-col items-center justify-center animate-fade-in pointer-events-none z-30">
            <Sparkles className="w-20 h-20 text-[#F4E2C7] animate-spin filter drop-shadow-[0_0_30px_#F4E2C7]" />
            <p className="font-serif text-3xl text-white font-normal mt-3 text-center px-4">
              The Grand Observatory is Illuminated!
            </p>
            <p className="text-xs font-mono text-[#F4E2C7] mt-1 tracking-widest uppercase">
              ✦ All 5 Chapters Mastered • Final Treasure Unlocked ✦
            </p>
          </div>
        )}
      </div>

      {/* Completion Actions */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-white/50">
          Crown Anchored: {connectedStars.length} / 4
        </span>

        {isCompleted && onEnterUniverse && (
          <button
            onClick={onEnterUniverse}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF3D91] via-[#FF69B4] to-[#F5A6CD] text-white font-mono font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_0_35px_rgba(255,61,145,0.7)] hover:scale-105 active:scale-95 animate-pulse mt-2"
          >
            <span>Grand Finale: Enter Birthday Universe</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
