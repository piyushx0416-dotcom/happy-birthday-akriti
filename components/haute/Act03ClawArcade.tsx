"use client";

import React, { useState } from "react";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface Act03ClawArcadeProps {
  onNext: () => void;
}

interface Artifact {
  id: number;
  badge: string;
  title: string;
  quote: string;
  icon: string;
  color: string;
  posPercent: number; // horizontal % across chamber
}

const artifacts: Artifact[] = [
  {
    id: 0,
    badge: "LEGENDARY ARTIFACT",
    title: "THE RUBY HEART",
    quote:
      "“Your heart is genuine in a world where almost everyone puts on a performance. Never lose that honest warmth.”",
    icon: "💖",
    color: "#FF3D91",
    posPercent: 28,
  },
  {
    id: 1,
    badge: "ROYAL TREASURE",
    title: "THE QUEEN'S CROWN",
    quote:
      "“You command respect effortlessly. A quiet confidence and strength that needs no explanation.”",
    icon: "👑",
    color: "#E8C994",
    posPercent: 42,
  },
  {
    id: 2,
    badge: "TIMELESS KEEPSAKE",
    title: "THE POLAROID CHARM",
    quote:
      "“That thoughtful candid gaze and that genuine smile — truly unforgettable in every single frame.”",
    icon: "📷",
    color: "#BBA7FF",
    posPercent: 56,
  },
  {
    id: 3,
    badge: "CELESTIAL BLOSSOM",
    title: "THE ROSE QUARTZ",
    quote:
      "“That iconic delicate diamond nose pin and your effortless elegance redefine poise.”",
    icon: "🌹",
    color: "#FF9FCB",
    posPercent: 70,
  },
  {
    id: 4,
    badge: "MYTHIC ESSENCE",
    title: "THE SUPERNOVA GEM",
    quote:
      "“One in eight billion. You bring an unmistakable, vibrant light to everywhere you step.”",
    icon: "🌟",
    color: "#38BDF8",
    posPercent: 84,
  },
];

export default function Act03ClawArcade({ onNext }: Act03ClawArcadeProps) {
  const [clawX, setClawX] = useState<number>(50); // percentage 10% to 90%
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [clawY, setClawY] = useState<number>(10); // 10% (top) to 72% (bottom)
  const [collected, setCollected] = useState<boolean[]>([false, false, false, false, false]);
  const [activeModal, setActiveModal] = useState<Artifact | null>(null);
  const [statusText, setStatusText] = useState<string>("READY TO DROP! ★");

  const collectedCount = collected.filter(Boolean).length;
  const allCollected = collectedCount === 5;

  const moveLeft = () => {
    if (isDropping) return;
    setClawX((prev) => Math.max(16, prev - 12));
  };

  const moveRight = () => {
    if (isDropping) return;
    setClawX((prev) => Math.min(88, prev + 12));
  };

  const dropClaw = () => {
    if (isDropping) return;
    setIsDropping(true);
    setStatusText("DESCENDING INTO CHAMBER...");

    // 1. Descend
    setClawY(70);

    setTimeout(() => {
      // Find closest uncollected capsule
      let targetIdx = -1;
      let minDistance = 999;

      artifacts.forEach((art, idx) => {
        if (!collected[idx]) {
          const dist = Math.abs(art.posPercent - clawX);
          if (dist < minDistance) {
            minDistance = dist;
            targetIdx = idx;
          }
        }
      });

      // If all collected or nothing close, pick next uncollected
      if (targetIdx === -1) {
        targetIdx = collected.findIndex((c) => !c);
      }
      if (targetIdx === -1) targetIdx = 0;

      setStatusText("CAPSULE GRABBED! HOISTING...");

      // 2. Ascend with capsule
      setTimeout(() => {
        setClawY(10);

        // 3. Move left to Prize Drop chute (at x = 12%)
        setTimeout(() => {
          setStatusText("TRANSPORTING TO PRIZE CHUTE...");
          setClawX(12);

          // 4. Release into chute
          setTimeout(() => {
            setStatusText("STATUS: TREASURE RETRIEVED! ★");
            const newCollected = [...collected];
            newCollected[targetIdx] = true;
            setCollected(newCollected);

            // Open Modal
            setActiveModal(artifacts[targetIdx]);
            setIsDropping(false);

            if (newCollected.filter(Boolean).length === 5) {
              confetti({
                particleCount: 90,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#FF3D91", "#E8C994", "#FF9FCB", "#FFFFFF"],
              });
            }
          }, 800);
        }, 900);
      }, 700);
    }, 900);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 py-20 lg:py-24 bg-[#07050B] select-none">
      {/* Background Neon Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-fuchsia-950/20 rounded-full blur-[160px]" />
      </div>

      {/* Header Badge & Title */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full border-2 border-fuchsia-500/60 bg-[#1A0B22]/90 text-fuchsia-300 font-cinzel-caps text-xs sm:text-sm tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(217,70,239,0.35)]">
          <span>★ AKRITI&apos;S CLAW ARCADE ★</span>
        </div>

        <p className="font-sans text-xs sm:text-sm text-[#F8F1E8]/75 leading-relaxed">
          Drop the claw, grab the mystery capsules, and unlock 5 bespoke birthday treasures!
        </p>

        {/* Capsule Tracker */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-fuchsia-500/30 bg-[#13091B]/80 text-xs font-mono">
          <span className="text-[#F8F1E8]/60 tracking-wider">CAPSULES COLLECTED:</span>
          <div className="flex items-center gap-2">
            {artifacts.map((art, idx) => (
              <span
                key={art.id}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                  collected[idx]
                    ? "bg-fuchsia-600/80 text-white shadow-[0_0_10px_#D946EF] scale-110"
                    : "bg-[#1F142B] text-white/30 border border-fuchsia-500/20"
                }`}
              >
                {collected[idx] ? art.icon : "?"}
              </span>
            ))}
          </div>
          <span className="text-fuchsia-400 font-bold ml-1">{collectedCount}/5</span>
        </div>
      </div>

      {/* The Claw Machine Arcade Chamber */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-4">
        <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl border-2 border-fuchsia-500/40 bg-[#0C0614]/90 shadow-[0_0_40px_rgba(217,70,239,0.18)] overflow-hidden flex flex-col justify-between p-4">
          {/* Top Cable Rail */}
          <div className="absolute top-0 left-0 right-0 h-4 border-b border-fuchsia-500/20 bg-[#160B24]" />

          {/* Claw Assembly */}
          <div
            className="absolute z-20 transition-all duration-300 ease-out flex flex-col items-center"
            style={{
              left: `${clawX}%`,
              top: `${clawY}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Hanging Cable */}
            <div className="w-[2px] h-28 bg-[#E8C994]/60 -translate-y-20" />

            {/* Claw Head & Prongs */}
            <div className="w-8 h-8 rounded-full border-2 border-[#E8C994] bg-[#E8C994]/20 flex items-center justify-center shadow-[0_0_15px_#E8C994]">
              {/* Prongs */}
              <div className="relative w-7 h-5 flex justify-between items-end">
                <span className="w-1.5 h-4 border-l-2 border-b-2 border-[#E8C994] rounded-bl-md" />
                <span className="w-1.5 h-4 border-r-2 border-b-2 border-[#E8C994] rounded-br-md" />
              </div>
            </div>
          </div>

          {/* Left Prize Drop Chute */}
          <div className="absolute bottom-4 left-4 w-20 sm:w-24 h-24 rounded-2xl border-2 border-dashed border-cyan-400/50 bg-cyan-950/20 flex flex-col items-center justify-center text-[9px] font-mono tracking-widest text-cyan-300 uppercase">
            <span>PRIZE DROP</span>
            <span className="text-xs animate-bounce mt-1">↓</span>
          </div>

          {/* 5 Bottom Mystery Capsules */}
          <div className="absolute bottom-6 left-0 right-0 px-6 sm:px-12 flex justify-end gap-5 sm:gap-10 pr-6 sm:pr-12">
            {artifacts.map((art, idx) => (
              <div
                key={art.id}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center text-base sm:text-lg cursor-pointer transition-all duration-300 ${
                  collected[idx]
                    ? "opacity-30 scale-90 border-white/20 bg-white/5"
                    : "shadow-[0_0_20px_rgba(255,61,145,0.4)] hover:scale-110"
                }`}
                style={{
                  borderColor: art.color,
                  backgroundColor: `${art.color}25`,
                }}
              >
                <span>{art.icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Arcade Controls */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
          {/* Movement Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={moveLeft}
              disabled={isDropping}
              className="px-5 py-2.5 rounded-xl border border-fuchsia-500/40 bg-[#160A22] text-xs font-mono font-bold tracking-wider text-[#F8F1E8] hover:bg-fuchsia-500/20 transition-colors uppercase disabled:opacity-50"
            >
              ◄ LEFT
            </button>
            <button
              onClick={moveRight}
              disabled={isDropping}
              className="px-5 py-2.5 rounded-xl border border-fuchsia-500/40 bg-[#160A22] text-xs font-mono font-bold tracking-wider text-[#F8F1E8] hover:bg-fuchsia-500/20 transition-colors uppercase disabled:opacity-50"
            >
              RIGHT ►
            </button>
          </div>

          {/* Central Drop Button */}
          <button
            onClick={dropClaw}
            disabled={isDropping}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-600 text-white font-mono font-bold text-xs tracking-[0.25em] uppercase shadow-[0_0_25px_rgba(217,70,239,0.5)] hover:shadow-[0_0_40px_rgba(217,70,239,0.8)] hover:scale-105 transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
          >
            <span>🕹️ DROP CLAW!</span>
          </button>

          {/* Live Status Text */}
          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-emerald-400 font-semibold uppercase">
            STATUS: {statusText}
          </div>
        </div>
      </div>

      {/* Completion Banner when all 5 are retrieved */}
      {allCollected ? (
        <div className="relative z-20 max-w-4xl mx-auto w-full mt-2 rounded-2xl border-2 border-[#E8C994]/60 bg-[#1A1208]/90 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(232,201,148,0.25)] animate-in fade-in slide-in-from-bottom duration-500">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#E8C994]/20 border border-[#E8C994] flex items-center justify-center text-xl shrink-0">
              🏆
            </div>
            <div>
              <h4 className="font-editorial-serif text-base sm:text-lg font-bold text-[#E8C994] uppercase tracking-wider">
                ALL 5 TREASURES UNLOCKED!
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#F8F1E8]/80">
                You conquered the Claw of Destiny. You deserve every compliment and every wish.
              </p>
            </div>
          </div>

          <button
            onClick={onNext}
            className="px-6 py-3 rounded-full bg-[#E8C994] text-[#07050B] font-mono font-bold text-xs tracking-[0.2em] uppercase shrink-0 hover:scale-105 transition-transform"
          >
            CONTINUE TO THE PRIVATE LETTER →
          </button>
        </div>
      ) : (
        <div className="relative z-10 flex justify-center pb-2">
          <button
            onClick={onNext}
            className="text-xs font-mono tracking-widest text-[#F8F1E8]/40 hover:text-[#E8C994] transition-colors uppercase"
          >
            Skip to The Private Letter →
          </button>
        </div>
      )}

      {/* Reward Modal Popup */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-[#07050B]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-md rounded-3xl border-2 border-[#E8C994]/60 bg-[#130A1F] p-8 sm:p-10 text-center space-y-5 shadow-[0_0_50px_rgba(232,201,148,0.3)]">
            {/* Modal Icon */}
            <div className="w-16 h-16 rounded-full bg-[#E8C994]/15 border border-[#E8C994]/40 mx-auto flex items-center justify-center text-3xl shadow-lg">
              {activeModal.icon}
            </div>

            {/* Badge */}
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#E8C994] font-semibold">
              {activeModal.badge}
            </div>

            {/* Title */}
            <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#F8F1E8] tracking-tight">
              {activeModal.title}
            </h3>

            {/* Quote */}
            <p className="font-editorial-script italic text-base sm:text-lg text-[#F8F1E8]/85 leading-relaxed px-2">
              {activeModal.quote}
            </p>

            {/* Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-3.5 rounded-full bg-[#E8C994] text-[#07050B] font-mono font-bold text-xs tracking-[0.25em] uppercase shadow-lg hover:scale-105 transition-transform"
              >
                CLAIM REWARD & KEEP PLAYING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
