"use client";

import React, { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface HeartGalaxyProps {
  onBackToCollage: () => void;
  onReplayFromStart: () => void;
}

export default function HeartWordCloud3D({
  onBackToCollage,
  onReplayFromStart,
}: HeartGalaxyProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Ensure video autoplays and plays smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Autoplay fallback if needed
    });

    const handleVideoEnd = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  // Ambient interactive burst on click/tap
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Small burst of romantic glowing hearts and sparkles
    confetti({
      particleCount: 15,
      spread: 60,
      startVelocity: 25,
      origin: { x, y },
      colors: ["#FF3D91", "#FF9FCB", "#E8C994", "#FFFFFF"],
      shapes: ["circle"],
      scalar: 0.8,
      ticks: 80,
    });
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative w-full h-screen bg-[#000000] z-20 flex flex-col items-center justify-between overflow-hidden select-none cursor-pointer"
      title="Click anywhere for sparkles"
    >
      {/* Background Starfield & Ambient Glow Aura */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep ambient radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,61,145,0.12)_0%,rgba(139,40,90,0.05)_45%,rgba(0,0,0,0.95)_100%)]" />

        {/* Subtle twinkling background stars */}
        <div className="stars-ambient absolute inset-0 opacity-40">
          <div className="absolute top-[12%] left-[18%] w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <div className="absolute top-[28%] right-[22%] w-1 h-1 rounded-full bg-[#FF9FCB] animate-ping" />
          <div className="absolute top-[75%] left-[14%] w-1.5 h-1.5 rounded-full bg-[#E8C994] animate-pulse" />
          <div className="absolute top-[82%] right-[16%] w-1 h-1 rounded-full bg-white animate-pulse" />
          <div className="absolute top-[45%] left-[8%] w-1 h-1 rounded-full bg-[#FF3D91] animate-ping" />
          <div className="absolute top-[35%] right-[10%] w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </div>
      </div>

      {/* Top Header Overlay: Minimalist, Editorial & Romantic */}
      <header className="relative z-30 pt-7 md:pt-9 px-6 text-center pointer-events-none transition-all duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF3D91]/30 bg-[#08080D]/80 backdrop-blur-md shadow-[0_0_20px_rgba(255,61,145,0.25)] mb-2.5">
          <span className="w-2 h-2 rounded-full bg-[#FF3D91] animate-ping" />
          <span className="text-[11px] md:text-xs font-mono font-medium tracking-[0.25em] text-[#FF9FCB] uppercase">
            ✦ Her Universe ✦
          </span>
        </div>

        <h1
          className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF9FCB] to-[#FF3D91] tracking-wide font-normal drop-shadow-[0_0_25px_rgba(255,61,145,0.5)]"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Happy Birthday, Akriti
        </h1>

        <p className="text-[11px] md:text-xs text-white/50 tracking-[0.2em] uppercase font-mono mt-1">
          November 6, 2026 • 19 Years of Radiance
        </p>
      </header>

      {/* Main Content: The Exact Integrated 3D Heart Galaxy Video */}
      <div className="relative z-20 flex-1 w-full max-w-[1050px] flex items-center justify-center px-4 py-2">
        <div className="relative w-full aspect-[16/10] max-h-[70vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(255,61,145,0.28)] border border-white/5">
          {/* Subtle vignette mask to blend the video edges seamlessly into the pitch-black backdrop */}
          <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.85)]" />

          {/* The Video Element */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-contain pointer-events-auto cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const v = videoRef.current;
              if (v) {
                if (v.paused) {
                  v.play();
                  setIsPlaying(true);
                } else {
                  v.pause();
                  setIsPlaying(false);
                }
              }
            }}
          >
            <source src="/assets/video/heart_galaxy_hd.mp4" type="video/mp4" />
            <source src="/assets/video/heart_galaxy.mp4" type="video/mp4" />
            <source src="/assets/video/heart_galaxy.webm" type="video/webm" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>

      {/* Bottom Editorial Caption & Navigation Controls */}
      <footer className="relative z-30 pb-7 md:pb-9 px-6 flex flex-col items-center gap-4">
        {/* Poetic Quote */}
        <p
          className="text-sm md:text-base text-white/80 italic text-center max-w-xl font-light tracking-wide pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          &ldquo;In every universe, across every star, I would still choose yours.&rdquo;
        </p>
      </footer>
    </div>
  );
}
