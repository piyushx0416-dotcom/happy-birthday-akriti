"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface Act05CelestialVaultProps {
  onNext: () => void;
}

export default function Act05CelestialVault({ onNext }: Act05CelestialVaultProps) {
  const [boxOpened, setBoxOpened] = useState(false);
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);

  const litCount = candlesLit.filter(Boolean).length;
  const allExtinguished = litCount === 0;

  const extinguishCandle = (idx: number) => {
    if (!candlesLit[idx]) return;
    const nextLit = [...candlesLit];
    nextLit[idx] = false;
    setCandlesLit(nextLit);

    if (nextLit.filter(Boolean).length === 0) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#E8C994", "#FF3D91", "#FFFFFF"],
      });
    }
  };

  const handleOpenBox = () => {
    if (boxOpened) return;
    setBoxOpened(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#E8C994", "#FFD700", "#FFFFFF"],
    });
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-20 lg:py-24 bg-[#07050B] select-none">
      {/* Background Cyan/Blue Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-950/20 rounded-full blur-[170px]" />
      </div>

      {/* Header Info */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
        <div className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-cyan-400 font-medium">
          THE CELEBRATION CEREMONY
        </div>

        <h2 className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#F8F1E8] tracking-tight">
          The Celestial Vault.
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#F8F1E8]/75 max-w-2xl mx-auto leading-relaxed pt-1">
          Untie the 3D Haute Gift Box and extinguish the candle flames to seal your birthday wish.
        </p>
      </div>

      {/* Two Interactive Panels Grid */}
      <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        {/* ========================================================
            LEFT PANEL: 01 // THE SURPRISE BOX
            ======================================================== */}
        <div className="rounded-3xl border border-cyan-900/40 bg-[#0C101A]/80 p-6 sm:p-8 flex flex-col justify-between min-h-[380px] shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="font-mono text-xs tracking-widest uppercase text-cyan-400 text-center pb-2">
            01 // THE SURPRISE BOX
          </div>

          <div className="my-auto flex items-center justify-center py-4">
            {!boxOpened ? (
              /* The Closed Gift Box */
              <div
                onClick={handleOpenBox}
                className="group cursor-pointer flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                {/* 3D Black and Gold Box SVG */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 filter drop-shadow-[0_15px_30px_rgba(232,201,148,0.25)]">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Ribbon Bow on top */}
                    <path
                      d="M 90 40 C 70 20 60 50 90 50 Z"
                      fill="#E8C994"
                      stroke="#C49D58"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 110 40 C 130 20 140 50 110 50 Z"
                      fill="#E8C994"
                      stroke="#C49D58"
                      strokeWidth="1.5"
                    />
                    <circle cx="100" cy="48" r="6" fill="#F8F1E8" />

                    {/* Box Lid */}
                    <rect
                      x="40"
                      y="52"
                      width="120"
                      height="24"
                      rx="4"
                      fill="#1A1526"
                      stroke="#E8C994"
                      strokeWidth="2"
                    />
                    {/* Lid Ribbon */}
                    <rect x="92" y="52" width="16" height="24" fill="#E8C994" />

                    {/* Box Base */}
                    <rect
                      x="46"
                      y="76"
                      width="108"
                      height="80"
                      rx="4"
                      fill="#130E1F"
                      stroke="#E8C994"
                      strokeWidth="1.5"
                    />
                    {/* Vertical Ribbon on Base */}
                    <rect x="92" y="76" width="16" height="80" fill="#E8C994" />
                    {/* Horizontal Ribbon on Base */}
                    <rect x="46" y="110" width="108" height="14" fill="#E8C994" />
                  </svg>
                </div>
              </div>
            ) : (
              /* The Unveiled Promise Card */
              <div className="w-full max-w-sm rounded-2xl border-2 border-[#E8C994]/60 bg-[#161022] p-6 text-center space-y-4 shadow-[0_0_30px_rgba(232,201,148,0.3)] animate-in zoom-in-95 duration-400">
                <div className="text-xl">☀️</div>

                <h4 className="font-editorial-serif text-lg font-bold tracking-wider text-[#E8C994] uppercase">
                  AN UNBREAKABLE PROMISE
                </h4>

                <p className="font-editorial-serif italic text-xs sm:text-sm text-[#F8F1E8]/90 leading-relaxed px-2">
                  No matter how busy life gets or where time leads, whenever you need
                  someone to remind you how extraordinary you are, I promise I&apos;ll be
                  right here.
                </p>

                <div className="pt-2 border-t border-[#E8C994]/30 font-mono text-[10px] tracking-widest uppercase text-[#E8C994]">
                  6TH NOVEMBER • ALWAYS
                </div>
              </div>
            )}
          </div>

          <div className="text-center font-mono text-[10px] sm:text-[11px] tracking-widest text-cyan-300 uppercase pt-2">
            {!boxOpened ? "TAP THE LUXURY BOX TO UNTIE" : "PROMISE SEALED FOREVER ☀️"}
          </div>
        </div>

        {/* ========================================================
            RIGHT PANEL: 02 // MAKE A WISH
            ======================================================== */}
        <div className="rounded-3xl border border-cyan-900/40 bg-[#0C101A]/80 p-6 sm:p-8 flex flex-col justify-between min-h-[380px] shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="font-mono text-xs tracking-widest uppercase text-cyan-400 text-center pb-2">
            02 // MAKE A WISH
          </div>

          {/* Three-Tier Cake with Clickable Flames */}
          <div className="my-auto flex flex-col items-center justify-center py-4">
            <div className="relative w-56 h-48 flex flex-col items-center justify-end">
              {/* Row of 5 Candles with Flames */}
              <div className="flex items-end justify-center gap-4 mb-1 z-10">
                {candlesLit.map((isLit, idx) => (
                  <div
                    key={idx}
                    onClick={() => extinguishCandle(idx)}
                    className="cursor-pointer flex flex-col items-center group"
                    title={isLit ? "Click flame to extinguish" : "Extinguished"}
                  >
                    {/* Flame */}
                    <div
                      className={`w-3.5 h-6 rounded-full mb-1 transition-all duration-300 ${
                        isLit
                          ? "bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-[0_0_15px_#F59E0B] animate-pulse group-hover:scale-125"
                          : "opacity-0 scale-0"
                      }`}
                    />
                    {/* Candle Stick */}
                    <div className="w-2 h-7 bg-[#FAF6EE] rounded-t-sm border border-[#E8C994]/40" />
                  </div>
                ))}
              </div>

              {/* Tier 1 (Top) */}
              <div className="w-24 h-8 rounded-t-lg bg-[#181326] border border-[#E8C994]/40 shadow-inner" />
              {/* Tier 2 (Middle) */}
              <div className="w-36 h-10 rounded-t-lg bg-[#140F21] border border-[#E8C994]/40 shadow-inner" />
              {/* Tier 3 (Bottom) */}
              <div className="w-48 h-12 rounded-t-lg bg-[#100C1C] border border-[#E8C994]/40 shadow-inner" />
              {/* Gold Platter Base */}
              <div className="w-56 h-3 rounded-full bg-[#E8C994] shadow-[0_4px_15px_rgba(232,201,148,0.4)]" />
            </div>
          </div>

          <div className="text-center font-mono text-[10px] sm:text-[11px] tracking-widest text-cyan-300 uppercase pt-2">
            {!allExtinguished
              ? `CLICK EACH FLAME TO BLOW THEM OUT (${litCount}/5 LIT)`
              : "✨ ALL CANDLES BLOWN OUT! YOUR WISH HAS BEEN SEALED IN THE STARS."}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="relative z-10 flex justify-center pb-4">
        <button
          onClick={onNext}
          className="group px-8 py-3.5 rounded-full bg-[#13101C] border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 font-mono text-xs tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center gap-2.5"
        >
          <span>ADVANCE TO THE GRAND FINALE</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
