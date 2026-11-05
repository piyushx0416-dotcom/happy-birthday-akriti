"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/audio/soundtrack";
import { Sparkles, Heart, ArrowRight, Flame } from "lucide-react";
import confetti from "canvas-confetti";

interface MagicalNightProps {
  onContinue: () => void;
}

export default function MagicalNight({ onContinue }: MagicalNightProps) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Parallax tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Twinkling Starfield & Atmospheric Drifting Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Stars & floating stardust
    const starCount = Math.min(220, Math.floor((width * height) / 5000));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.3,
      alpha: 0.5,
      twinkleSpeed: 0.01 + Math.random() * 0.03,
      color:
        Math.random() > 0.6
          ? "#FF9FCB" // soft rose
          : Math.random() > 0.4
          ? "#BBA7FF" // lavender
          : Math.random() > 0.2
          ? "#E8C994" // champagne gold
          : "#FFFFFF",
    }));

    // Atmospheric dust motes
    const motes = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let animId: number;
    let time = 0;

    const render = () => {
      ctx.fillStyle = "#08080D";
      ctx.fillRect(0, 0, width, height);

      // Soft nebula light glow in center
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        50,
        width / 2,
        height * 0.45,
        width * 0.55
      );
      grad.addColorStop(0, "rgba(255, 61, 145, 0.12)");
      grad.addColorStop(0.4, "rgba(187, 167, 255, 0.08)");
      grad.addColorStop(0.8, "rgba(232, 201, 148, 0.03)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render Stars
      time += 0.02;
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 100) * 0.4;
        const currentAlpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross glimmer for larger stars
        if (star.size > 1.6) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }
      });

      // Render atmospheric particles
      motes.forEach((m) => {
        m.x += m.speedX;
        m.y += m.speedY;
        if (m.y < 0) m.y = height;
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;

        ctx.fillStyle = "#FF9FCB";
        ctx.globalAlpha = m.alpha;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setWishMade(true);
    soundEngine.playCelebrationChime();

    // Trigger golden and soft pink stardust confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#FF3D91", "#FF9FCB", "#E8C994", "#FFFFFF"],
      disableForReducedMotion: true,
    });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-universe-black flex flex-col justify-between px-6 py-8 select-none">
      {/* Canvas Starfield & Twinkling Night */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-accent-rose text-sm">Chapter 02</span>
          <span className="text-accent-pink">✦</span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent-ivory/60">
            THE MAGICAL NIGHT
          </span>
        </div>

        <button
          onClick={() => {
            soundEngine.playChime(660);
            onContinue();
          }}
          className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-accent-rose hover:text-white transition-colors"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Centerpiece: Animated Birthday Illustration & Artwork */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center justify-center my-auto py-6">
        {/* Parallax Container */}
        <motion.div
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "spring", damping: 25, stiffness: 80 }}
          className="relative flex flex-col items-center"
        >
          {/* Celestial Aura Halo Behind Illustration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full bg-gradient-radial from-accent-pink/25 via-accent-lavender/15 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

          {/* Luxury Stylized SVG Illustration of Akriti holding Celestial Birthday Cake */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            <svg viewBox="0 0 400 400" className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(255,61,145,0.35)]">
              <defs>
                {/* Glow & Gradients */}
                <linearGradient id="haloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF3D91" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#BBA7FF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#E8C994" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="gownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F8F1E8" />
                  <stop offset="50%" stopColor="#FAF5EE" />
                  <stop offset="100%" stopColor="#E8C994" stopOpacity="0.7" />
                </linearGradient>

                <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#08080D" />
                  <stop offset="60%" stopColor="#1B1226" />
                  <stop offset="100%" stopColor="#2D1A3B" />
                </linearGradient>

                <filter id="candleGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Celestial Outer Orbit Rings */}
              <circle cx="200" cy="200" r="175" fill="none" stroke="url(#haloGrad)" strokeWidth="1" strokeDasharray="3 8" opacity="0.4" className="animate-spin-slow origin-center" />
              <circle cx="200" cy="200" r="145" fill="none" stroke="#E8C994" strokeWidth="0.75" strokeDasharray="6 6" opacity="0.3" />

              {/* Character Silhouette Group */}
              <g transform="translate(200, 190)">
                {/* Flowing Dark Wavy Hair */}
                <path
                  d="M -48 -60 C -75 -20 -70 45 -55 90 C -35 60 -42 20 -38 -10 C -30 -65 30 -65 38 -10 C 42 20 35 60 55 90 C 70 45 75 -20 48 -60 C 35 -90 -35 -90 -48 -60 Z"
                  fill="url(#hairGrad)"
                  stroke="#FF9FCB"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />

                {/* Head / Face Silhouette */}
                <path
                  d="M -22 -45 C -22 -15 0 8 0 8 C 0 8 22 -15 22 -45 C 22 -75 -22 -75 -22 -45 Z"
                  fill="#EEDAC5"
                  stroke="#E8C994"
                  strokeWidth="1"
                />

                {/* Delicate Gold Hoop Earring */}
                <circle cx="-23" cy="-30" r="6" fill="none" stroke="#E8C994" strokeWidth="1.5" />
                <circle cx="23" cy="-30" r="6" fill="none" stroke="#E8C994" strokeWidth="1.5" />

                {/* Gentle Smile Line */}
                <path d="M -7 -25 Q 0 -18 7 -25" fill="none" stroke="#FF3D91" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />

                {/* Elegant Warm Ivory Gown & Shoulders */}
                <path
                  d="M -58 45 C -30 25 30 25 58 45 L 80 120 L -80 120 Z"
                  fill="url(#gownGrad)"
                  stroke="#E8C994"
                  strokeWidth="1.2"
                />
                {/* Gown Neckline Detail */}
                <path d="M -25 45 Q 0 68 25 45" fill="none" stroke="#FF3D91" strokeWidth="1.2" opacity="0.7" />

                {/* Arms Holding Cake */}
                <path d="M -50 50 C -45 85 -20 95 -10 95" fill="none" stroke="#EEDAC5" strokeWidth="6" strokeLinecap="round" />
                <path d="M 50 50 C 45 85 20 95 10 95" fill="none" stroke="#EEDAC5" strokeWidth="6" strokeLinecap="round" />

                {/* Birthday Cake Pedestal & Cake */}
                <g transform="translate(0, 92)">
                  {/* Plate */}
                  <ellipse cx="0" cy="18" rx="42" ry="7" fill="#E8C994" opacity="0.9" />
                  
                  {/* Cake Base Tier */}
                  <path d="M -32 0 L -32 16 C -32 22 32 22 32 16 L 32 0 Z" fill="#F8F1E8" stroke="#E8C994" strokeWidth="1" />
                  <ellipse cx="0" cy="0" rx="32" ry="8" fill="#FAF5EE" stroke="#FF9FCB" strokeWidth="1" />

                  {/* Frosting Swirls */}
                  <path d="M -30 6 Q -20 12 -10 6 Q 0 12 10 6 Q 20 12 30 6" fill="none" stroke="#FF3D91" strokeWidth="1.8" />

                  {/* 19th Birthday Candles */}
                  <line x1="-8" y1="0" x2="-8" y2="-16" stroke="#E8C994" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="8" y1="0" x2="8" y2="-16" stroke="#E8C994" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Lit Candle Flames */}
                  {candlesLit && (
                    <g filter="url(#candleGlow)">
                      {/* Left Candle Flame */}
                      <path
                        d="M -8 -17 C -12 -23 -8 -29 -8 -29 C -8 -29 -4 -23 -8 -17 Z"
                        fill="#FF3D91"
                        className="animate-pulse"
                      />
                      <circle cx="-8" cy="-22" r="2.5" fill="#FFEAA7" />

                      {/* Right Candle Flame */}
                      <path
                        d="M 8 -17 C 4 -23 8 -29 8 -29 C 8 -29 12 -23 8 -17 Z"
                        fill="#FF3D91"
                        className="animate-pulse"
                      />
                      <circle cx="8" cy="-22" r="2.5" fill="#FFEAA7" />
                    </g>
                  )}

                  {/* Smoke Wisps if blown out */}
                  {!candlesLit && (
                    <g stroke="#E8C994" strokeWidth="0.8" fill="none" opacity="0.6">
                      <path d="M -8 -18 Q -14 -28 -7 -36 Q 0 -44 -6 -50" />
                      <path d="M 8 -18 Q 2 -28 9 -36 Q 16 -44 10 -50" />
                    </g>
                  )}
                </g>
              </g>

              {/* Surrounding Floating Stardust Sparks */}
              <circle cx="90" cy="110" r="2" fill="#FF9FCB" opacity="0.8" />
              <circle cx="310" cy="130" r="2.5" fill="#E8C994" opacity="0.9" />
              <circle cx="70" cy="270" r="1.8" fill="#BBA7FF" opacity="0.7" />
              <circle cx="330" cy="290" r="2.2" fill="#FFFFFF" opacity="0.8" />
            </svg>
          </div>
        </motion.div>

        {/* Narrative & Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mt-6 space-y-4 max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-pink/30 glass-panel-dark text-accent-rose text-xs font-mono tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-accent-pink" />
            <span>AKRITI SINGH • TURNING 19</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-accent-ivory leading-tight tracking-tight">
            A Magical Night Under Her Stars
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-accent-rose/90 leading-relaxed">
            {wishMade
              ? "Your 19th birthday wish has been entrusted to the constellation."
              : "Close your eyes, think of the one dream that makes your heart beat faster, and make your 19th year wish."}
          </p>

          {/* Interactive Wish / Blow Candles Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {candlesLit ? (
              <button
                onClick={handleBlowCandles}
                className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-pink via-rose-500 to-accent-pink text-white font-mono text-xs tracking-[0.25em] uppercase shadow-[0_0_25px_rgba(255,61,145,0.45)] hover:shadow-[0_0_40px_rgba(255,61,145,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5 overflow-hidden"
              >
                <Flame className="w-4 h-4 text-accent-ivory animate-bounce" />
                <span>Make a Wish & Blow Candles</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  soundEngine.playCardFlip();
                  onContinue();
                }}
                className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-gold via-amber-200 to-accent-gold text-universe-black font-mono text-xs tracking-[0.25em] font-semibold uppercase shadow-[0_0_30px_rgba(232,201,148,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5"
              >
                <span>Read Her Birthday Message</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-accent-rose/40 border-t border-accent-pink/15 pt-4"
      >
        <div>THE MAGICAL NIGHT // ACT II</div>
        <div>TOUCH OR HOVER TO EXPLORE DEPTH</div>
      </motion.div>
    </div>
  );
}
