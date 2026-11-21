"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useTextScramble } from "./useTextScramble";

interface IglooHUDProps {
  scrollProgress: number;
  scrollVelocity: number;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onJumpToProgress: (progress: number) => void;
  memoryPositions: Array<{ id: number; x: number; y: number; visible: boolean }>;
  blueprintMarkers: Array<{ id: string; num: string; x: number; y: number; visible: boolean }>;
  selectedMemory: number | null;
  onSelectMemory: (id: number | null) => void;
  activeMorphIndex: number;
  onChangeMorph: (index: number) => void;
}

const MEMORY_DATA = [
  {
    id: 0,
    tag: "PORTFOLIO_CO_01",
    title: "WARM LIGHT RADIANCE",
    temp: "TEMP 30.15 / -01.03",
    date: "D 06.11.2024",
    src: "/assets/akriti/heart-photo-01.jpg",
    caption: "The gentle warmth of your smile that brightens any room in an instant.",
  },
  {
    id: 1,
    tag: "PORTFOLIO_CO_02",
    title: "ALIEN EARMUFFS PLAYFUL",
    temp: "TEMP 24.80 / -04.12",
    date: "D 02.12.2024",
    src: "/assets/akriti/heart-photo-02.jpg",
    caption: "The effortless laughter and playful spirit that make you so uniquely wonderful.",
  },
  {
    id: 2,
    tag: "PORTFOLIO_CO_03",
    title: "LAKESIDE TRANQUILITY",
    temp: "TEMP 28.40 / +02.15",
    date: "D 15.06.2023",
    src: "/assets/akriti/heart-photo-03.jpg",
    caption: "Graceful and radiant against the quiet waters, like a timeless portrait.",
  },
  {
    id: 3,
    tag: "PORTFOLIO_CO_04",
    title: "STRIPED NOSE-STUD HARMONY",
    temp: "TEMP 26.90 / -00.45",
    date: "D 20.09.2024",
    src: "/assets/akriti/heart-photo-04.jpg",
    caption: "Elegance defined. Every glimpse of your expression holds quiet confidence.",
  },
  {
    id: 4,
    tag: "PORTFOLIO_CO_05",
    title: "SERENE FLORAL ENCHANTMENT",
    temp: "TEMP 29.10 / +01.80",
    date: "D 18.04.2024",
    src: "/assets/akriti/heart-photo-05.jpg",
    caption: "A gaze so sincere and captivating it halts the passage of time itself.",
  },
  {
    id: 5,
    tag: "PORTFOLIO_CO_06",
    title: "SUNGLASSES SUMMER GLOW",
    temp: "TEMP 32.50 / +04.20",
    date: "D 11.07.2024",
    src: "/assets/akriti/heart-photo-06.jpg",
    caption: "Pure sunshine in human form. A memory woven from laughter and golden sunlight.",
  },
  {
    id: 6,
    tag: "PORTFOLIO_CO_07",
    title: "EMERALD SARI TIMELESSNESS",
    temp: "TEMP 27.30 / -02.10",
    date: "D 06.11.2023",
    src: "/assets/akriti/heart-photo-07.jpg",
    caption: "Unmatched poise and elegance. A celebration of beauty, grace, and heritage.",
  },
];

const MORPH_SHAPES = [
  { index: 0, label: "01 // PUDGY EARMUFFS" },
  { index: 1, label: "02 // 3D CELESTIAL HEART" },
  { index: 2, label: "03 // AKRITI 19 CONSTELLATION" },
];

export default function IglooHUD({
  scrollProgress,
  scrollVelocity,
  isPlayingAudio,
  onToggleAudio,
  onJumpToProgress,
  memoryPositions,
  blueprintMarkers,
  selectedMemory,
  onSelectMemory,
  activeMorphIndex,
  onChangeMorph,
}: IglooHUDProps) {
  const [showChapters, setShowChapters] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);

  // Sector computation
  const currentSector = useMemo(() => {
    if (scrollProgress < 0.2) return 1;
    if (scrollProgress < 0.45) return 2;
    if (scrollProgress < 0.65) return 3;
    if (scrollProgress < 0.85) return 4;
    return 5;
  }, [scrollProgress]);

  // Sector titles with cipher scramble
  const sectorTitleRaw = useMemo(() => {
    switch (currentSector) {
      case 1:
        return "THE CORE ASSEMBLY";
      case 2:
        return "APERTURE VORTEX DIVE";
      case 3:
        return "CELESTIAL RINGS";
      case 4:
        return "CRYSTAL MONOLITHS // CLICK ANY SHARD TO EXPLORE";
      case 5:
        return "THE WISH PEDESTAL // CELESTIAL FINALE";
      default:
        return "THE CORE ASSEMBLY";
    }
  }, [currentSector]);

  const scrambledTitle = useTextScramble(sectorTitleRaw);

  const selectedMemoryObj = useMemo(() => {
    if (selectedMemory === null) return null;
    return MEMORY_DATA.find((m) => m.id === selectedMemory) || null;
  }, [selectedMemory]);

  const handleMakeWish = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.65 },
      colors: ["#a2dcff", "#00f0ff", "#ff3d91", "#ffffff", "#ffd700"],
    });
    setShowWishModal(true);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none font-mono text-[11px] sm:text-xs text-white">
      {/* ============================================================ */}
      {/* 1. TOP-LEFT: IGLOO-STYLE PILL LOGO & COPYRIGHT METADATA      */}
      {/* ============================================================ */}
      <div className="fixed top-5 sm:top-8 left-5 sm:left-10 pointer-events-auto flex flex-col gap-2 z-30">
        {/* Chunky Rounded Pill Logo matching igloo.inc */}
        <div className="flex items-center tracking-tighter select-none">
          <span className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            AKRITI
          </span>
        </div>

        {/* Minimalist Monospace Metadata */}
        <div className="text-[10px] sm:text-[11px] text-white/80 leading-relaxed font-mono">
          <p className="text-white/50">// Copyright © 2026</p>
          <p className="font-semibold text-white">Her Universe, Inc.</p>
          <p className="text-white/50">All Rights Reserved.</p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. TOP-RIGHT: ////// MANIFESTO (EXACT IGLOO.INC STYLE)       */}
      {/* ============================================================ */}
      <div className="fixed top-5 sm:top-8 right-5 sm:right-10 pointer-events-auto flex flex-col items-end gap-1.5 text-right z-30 max-w-[280px] sm:max-w-[340px]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono tracking-widest text-white/60">//////</span>
          <span className="text-xs font-mono font-bold tracking-wider text-white">Manifesto</span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-white/85 leading-relaxed font-mono tracking-normal">
          Our mission is to celebrate the most extraordinary soul, building an eternal universe at the intersection of
          beauty, stardust, and love.
        </p>

        {/* Chapters Dropdown Trigger */}
        <button
          onClick={() => setShowChapters((prev) => !prev)}
          className="mt-1 px-3 py-1 rounded border border-white/25 bg-black/40 hover:bg-white/10 text-white/90 hover:text-white transition-all text-[10px] tracking-widest"
        >
          [ {showChapters ? "CLOSE" : "CHAPTERS"} ]
        </button>

        {/* Chapters Menu Overlay */}
        {showChapters && (
          <div className="mt-2 w-64 p-3 rounded-lg border border-white/20 bg-black/85 backdrop-blur-md shadow-2xl flex flex-col gap-2 pointer-events-auto text-left">
            <span className="text-[9px] uppercase tracking-widest text-white/40">Jump to Sector:</span>
            {[
              { id: 1, label: "01 // THE CORE ASSEMBLY", prog: 0.05 },
              { id: 2, label: "02 // APERTURE VORTEX DIVE", prog: 0.28 },
              { id: 3, label: "03 // CELESTIAL RINGS", prog: 0.52 },
              { id: 4, label: "04 // MEMORY MONOLITHS", prog: 0.72 },
              { id: 5, label: "05 // THE WISH PEDESTAL", prog: 0.95 },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  onJumpToProgress(sec.prog);
                  setShowChapters(false);
                }}
                className={`text-left px-2 py-1.5 rounded transition-all text-[10px] tracking-wider ${
                  currentSector === sec.id
                    ? "bg-white/20 text-white font-bold"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. CENTER / OVERLAY: 3D BLUEPRINT CONSTELLATION MARKERS     */}
      {/* ============================================================ */}
      {blueprintMarkers.map((marker) => {
        if (!marker.visible) return null;
        return (
          <div
            key={marker.id}
            style={{
              position: "absolute",
              left: `${marker.x}px`,
              top: `${marker.y}px`,
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-none transition-opacity duration-300 z-10 flex items-center gap-1 font-mono text-[9px] text-white select-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          >
            <span className="text-white text-xs font-bold leading-none">+</span>
            <span className="text-white font-semibold">{marker.num}</span>
          </div>
        );
      })}

      {/* ============================================================ */}
      {/* 4. BOTTOM-LEFT: SCROLL DOWN TO DISCOVER & SOUND TOGGLE       */}
      {/* ============================================================ */}
      <div className="fixed bottom-6 left-5 sm:left-10 pointer-events-auto flex flex-col gap-3.5 z-30">
        {/* Scroll Prompt */}
        <div className="text-[11px] sm:text-xs text-white font-mono leading-tight tracking-wider">
          <p className="text-white/70">Scroll down to</p>
          <p className="font-bold text-white">discover.</p>
        </div>

        {/* Sound Toggle (Matching igloo.inc speaker icon + Sound: Off/On) */}
        <button
          onClick={onToggleAudio}
          className="flex items-center gap-2 text-white/85 hover:text-white transition-all text-[11px] font-mono tracking-wider cursor-pointer"
          title="Toggle Soundtrack"
        >
          {isPlayingAudio ? (
            <svg
              className="w-4 h-4 text-white animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          )}
          <span>Sound: {isPlayingAudio ? "On" : "Off"}</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 5. RIGHT SIDE PROGRESS RAIL & TELEMETRY INDICATOR             */}
      {/* ============================================================ */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-auto z-30">
        <span className="text-[10px] font-mono font-semibold tracking-wider text-white">
          [{Math.round(scrollProgress * 100).toString().padStart(3, "0")}%]
        </span>
        <div className="relative w-1 h-36 sm:h-44 bg-white/20 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 bg-white rounded-full transition-all duration-100"
            style={{ height: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <div className="flex flex-col gap-2 pt-1">
          {[0.05, 0.28, 0.52, 0.72, 0.95].map((targetP, idx) => (
            <button
              key={idx}
              onClick={() => onJumpToProgress(targetP)}
              className={`w-2 h-2 rounded-full border transition-all ${
                currentSector === idx + 1
                  ? "bg-white border-white scale-125"
                  : "bg-transparent border-white/30 hover:border-white/80"
              }`}
              title={`Jump to Sector ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. BOTTOM BANNER: CURRENT SECTOR & CIPHER SCRAMBLE TITLE     */}
      {/* ============================================================ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-center z-20 hidden md:block">
        <div className="px-4 py-1.5 rounded-full bg-black/40 border border-white/15 text-white/80 text-[10px] tracking-widest flex items-center gap-2.5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="text-white font-semibold">{scrambledTitle}</span>
          <span className="text-white/40">//</span>
          <span className="text-white/60">SECTOR [0{currentSector}]</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 7. SECTOR 4: OVERPASS-STYLE BLUEPRINT TELEMETRY LEADER LINES  */}
      {/* ============================================================ */}
      {memoryPositions.map((pos) => {
        if (!pos.visible) return null;
        const memory = MEMORY_DATA[pos.id];
        if (!memory) return null;

        return (
          <div
            key={pos.id}
            style={{
              position: "absolute",
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-auto z-20 w-[240px] sm:w-[280px] h-[340px] sm:h-[380px] flex flex-col justify-between p-3 select-none"
          >
            {/* Top-Left Leader Line */}
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-[9px] tracking-widest text-white/50">{memory.tag}</span>
              <span className="text-[11px] font-bold tracking-wider text-white">{memory.title}</span>
            </div>

            {/* Top-Right Temp Metric */}
            <div className="absolute top-3 right-3 text-right">
              <span className="text-[9px] text-white/60 tracking-widest font-mono">{memory.temp}</span>
            </div>

            {/* Bottom-Right Click to Explore Link */}
            <div className="flex flex-col items-end self-end">
              <span className="text-[9px] text-white/50 tracking-wider">{memory.date}</span>
              <button
                onClick={() => onSelectMemory(pos.id)}
                className="mt-1 px-2.5 py-1 rounded border border-white/40 bg-black/60 hover:bg-white hover:text-black text-white text-[10px] tracking-widest transition-all shadow-lg"
              >
                [ CLICK TO EXPLORE ]
              </button>
            </div>
          </div>
        );
      })}

      {/* ============================================================ */}
      {/* 8. SECTOR 5: PEDESTAL INTERACTION & WISH SUPERNOVA BUTTON    */}
      {/* ============================================================ */}
      {currentSector === 5 && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center gap-3 z-30">
          {/* Shape Morph Switcher */}
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md">
            <button
              onClick={() => onChangeMorph((activeMorphIndex + 2) % 3)}
              className="px-2 py-0.5 text-white/60 hover:text-white font-bold transition-all"
            >
              ←
            </button>
            <span className="text-[10px] tracking-widest text-white/90 min-w-[200px] text-center font-bold">
              {MORPH_SHAPES[activeMorphIndex].label}
            </span>
            <button
              onClick={() => onChangeMorph((activeMorphIndex + 1) % 3)}
              className="px-2 py-0.5 text-white/60 hover:text-white font-bold transition-all"
            >
              →
            </button>
          </div>

          {/* Tribute Links (matching igloo.inc Medium / LinkedIn / X style) */}
          <div className="flex items-center gap-4 text-[10px] text-white/60 tracking-wider">
            <Link href="/story" className="hover:text-white transition-all underline underline-offset-4">
              [ 365 Reasons ]
            </Link>
            <span>·</span>
            <Link href="/creator-letter" className="hover:text-white transition-all underline underline-offset-4">
              [ Creator Letter ]
            </Link>
            <span>·</span>
            <Link href="/constellation" className="hover:text-white transition-all underline underline-offset-4">
              [ Constellation ]
            </Link>
          </div>

          {/* Make a Wish Button */}
          <button
            onClick={handleMakeWish}
            className="px-6 py-2.5 rounded-full bg-white text-black font-bold tracking-widest text-xs hover:bg-[#a2dcff] hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            ✨ MAKE A BIRTHDAY WISH ✨
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 9. MEMORY DETAIL MODAL                                        */}
      {/* ============================================================ */}
      {selectedMemoryObj && (
        <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <div className="relative max-w-lg w-full bg-[#101720] border border-white/20 rounded-xl overflow-hidden p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-white/40 block">{selectedMemoryObj.tag}</span>
                <h3 className="text-sm font-bold text-white tracking-wider">{selectedMemoryObj.title}</h3>
              </div>
              <button
                onClick={() => onSelectMemory(null)}
                className="px-2.5 py-1 rounded border border-white/20 text-white/60 hover:text-white hover:bg-white/10 text-[10px] tracking-widest transition-all"
              >
                [ CLOSE ]
              </button>
            </div>

            <div className="relative w-full h-80 rounded-lg overflow-hidden border border-white/10 bg-black/40">
              <Image
                src={selectedMemoryObj.src}
                alt={selectedMemoryObj.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>

            <p className="text-xs text-white/80 leading-relaxed font-sans">{selectedMemoryObj.caption}</p>

            <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/10 font-mono">
              <span>{selectedMemoryObj.temp}</span>
              <span>{selectedMemoryObj.date}</span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 10. WISH CELEBRATION MODAL                                    */}
      {/* ============================================================ */}
      {showWishModal && (
        <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative max-w-md w-full bg-[#0d151e] border border-white/30 rounded-2xl p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center gap-4">
            <span className="text-xs tracking-widest text-[#a2dcff] font-bold">
              ✨ WISH TRANSMITTED TO THE STARS ✨
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Happy 19th Birthday, Akriti!
            </h2>
            <p className="text-xs text-white/80 leading-relaxed font-sans">
              May every stardust grain in this universe carry your dreams to reality. May your 19th year be filled with
              boundless happiness, warmth, radiant beauty, and everything your heart desires.
            </p>
            <p className="text-xs text-white/60 italic font-serif">Forever in your universe, with all my love ❤️</p>
            <button
              onClick={() => setShowWishModal(false)}
              className="mt-2 px-6 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold tracking-widest transition-all"
            >
              [ RETURN TO ORBIT ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
