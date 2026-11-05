"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DigitalCountdown from "@/components/experience/DigitalCountdown";
import MagicalNight from "@/components/experience/MagicalNight";
import BirthdayMessage from "@/components/experience/BirthdayMessage";
import PhotographExperience from "@/components/experience/PhotographExperience";
import BirthdayLetter from "@/components/experience/BirthdayLetter";
import HerQualities from "@/components/experience/HerQualities";
import HeartCollageFinale from "@/components/experience/HeartCollageFinale";
import { soundEngine } from "@/lib/audio/soundtrack";
import { Volume2, VolumeX, Maximize, Sparkles, Compass } from "lucide-react";
import Link from "next/link";

export type ExperienceScene = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const sceneMeta = [
  { id: 1, title: "01 • DIGITAL RAIN", label: "Countdown" },
  { id: 2, title: "02 • MAGICAL NIGHT", label: "Midnight Sky" },
  { id: 3, title: "03 • THE MESSAGE", label: "Birthday Card" },
  { id: 4, title: "04 • PHOTOGRAPHS", label: "Gallery" },
  { id: 5, title: "05 • THE LETTER", label: "Stationery" },
  { id: 6, title: "06 • HER QUALITIES", label: "Pillars" },
  { id: 7, title: "07 • HEART FINALE", label: "Grand Finale" },
];

export default function ExperienceEngine() {
  const [currentScene, setCurrentScene] = useState<ExperienceScene>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  // Audio mute toggle
  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const goToScene = (scene: ExperienceScene) => {
    soundEngine.playCardFlip();
    setCurrentScene(scene);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-universe-black text-accent-ivory overflow-hidden">
      {/* Active Experience Scene with Smooth Fade Transition */}
      <AnimatePresence mode="wait">
        {currentScene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <DigitalCountdown
              onComplete={() => setCurrentScene(2)}
              onSkip={() => setCurrentScene(2)}
            />
          </motion.div>
        )}

        {currentScene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <MagicalNight onContinue={() => setCurrentScene(3)} />
          </motion.div>
        )}

        {currentScene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <BirthdayMessage onContinue={() => setCurrentScene(4)} />
          </motion.div>
        )}

        {currentScene === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <PhotographExperience onContinue={() => setCurrentScene(5)} />
          </motion.div>
        )}

        {currentScene === 5 && (
          <motion.div
            key="scene-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <BirthdayLetter onContinue={() => setCurrentScene(6)} />
          </motion.div>
        )}

        {currentScene === 6 && (
          <motion.div
            key="scene-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <HerQualities onContinue={() => setCurrentScene(7)} />
          </motion.div>
        )}

        {currentScene === 7 && (
          <motion.div
            key="scene-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <HeartCollageFinale onReplayAll={() => setCurrentScene(1)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          PERSISTENT FLOATING CINEMATIC DOCK CONTROLLER
          ======================================================== */}
      {currentScene > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full border border-accent-pink/30 glass-panel-dark shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center gap-2 sm:gap-4 max-w-[95vw]"
        >
          {/* Chapter Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {sceneMeta.map((s) => {
              const isActive = s.id === currentScene;
              return (
                <button
                  key={s.id}
                  onClick={() => goToScene(s.id as ExperienceScene)}
                  className={`group relative transition-all ${
                    isActive
                      ? "w-7 sm:w-8 h-2.5 rounded-full bg-accent-pink shadow-[0_0_10px_#FF3D91]"
                      : "w-2.5 h-2.5 rounded-full bg-accent-ivory/30 hover:bg-accent-rose"
                  }`}
                  aria-label={s.title}
                >
                  {/* Tooltip on hover */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-universe-charcoal border border-accent-pink/30 text-[10px] font-mono whitespace-nowrap text-accent-rose opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-[1px] h-4 bg-accent-pink/25 hidden sm:block" />

          {/* Audio Mute Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-full text-accent-rose hover:text-white transition-colors"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent-pink animate-pulse" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-full text-accent-rose hover:text-white transition-colors hidden sm:block"
            aria-label="Toggle fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>

          {/* Deep link to 3D Universe Exploration */}
          <Link
            href="/universe"
            className="px-3 py-1 rounded-full bg-accent-pink/20 border border-accent-pink/40 text-accent-rose hover:text-white hover:bg-accent-pink transition-all text-[10px] font-mono tracking-wider uppercase flex items-center gap-1.5 hidden md:flex"
          >
            <Compass className="w-3 h-3" />
            <span>3D World</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
