"use client";

import React, { useEffect, useRef, useState } from "react";
import qrData from "@/public/assets/qr/heart_qr_matrix.json";

interface HeartQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeartQRCodeModal({ isOpen, onClose }: HeartQRCodeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Keyboard escape handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Progressive illumination animation
  useEffect(() => {
    if (!isOpen) {
      setAnimationCompleted(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 1200; // High resolution rendering canvas
    canvas.width = size;
    canvas.height = size;

    const modules = qrData.modules;
    const total = modules.length;
    const duration = 1800; // 1.8s progressive illumination
    const startTime = performance.now();
    let animId: number;

    const renderFrame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const visibleCount = Math.floor(eased * total);

      // Deep black background #050508
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, size, size);

      // Subtle radial crimson glow
      const cx = size / 2;
      const cy = size * 0.47;
      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, size * 0.45);
      gradient.addColorStop(0, "rgba(255, 13, 56, 0.16)");
      gradient.addColorStop(0.5, "rgba(255, 13, 56, 0.05)");
      gradient.addColorStop(1, "rgba(5, 5, 8, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Render modules up to visibleCount
      const scale = size / 2000.0;

      for (let i = 0; i < visibleCount; i++) {
        const m = modules[i];
        const x = m.x * scale;
        const y = m.y * scale;
        const sz = m.size * scale;

        if (m.isFinder) {
          // Solid crisp red for finder patterns
          ctx.fillStyle = "#FF0C23";
          ctx.fillRect(x, y, sz, sz);
        } else {
          // Stylized data module with micro-gap and luminous core
          const pad = 2 * scale;
          ctx.fillStyle = "#FF0C23";
          ctx.fillRect(x + pad, y + pad, sz - pad * 2, sz - pad * 2);

          const corePad = 6 * scale;
          if (sz - corePad * 2 > 1) {
            ctx.fillStyle = "#FF4D6D";
            ctx.fillRect(x + corePad, y + corePad, sz - corePad * 2, sz - corePad * 2);
          }
        }
      }

      if (progress < 1) {
        animId = requestAnimationFrame(renderFrame);
      } else {
        setAnimationCompleted(true);
      }
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isOpen]);

  const copyUrl = () => {
    navigator.clipboard.writeText("https://happy-birthday-akriti-0611.vercel.app/");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 transition-all duration-300 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-[#050508] border border-red-950/60 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_0_80px_rgba(255,13,56,0.22)] overflow-hidden"
      >
        {/* Soft pulsing ambient aura behind modal */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 z-20 group"
          aria-label="Close"
        >
          <span className="text-lg leading-none group-hover:rotate-90 transition-transform duration-200">✕</span>
        </button>

        {/* Header Title */}
        <div className="space-y-1 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            HER UNIVERSE PORTAL KEY
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wide">
            The Red Heart-Shaped QR Code
          </h2>
          <p className="text-xs text-white/60 font-sans max-w-sm mx-auto">
            Point your phone camera at this red heart to instantly unlock Akriti&apos;s birthday universe.
          </p>
        </div>

        {/* Interactive QR Display Canvas with soft pulsing red aura */}
        <div className="relative group my-2">
          {/* Subtle outer breathing aura */}
          <div
            className={`absolute -inset-3 rounded-3xl bg-gradient-to-tr from-red-600/20 via-rose-600/15 to-transparent blur-xl pointer-events-none transition-opacity duration-1000 ${
              animationCompleted ? "opacity-100 animate-pulse" : "opacity-40"
            }`}
          />

          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-red-900/40 bg-[#050508] shadow-[0_0_40px_rgba(255,13,56,0.3)] flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain cursor-pointer"
              title="HER UNIVERSE Scannable Heart QR Code"
            />
          </div>

          {/* Scannable Verified Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/85 border border-red-500/40 text-[9px] font-mono text-red-300 tracking-wider uppercase backdrop-blur-md flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            100% Phone Camera Scannable
          </div>
        </div>

        {/* Action Buttons: Download High-Res PNG & Vector SVG */}
        <div className="w-full mt-5 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
            <a
              href="/assets/qr/her-universe-heart-qr.png"
              download="her-universe-heart-qr.png"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-sans text-xs font-medium tracking-wide transition-all duration-200 shadow-[0_4px_20px_rgba(255,13,56,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Download Ultra HD PNG</span>
              <span className="text-[10px] opacity-75">(2000px)</span>
            </a>

            <a
              href="/assets/qr/her-universe-heart-qr.svg"
              download="her-universe-heart-qr.svg"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-red-500/40 text-white font-sans text-xs font-medium tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Download Vector SVG</span>
              <span className="text-[10px] opacity-75">(Lossless)</span>
            </a>
          </div>

          <button
            onClick={copyUrl}
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-mono transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>{copied ? "✓ Copied Website Link!" : "Copy Production URL"}</span>
            <span className="text-[10px] text-white/40">happy-birthday-akriti-0611.vercel.app</span>
          </button>
        </div>
      </div>
    </div>
  );
}
