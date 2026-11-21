"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Lenis from "lenis";
import IglooScene from "./IglooScene";
import IglooHUD from "./IglooHUD";
import { backgroundMusic } from "@/lib/audio/soundtrack";

export default function IglooUniverseExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const [activeMorphIndex, setActiveMorphIndex] = useState<number>(0);
  const [memoryPositions, setMemoryPositions] = useState<
    Array<{ id: number; x: number; y: number; visible: boolean }>
  >([]);

  const lenisRef = useRef<Lenis | null>(null);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(performance.now());

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let animId: number;
    const raf = (time: number) => {
      lenis.raf(time);

      // Compute scroll progress & velocity
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const currentProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        setScrollProgress(currentProgress);

        const now = performance.now();
        const dt = (now - lastTimestamp.current) / 1000;
        if (dt > 0.01) {
          const dy = Math.abs(window.scrollY - lastScrollY.current);
          const vel = dy / dt / 1000; // Normalized velocity
          setScrollVelocity((prev) => prev * 0.8 + vel * 0.2);
          lastScrollY.current = window.scrollY;
          lastTimestamp.current = now;
        }
      }

      animId = requestAnimationFrame(raf);
    };

    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // Initialize Audio with first user interaction
  const initAudio = useCallback(() => {
    backgroundMusic.init();
    backgroundMusic.play();
    setIsPlayingAudio(true);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("wheel", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("wheel", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("wheel", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [initAudio]);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      backgroundMusic.pause();
      setIsPlayingAudio(false);
    } else {
      backgroundMusic.play();
      setIsPlayingAudio(true);
    }
  };

  const jumpToProgress = (target: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (lenisRef.current && maxScroll > 0) {
      lenisRef.current.scrollTo(target * maxScroll, { duration: 1.5 });
    }
  };

  return (
    <div className="relative w-full bg-[#06070a] text-white overflow-x-hidden min-h-[700vh]">
      {/* Three.js Full-Viewport WebGL Scene */}
      <IglooScene
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
        onSelectMemory={setSelectedMemory}
        selectedMemory={selectedMemory}
        activeMorphIndex={activeMorphIndex}
        onUpdateScreenPositions={setMemoryPositions}
      />

      {/* Cybernetic HUD & Telemetry Interface Layer */}
      <IglooHUD
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={toggleAudio}
        onJumpToProgress={jumpToProgress}
        memoryPositions={memoryPositions}
        selectedMemory={selectedMemory}
        onSelectMemory={setSelectedMemory}
        activeMorphIndex={activeMorphIndex}
        onChangeMorph={setActiveMorphIndex}
      />
    </div>
  );
}
