"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { useTextScramble } from "./useTextScramble";

interface IglooHUDProps {
  scrollProgress: number;
  scrollVelocity: number;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onJumpToProgress: (progress: number) => void;
  memoryPositions: Array<{ id: number; x: number; y: number; visible: boolean }>;
  selectedMemory: number | null;
  onSelectMemory: (id: number | null) => void;
  activeMorphIndex: number;
  onChangeMorph: (index: number) => void;
}

const MEMORY_DATA = [
  {
    id: 0,
    tag: "MEM_01",
    title: "WARM LIGHT SMILE",
    date: "06.NOV.2024",
    location: "COSMIC COORDINATES 28.61°N, 77.20°E",
    src: "/assets/akriti/heart-photo-01.jpg",
    caption: "The gentle warmth of your smile that brightens any room in an instant.",
  },
  {
    id: 1,
    tag: "MEM_02",
    title: "ALIEN EARMUFFS PLAYFUL SELFIE",
    date: "WINTER ARCHIVE // 2024",
    location: "SECTOR 04 // PLAYFUL REALM",
    src: "/assets/akriti/heart-photo-02.jpg",
    caption: "The effortless laughter and playful spirit that make you so uniquely wonderful.",
  },
  {
    id: 2,
    tag: "MEM_03",
    title: "FLORAL DRESS BY THE LAKESIDE",
    date: "SUMMER EXPEDITION // 2023",
    location: "LAKE TRANQUILLITY // SECTOR 02",
    src: "/assets/akriti/heart-photo-03.jpg",
    caption: "Graceful and radiant against the quiet waters, like a timeless portrait.",
  },
  {
    id: 3,
    tag: "MEM_04",
    title: "STRIPED TOP & NOSE STUD PORTRAIT",
    date: "AUTUMN ARCHIVE // 2024",
    location: "CELESTIAL STUDIOS // HARMONY",
    src: "/assets/akriti/heart-photo-04.jpg",
    caption: "Elegance defined. Every glimpse of your expression holds quiet confidence.",
  },
  {
    id: 4,
    tag: "MEM_05",
    title: "SERENE FLORAL TOP PORTRAIT",
    date: "SPRING ARCHIVE // 2024",
    location: "SOLAR SANCTUARY // LIGHT",
    src: "/assets/akriti/heart-photo-05.jpg",
    caption: "A gaze so sincere and captivating it halts the passage of time itself.",
  },
  {
    id: 5,
    tag: "MEM_06",
    title: "WHITE SUNGLASSES SUNNY SMILE",
    date: "SUMMER SUNSHINE // 2024",
    location: "AZURE SKYLINE // SECTOR 07",
    src: "/assets/akriti/heart-photo-06.jpg",
    caption: "Carefree, glowing with sunshine, and bringing pure joy to everyone around you.",
  },
  {
    id: 6,
    tag: "MEM_07",
    title: "EMERALD STRIPED SARI MASTERPIECE",
    date: "CELESTIAL VAULT // ICONIC",
    location: "THE GRAND PAVILION // NOIR",
    src: "/assets/akriti/heart-photo-07.jpg",
    caption: "Breathtaking traditional elegance. A vision of beauty that words cannot capture.",
  },
];

const MORPH_LABELS = [
  { id: 0, title: "01 // BIRTHDAY CAKE & FLAME" },
  { id: 1, title: "02 // 3D CELESTIAL HEART" },
  { id: 2, title: "03 // AKRITI 19 CONSTELLATION" },
];

export default function IglooHUD({
  scrollProgress,
  scrollVelocity,
  isPlayingAudio,
  onToggleAudio,
  onJumpToProgress,
  memoryPositions,
  selectedMemory,
  onSelectMemory,
  activeMorphIndex,
  onChangeMorph,
}: IglooHUDProps) {
  const [wishMade, setWishMade] = useState(false);
  const [showChapters, setShowChapters] = useState(false);

  // Determine current active sector
  const currentSector = useMemo(() => {
    if (scrollProgress <= 0.2) return { id: "01", name: "THE CORE ASSEMBLY", range: [0, 0.2] };
    if (scrollProgress <= 0.38) return { id: "02", name: "APERTURE VORTEX DIVE", range: [0.2, 0.38] };
    if (scrollProgress <= 0.6) return { id: "03", name: "CONCENTRIC CELESTIAL RINGS", range: [0.38, 0.6] };
    if (scrollProgress <= 0.85) return { id: "04", name: "FLOATING MEMORY MONOLITHS", range: [0.6, 0.85] };
    return { id: "05", name: "THE WISH PEDESTAL", range: [0.85, 1.0] };
  }, [scrollProgress]);

  // Scramble effect for headline
  const headline = useMemo(() => {
    if (scrollProgress <= 0.2) return "HER UNIVERSE // A CELESTIAL EXPEDITION";
    if (scrollProgress <= 0.38) return "DIVING THROUGH THE APERTURE // 19 LIGHT YEARS";
    if (scrollProgress <= 0.6) return "PLANETARY RINGS // COSMIC HARMONY";
    if (scrollProgress <= 0.85) return "CRYSTAL MONOLITHS // CLICK ANY SHARD TO INSPECT";
    return "THE WISH PEDESTAL // CELESTIAL FINALE";
  }, [scrollProgress]);

  const scrambledHeadline = useTextScramble(headline, true);

  const handleMakeWish = () => {
    setWishMade(true);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#FF3D91", "#00F0FF", "#FFE600", "#FFFFFF", "#FF0D38"],
    });
  };

  const selectedData = selectedMemory !== null ? MEMORY_DATA[selectedMemory] : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none font-mono text-[11px] sm:text-xs text-white">
      {/* ========================================================= */}
      {/* 1. TOP HEADER HUD (Telemetry, Coordinates, Audio, Chapters) */}
      {/* ========================================================= */}
      <header className="fixed top-0 left-0 right-0 p-3 sm:p-5 flex items-center justify-between z-30 bg-gradient-to-b from-[#06070a]/90 via-[#06070a]/40 to-transparent backdrop-blur-[2px]">
        {/* Left: Identity & Live Engine Status */}
        <div className="flex items-center gap-2.5 sm:gap-4 pointer-events-auto">
          <div className="flex items-center gap-2 font-medium tracking-widest text-[#a2dcff]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AKRITI SINGH</span>
            <span className="text-white/40">//</span>
            <span className="text-white/80">06.NOV.2026</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-white/50 tracking-wider">
            <span>SECTOR [{currentSector.id}]</span>
          </div>
        </div>

        {/* Center: Live Sector Readout */}
        <div className="hidden lg:flex items-center gap-2 tracking-widest text-white/70">
          <span className="text-[#a2dcff] font-bold">[</span>
          <span className="text-white/90">{currentSector.name}</span>
          <span className="text-[#a2dcff] font-bold">]</span>
        </div>

        {/* Right: Audio Visualizer & Chapters Button */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <button
            onClick={onToggleAudio}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded border border-white/15 bg-black/60 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-200"
            title="Toggle Soundtrack"
          >
            {/* 3-bar animated audio equalizer */}
            <div className="flex items-end gap-0.5 h-3">
              <span
                className={`w-0.5 bg-[#a2dcff] rounded-full transition-all duration-200 ${
                  isPlayingAudio ? "h-3 animate-pulse" : "h-1"
                }`}
              />
              <span
                className={`w-0.5 bg-[#a2dcff] rounded-full transition-all duration-200 ${
                  isPlayingAudio ? "h-2 animate-bounce" : "h-1"
                }`}
              />
              <span
                className={`w-0.5 bg-[#a2dcff] rounded-full transition-all duration-200 ${
                  isPlayingAudio ? "h-3 animate-pulse" : "h-1"
                }`}
              />
            </div>
            <span className="tracking-widest text-[10px]">AUDIO: {isPlayingAudio ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setShowChapters(!showChapters)}
            className="px-2.5 sm:px-3 py-1 rounded border border-[#a2dcff]/40 bg-[#a2dcff]/10 hover:bg-[#a2dcff]/20 text-[#a2dcff] transition-all duration-200 tracking-widest text-[10px]"
          >
            [ CHAPTERS ]
          </button>
        </div>
      </header>

      {/* Chapters Quick-Jump Dropdown Menu */}
      {showChapters && (
        <div className="fixed top-14 right-4 sm:right-6 z-40 bg-[#080b11]/95 border border-white/15 rounded-xl p-3 shadow-2xl backdrop-blur-xl pointer-events-auto space-y-1.5 min-w-[240px]">
          <div className="text-[10px] text-white/40 tracking-widest pb-1 border-b border-white/10">
            JUMP TO SECTOR:
          </div>
          {[
            { id: 0.05, name: "01 // THE CORE ASSEMBLY" },
            { id: 0.28, name: "02 // APERTURE VORTEX DIVE" },
            { id: 0.48, name: "03 // CELESTIAL RINGS" },
            { id: 0.72, name: "04 // MEMORY MONOLITHS" },
            { id: 0.95, name: "05 // THE WISH PEDESTAL" },
          ].map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                onJumpToProgress(ch.id);
                setShowChapters(false);
              }}
              className="w-full text-left px-2.5 py-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white tracking-wider text-[11px] transition-colors"
            >
              {ch.name}
            </button>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. SIDE TELEMETRY (Left Coordinates, Right Progress Gauge) */}
      {/* ========================================================= */}
      {/* Left Telemetry */}
      <div className="hidden sm:flex fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 flex-col gap-3 text-[10px] text-white/40 tracking-widest">
        <div>
          <span className="text-white/20 block">VELOCITY</span>
          <span className="text-white/80 font-bold font-mono">
            {(scrollVelocity * 4.2).toFixed(2)} KM/S
          </span>
        </div>
        <div>
          <span className="text-white/20 block">COORDINATES</span>
          <span className="text-white/70">28.61° N, 77.20° E</span>
        </div>
        <div>
          <span className="text-white/20 block">ALTITUDE</span>
          <span className="text-white/70">
            {(19.0 - scrollProgress * 19.0).toFixed(2)} LY
          </span>
        </div>
      </div>

      {/* Right Progress Rail (Matching igloo.inc progress meter) */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-auto">
        <span className="text-[10px] font-mono font-semibold tracking-wider text-[#a2dcff]">
          [{Math.round(scrollProgress * 100).toString().padStart(3, "0")}%]
        </span>

        {/* Progress Bar with 5 Sector Ticks */}
        <div className="relative w-1 h-36 sm:h-48 bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#a2dcff] via-[#00f0ff] to-[#ff3d91] rounded-full transition-all duration-100"
            style={{ height: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

        {/* 5 Sector Ticks */}
        <div className="flex flex-col gap-2 pt-1">
          {[0.05, 0.28, 0.48, 0.72, 0.95].map((pos, idx) => (
            <button
              key={idx}
              onClick={() => onJumpToProgress(pos)}
              className={`w-2 h-2 rounded-full border transition-all ${
                Math.abs(scrollProgress - pos) < 0.12
                  ? "bg-[#a2dcff] border-white scale-125"
                  : "bg-transparent border-white/20 hover:border-white/60"
              }`}
              title={`Jump to Sector ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. DYNAMIC SVG LEADER LINES FOR 3D MEMORY MONOLITHS        */}
      {/* ========================================================= */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-10">
        {memoryPositions.map((item) => {
          if (!item.visible) return null;
          const data = MEMORY_DATA[item.id];
          const isLeft = item.x < window.innerWidth / 2;
          const labelX = isLeft ? item.x - 70 : item.x + 70;
          const labelY = item.y - 40;

          return (
            <g key={item.id} className="transition-opacity duration-300 opacity-90 hover:opacity-100">
              {/* Leader Line */}
              <polyline
                points={`${item.x},${item.y} ${labelX},${labelY} ${isLeft ? labelX - 60 : labelX + 60},${labelY}`}
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                className="opacity-60"
              />
              {/* Target Anchor Crosshair */}
              <circle cx={item.x} cy={item.y} r="4" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
              <circle cx={item.x} cy={item.y} r="1.5" fill="#ffffff" />
            </g>
          );
        })}
      </svg>

      {/* Floating Interactive Labels for 3D Monoliths */}
      {memoryPositions.map((item) => {
        if (!item.visible) return null;
        const data = MEMORY_DATA[item.id];
        const isLeft = item.x < window.innerWidth / 2;
        const posX = isLeft ? item.x - 130 : item.x + 70;
        const posY = item.y - 55;

        return (
          <div
            key={item.id}
            style={{ left: `${posX}px`, top: `${posY}px` }}
            onClick={() => onSelectMemory(item.id)}
            className="fixed z-20 pointer-events-auto cursor-pointer group px-2.5 py-1 rounded bg-[#06070a]/80 border border-[#00f0ff]/40 hover:border-[#00f0ff] hover:bg-[#00f0ff]/15 text-[#a2dcff] hover:text-white tracking-widest text-[10px] transition-all duration-200 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.25)] flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] group-hover:animate-ping" />
            <span>[{data.tag}]</span>
            <span className="hidden sm:inline text-white/80">{data.title}</span>
          </div>
        );
      })}

      {/* ========================================================= */}
      {/* 4. SCRAMBLED HEADLINE OVERLAY                             */}
      {/* ========================================================= */}
      <div className="fixed bottom-12 sm:bottom-16 left-4 sm:left-8 max-w-lg z-20 pointer-events-none">
        <div className="text-[10px] sm:text-xs text-[#a2dcff] font-bold tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {scrambledHeadline}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. BOTTOM SCROLL CUE DOCK                                 */}
      {/* ========================================================= */}
      <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white/50 text-[10px] tracking-widest flex items-center gap-2 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a2dcff] animate-ping" />
          <span>{scrollProgress >= 0.95 ? "REACHED DESTINATION" : "SCROLL TO DIVE"}</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. PEDESTAL INTERACTIVE CONTROLS (Stage 5 Finale)         */}
      {/* ========================================================= */}
      {scrollProgress >= 0.85 && (
        <div className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-auto">
          {/* Particle Morph Selector Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/80 border border-white/15 backdrop-blur-xl shadow-2xl">
            <button
              onClick={() => onChangeMorph((activeMorphIndex + 2) % 3)}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
              title="Previous 3D Form"
            >
              ←
            </button>
            <span className="text-[10px] sm:text-xs font-mono text-[#a2dcff] tracking-widest px-2 min-w-[190px] text-center">
              {MORPH_LABELS[activeMorphIndex].title}
            </span>
            <button
              onClick={() => onChangeMorph((activeMorphIndex + 1) % 3)}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
              title="Next 3D Form"
            >
              →
            </button>
          </div>

          {/* Make A Wish Button */}
          <button
            onClick={handleMakeWish}
            className="group px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff0d38] via-[#ff3d91] to-[#00f0ff] text-white font-mono font-bold tracking-widest text-xs uppercase shadow-[0_0_30px_rgba(255,61,145,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
          >
            <span>✨</span>
            <span>MAKE A BIRTHDAY WISH</span>
            <span>✨</span>
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. MEMORY INSPECTION MODAL (When Shard is Tapped)          */}
      {/* ========================================================= */}
      {selectedData && (
        <div
          onClick={() => onSelectMemory(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl pointer-events-auto cursor-pointer animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-[#080b11] border border-[#00f0ff]/40 rounded-2xl p-5 shadow-[0_0_60px_rgba(0,240,255,0.25)] flex flex-col space-y-4"
          >
            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-white/40 tracking-widest">
              <span className="text-[#00f0ff] font-bold">[{selectedData.tag}]</span>
              <span>{selectedData.date}</span>
              <button
                onClick={() => onSelectMemory(null)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Photo Preview */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/15 bg-black">
              <Image
                src={selectedData.src}
                alt={selectedData.title}
                fill
                quality={95}
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </div>

            {/* Caption & Location */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-sm font-serif text-white tracking-wide">{selectedData.title}</h3>
              <p className="text-xs text-white/70 font-sans leading-relaxed">{selectedData.caption}</p>
              <div className="text-[10px] text-[#a2dcff]/60 tracking-wider pt-2">
                LAT/LONG: {selectedData.location}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. BIRTHDAY WISH CELEBRATION MODAL                        */}
      {/* ========================================================= */}
      {wishMade && (
        <div
          onClick={() => setWishMade(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl pointer-events-auto cursor-pointer animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#07050b] border border-[#ff3d91]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(255,61,145,0.4)] text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff3d91]/15 border border-[#ff3d91]/40 text-[#ff3d91] text-[10px] tracking-widest uppercase">
              ✨ WISH TRANSMITTED TO THE STARS ✨
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
              Happy 19th Birthday, Akriti!
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed max-w-md mx-auto">
              May every stardust grain in this universe carry your dreams to reality. May your 19th year be filled with
              boundless happiness, warmth, radiant beauty, and everything your heart desires.
            </p>

            <div className="pt-2 text-xs font-serif italic text-[#ff9fcb]">
              Forever in your universe, with all my love ❤️
            </div>

            <div className="pt-4">
              <button
                onClick={() => setWishMade(false)}
                className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs tracking-widest transition-colors"
              >
                [ RETURN TO ORBIT ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
