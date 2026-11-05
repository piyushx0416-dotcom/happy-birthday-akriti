"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, RefreshCw, CheckCircle2 } from "lucide-react";
import { gameAudio } from "@/lib/audio/gameAudio";

interface StarNode {
  id: number;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

interface ConstellationPuzzleProps {
  onComplete: () => void;
  onCollectStardust: (amount: number) => void;
}

const STARS: StarNode[] = [
  { id: 1, label: "Vega (α)", x: 25, y: 35 },
  { id: 2, label: "Sheliak (β)", x: 50, y: 18 },
  { id: 3, label: "Sulafat (γ)", x: 75, y: 35 },
  { id: 4, label: "Aladfar (η)", x: 62, y: 78 },
  { id: 5, label: "Delta Lyrae (δ)", x: 38, y: 78 },
];

export default function ConstellationPuzzle({
  onComplete,
  onCollectStardust,
}: ConstellationPuzzleProps) {
  const [connectedPath, setConnectedPath] = useState<number[]>([1]);
  const [currentDragPos, setCurrentDragPos] = useState<{ x: number; y: number } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleStarClick = useCallback((starId: number) => {
    if (isCompleted) return;

    setConnectedPath((prev) => {
      const lastStar = prev[prev.length - 1];
      const nextExpected = lastStar + 1;

      if (starId === nextExpected) {
        gameAudio.playStarChime(440 + starId * 110);
        const nextPath = [...prev, starId];

        if (nextPath.length === STARS.length) {
          setIsCompleted(true);
          gameAudio.playLevelComplete();
          setTimeout(() => {
            onCollectStardust(25); // bonus stardust
            onComplete();
          }, 1200);
        }
        return nextPath;
      } else if (starId === 1 && prev.length === 1) {
        return prev;
      } else if (prev.includes(starId)) {
        // Clicking a previous star: no penalty
        return prev;
      } else {
        // Wrong star tapped
        gameAudio.playStarChime(220);
        return prev;
      }
    });
  }, [isCompleted, onComplete, onCollectStardust]);

  const handleReset = () => {
    setConnectedPath([1]);
    setIsCompleted(false);
    setCurrentDragPos(null);
  };

  // Touch / pointer drag handling
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCompleted || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCurrentDragPos({ x, y });

    // Check if pointer is hovering over the next expected star
    const lastStar = connectedPath[connectedPath.length - 1];
    const nextExpected = lastStar + 1;
    const nextStarObj = STARS.find((s) => s.id === nextExpected);

    if (nextStarObj) {
      const dx = nextStarObj.x - x;
      const dy = nextStarObj.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 8) {
        handleStarClick(nextExpected);
      }
    }
  };

  const handlePointerUp = () => {
    setCurrentDragPos(null);
  };

  const lastConnectedStar = STARS.find((s) => s.id === connectedPath[connectedPath.length - 1]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center space-y-2 mb-4">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#FFB6D9] px-3 py-1 rounded-full bg-[#FF3D91]/15 border border-[#FF3D91]/30">
          Touch or Drag to Connect Stars (1 ➔ 5)
        </span>
        <p className="text-xs font-mono text-white/50">
          Trace the celestial harp in sequence from Star 1 to 5.
        </p>
      </div>

      {/* SVG Interactive Canvas */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full aspect-square max-w-[420px] rounded-3xl bg-[#120718]/90 border border-[#F5A6CD]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden touch-none cursor-crosshair"
      >
        {/* Subtle celestial grid */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F5A6CD_1px,transparent_1px)] [background-size:24px_24px]" />

        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          {/* Completed lines */}
          {connectedPath.map((starId, idx) => {
            if (idx === 0) return null;
            const prevStar = STARS.find((s) => s.id === connectedPath[idx - 1])!;
            const currStar = STARS.find((s) => s.id === starId)!;
            return (
              <line
                key={`line-${idx}`}
                x1={`${prevStar.x}%`}
                y1={`${prevStar.y}%`}
                x2={`${currStar.x}%`}
                y2={`${currStar.y}%`}
                stroke="#FF69B4"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_10px_#FF1493]"
              />
            );
          })}

          {/* If completed, close the constellation loop (5 to 1) */}
          {isCompleted && (
            <line
              x1={`${STARS[4].x}%`}
              y1={`${STARS[4].y}%`}
              x2={`${STARS[0].x}%`}
              y2={`${STARS[0].y}%`}
              stroke="#F4E2C7"
              strokeWidth="3"
              strokeDasharray="4 4"
              className="filter drop-shadow-[0_0_12px_#F4E2C7]"
            />
          )}

          {/* Active drag pointer line */}
          {currentDragPos && lastConnectedStar && !isCompleted && (
            <line
              x1={`${lastConnectedStar.x}%`}
              y1={`${lastConnectedStar.y}%`}
              x2={`${currentDragPos.x}%`}
              y2={`${currentDragPos.y}%`}
              stroke="rgba(245, 166, 205, 0.7)"
              strokeWidth="2.5"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Stars */}
        {STARS.map((star) => {
          const isConnected = connectedPath.includes(star.id);
          const isNextTarget = connectedPath[connectedPath.length - 1] + 1 === star.id;

          return (
            <div
              key={star.id}
              onClick={() => handleStarClick(star.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto p-3 group transition-transform"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              {/* Outer pulsing ring for next target */}
              {isNextTarget && (
                <div className="absolute inset-0 rounded-full border-2 border-[#FF3D91] animate-ping opacity-75 pointer-events-none" />
              )}

              {/* Star Core */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 shadow-lg ${
                  isConnected
                    ? "bg-gradient-to-tr from-[#FF1493] to-[#F5A6CD] text-white shadow-[0_0_20px_#FF1493] scale-110"
                    : isNextTarget
                    ? "bg-[#1B0B1E] border-2 border-[#FF69B4] text-[#FFB6D9] scale-105 shadow-[0_0_15px_rgba(255,105,180,0.5)]"
                    : "bg-white/10 border border-white/20 text-white/50 hover:bg-white/20 hover:text-white"
                }`}
              >
                {star.id}
              </div>

              {/* Star Label */}
              <span
                className={`absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono tracking-wider pt-1 transition-opacity ${
                  isConnected ? "text-[#F4E2C7] opacity-100" : "text-white/40 opacity-70"
                }`}
              >
                {star.label}
              </span>
            </div>
          );
        })}

        {/* Level Complete Flash */}
        {isCompleted && (
          <div className="absolute inset-0 bg-[#FF3D91]/20 backdrop-blur-[2px] flex flex-col items-center justify-center animate-fade-in pointer-events-none">
            <CheckCircle2 className="w-16 h-16 text-[#F4E2C7] animate-bounce filter drop-shadow-[0_0_20px_#F4E2C7]" />
            <p className="font-serif text-2xl text-white font-medium mt-2">
              Constellation Restored!
            </p>
            <p className="text-xs font-mono text-[#FFB6D9] mt-1">
              +75 Stardust • Reward Unlocked
            </p>
          </div>
        )}
      </div>

      {/* Reset button */}
      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={handleReset}
          disabled={isCompleted}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono tracking-wider transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Path</span>
        </button>

        <span className="text-xs font-mono text-white/40">
          Connected: {connectedPath.length} / 5
        </span>
      </div>
    </div>
  );
}
