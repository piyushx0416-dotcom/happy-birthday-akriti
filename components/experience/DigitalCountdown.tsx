"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/audio/soundtrack";
import { Sparkles, ArrowRight } from "lucide-react";

interface DigitalCountdownProps {
  onComplete: () => void;
  onSkip: () => void;
}

type Stage = "raining" | "count3" | "count2" | "count1" | "happy" | "birthday" | "akriti" | "transitioning";

export default function DigitalCountdown({ onComplete, onSkip }: DigitalCountdownProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stage, setStage] = useState<Stage>("count3");
  const animationFrameRef = useRef<number | null>(null);

  // Digital Rain Canvas Effect
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

    // Characters: Mix of sleek katakana, latin capitals, numbers, and celestial symbols
    const chars = "AKRITI19061102日月星光永愛美夢0123456789✦✧◈❦♥";
    const fontSize = Math.max(14, Math.floor(width / 80));
    const columns = Math.floor(width / fontSize);

    // Drops state: each column has y-position, speed, length, and base opacity
    interface ColumnStream {
      y: number;
      speed: number;
      length: number;
      opacity: number;
      chars: string[];
    }

    const streams: ColumnStream[] = [];
    for (let i = 0; i < columns; i++) {
      const len = Math.floor(Math.random() * 20) + 10;
      streams.push({
        y: Math.random() * -height,
        speed: 1.2 + Math.random() * 3.5,
        length: len,
        opacity: 0.35 + Math.random() * 0.65,
        chars: Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]),
      });
    }

    let lastDraw = 0;
    const render = (now: number) => {
      // Create trailing fading persistence
      ctx.fillStyle = "rgba(8, 8, 13, 0.16)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Space Mono', monospace`;

      streams.forEach((stream, col) => {
        const x = col * fontSize;

        for (let j = 0; j < stream.length; j++) {
          const charY = stream.y - j * fontSize;
          if (charY > 0 && charY < height) {
            // Randomly mutate character periodically
            if (Math.random() < 0.03) {
              stream.chars[j] = chars[Math.floor(Math.random() * chars.length)];
            }

            const char = stream.chars[j];

            if (j === 0) {
              // Leading head character: bright glowing white/pink
              ctx.shadowColor = "#FF3D91";
              ctx.shadowBlur = 14;
              ctx.fillStyle = "#FFFFFF";
            } else if (j < 4) {
              // Electric pink upper trail
              ctx.shadowColor = "#FF3D91";
              ctx.shadowBlur = 8;
              ctx.fillStyle = `rgba(255, 61, 145, ${stream.opacity})`;
            } else {
              // Soft rose/magenta fading trail
              ctx.shadowBlur = 0;
              const alpha = Math.max(0.05, stream.opacity * (1 - j / stream.length));
              ctx.fillStyle = `rgba(255, 159, 203, ${alpha})`;
            }

            ctx.fillText(char, x, charY);
          }
        }

        // Advance stream
        stream.y += stream.speed * fontSize * 0.6;
        if (stream.y - stream.length * fontSize > height) {
          stream.y = 0;
          stream.speed = 1.2 + Math.random() * 3.5;
        }
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Choreographed Cinematic Timeline
  useEffect(() => {
    // Sound on initial entry
    soundEngine.play();
    soundEngine.playChime(440);

    const t1 = setTimeout(() => {
      setStage("count2");
      soundEngine.playChime(554.37);
    }, 1400);

    const t2 = setTimeout(() => {
      setStage("count1");
      soundEngine.playChime(659.25);
    }, 2800);

    const t3 = setTimeout(() => {
      setStage("happy");
      soundEngine.playChime(880);
    }, 4200);

    const t4 = setTimeout(() => {
      setStage("birthday");
      soundEngine.playChime(987.77);
    }, 5600);

    const t5 = setTimeout(() => {
      setStage("akriti");
      soundEngine.playCelebrationChime();
    }, 7000);

    const t6 = setTimeout(() => {
      setStage("transitioning");
    }, 9800);

    const t7 = setTimeout(() => {
      onComplete();
    }, 10800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-universe-black flex items-center justify-center select-none">
      {/* Canvas Digital Rain */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* Radial Vignette & Glow */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-radial from-transparent via-universe-black/50 to-universe-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-pink/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Meta Bar & Skip Button */}
      <div className="absolute top-6 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent-pink animate-ping" />
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-accent-rose/70">
            SYSTEM // INITIALIZING HER UNIVERSE
          </span>
        </div>

        <button
          onClick={() => {
            soundEngine.playChime(880);
            onSkip();
          }}
          className="group flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-pink/25 glass-panel-subtle text-accent-ivory/70 hover:text-white hover:border-accent-pink transition-all text-xs font-mono tracking-widest uppercase"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Center Cinematic Stage Elements */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {stage === "count3" && (
            <motion.div
              key="3"
              initial={{ opacity: 0, scale: 0.6, filter: "blur(16px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.4, filter: "blur(20px)" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span className="font-serif text-[120px] sm:text-[180px] md:text-[220px] font-bold text-accent-ivory leading-none glow-pink-strong">
                3
              </span>
              <span className="font-mono text-xs tracking-[0.4em] uppercase text-accent-rose/70 mt-2">
                AWARENESS AWAKENING
              </span>
            </motion.div>
          )}

          {stage === "count2" && (
            <motion.div
              key="2"
              initial={{ opacity: 0, scale: 0.6, filter: "blur(16px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.4, filter: "blur(20px)" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span className="font-serif text-[120px] sm:text-[180px] md:text-[220px] font-bold text-accent-ivory leading-none glow-pink-strong">
                2
              </span>
              <span className="font-mono text-xs tracking-[0.4em] uppercase text-accent-rose/70 mt-2">
                ALIGNING CONSTELLATIONS
              </span>
            </motion.div>
          )}

          {stage === "count1" && (
            <motion.div
              key="1"
              initial={{ opacity: 0, scale: 0.6, filter: "blur(16px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.4, filter: "blur(20px)" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span className="font-serif text-[120px] sm:text-[180px] md:text-[220px] font-bold text-accent-ivory leading-none glow-pink-strong">
                1
              </span>
              <span className="font-mono text-xs tracking-[0.4em] uppercase text-accent-rose/70 mt-2">
                FOR AKRITI
              </span>
            </motion.div>
          )}

          {stage === "happy" && (
            <motion.div
              key="happy"
              initial={{ opacity: 0, y: 30, letterSpacing: "0.4em", filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.2em", filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-accent-ivory tracking-widest glow-pink">
                HAPPY
              </h2>
            </motion.div>
          )}

          {stage === "birthday" && (
            <motion.div
              key="birthday"
              initial={{ opacity: 0, y: 30, letterSpacing: "0.4em", filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.2em", filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-accent-pink tracking-widest glow-pink-strong">
                BIRTHDAY
              </h2>
            </motion.div>
          )}

          {stage === "akriti" && (
            <motion.div
              key="akriti"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 text-center"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-accent-pink/40 glass-panel-dark text-accent-rose text-xs font-mono tracking-[0.35em] uppercase shadow-[0_0_25px_rgba(255,61,145,0.3)]">
                <Sparkles className="w-3.5 h-3.5 text-accent-pink animate-spin-slow" />
                <span>NINETEEN YEARS OF BEAUTY</span>
              </div>

              <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-semibold text-editorial-gradient tracking-tight glow-pink-strong py-2">
                AKRITI
              </h1>

              <p className="font-serif italic text-base sm:text-xl text-accent-rose/90 tracking-wide max-w-lg mx-auto">
                “Every universe has a star. This one has you.”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Audio & Status Indicator */}
      <div className="absolute bottom-6 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between text-[11px] font-mono tracking-widest text-accent-rose/50">
        <div>CELESTIAL RAIN ENGINE // 60 FPS</div>
        <div>NOVEMBER 06 • AGE 19</div>
      </div>

      {/* Transitioning Overlay */}
      <AnimatePresence>
        {stage === "transitioning" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-40 bg-universe-black"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
