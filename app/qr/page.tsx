"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeartQRPage() {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText("https://happy-birthday-akriti-0611.vercel.app/");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050508] text-[#F8F1E8] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden select-none font-sans">
      {/* Background Starfield */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,13,56,0.12)_0%,rgba(80,10,25,0.04)_50%,rgba(5,5,8,0.98)_100%)]" />
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 29) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              opacity: 0.15 + (i % 4) * 0.15,
              animationDuration: `${2.5 + (i % 4)}s`,
              animationDelay: `${(i % 3) * 0.7}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center space-y-6">
        {/* Top Badges */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            HER UNIVERSE // PORTAL KEY
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight drop-shadow-[0_2px_20px_rgba(255,13,56,0.5)]">
            Red Heart QR Code
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-sans max-w-md mx-auto">
            Scan this glowing heart with any smartphone camera to enter the authentic HER UNIVERSE birthday experience.
          </p>
        </div>

        {/* QR Code Container with Glowing Red Aura */}
        <div className="relative group">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-red-600/30 via-rose-600/20 to-transparent blur-2xl pointer-events-none animate-pulse" />

          <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-[420px] md:h-[420px] rounded-3xl overflow-hidden border-2 border-red-900/50 bg-[#050508] shadow-[0_0_60px_rgba(255,13,56,0.35)] p-2 flex items-center justify-center">
            <Image
              src="/assets/qr/her-universe-heart-qr.png"
              alt="HER UNIVERSE Red Heart QR Code"
              width={1200}
              height={1200}
              priority
              quality={100}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/90 border border-red-500/50 text-[10px] font-mono text-red-300 tracking-wider uppercase backdrop-blur-md flex items-center gap-2 pointer-events-none shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            100% Scannable to Her Universe
          </div>
        </div>

        {/* Action Controls */}
        <div className="w-full max-w-md space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="/assets/qr/her-universe-heart-qr.png"
              download="her-universe-heart-qr.png"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-medium tracking-wide transition-all duration-200 shadow-[0_4px_25px_rgba(255,13,56,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Download Ultra HD PNG</span>
              <span className="text-[10px] opacity-80">(2000px)</span>
            </a>

            <a
              href="/assets/qr/her-universe-heart-qr.svg"
              download="her-universe-heart-qr.svg"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-red-500/50 text-white font-sans text-xs font-medium tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Download Vector SVG</span>
              <span className="text-[10px] opacity-80">(Lossless)</span>
            </a>
          </div>

          <button
            onClick={copyUrl}
            className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/75 hover:text-white text-xs font-mono transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>{copied ? "✓ Copied Website URL!" : "Copy Production URL"}</span>
            <span className="text-[10px] text-white/40">happy-birthday-akriti-0611.vercel.app</span>
          </button>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors duration-200"
            >
              <span>← Back to HER UNIVERSE Experience</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
