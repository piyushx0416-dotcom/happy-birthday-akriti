"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { backgroundMusic } from "@/lib/audio/soundtrack";

export default function SoundtrackController() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Initialize audio engine as soon as component mounts
    backgroundMusic.init();
    return backgroundMusic.subscribe(setIsPlaying);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-auto select-none">
      <button
        onClick={() => backgroundMusic.toggle()}
        title={isPlaying ? "Mute soundtrack" : "Play soundtrack"}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase backdrop-blur-md border transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
          isPlaying
            ? "bg-black/40 border-white/10 text-white/60 hover:text-white/90 hover:bg-black/60"
            : "bg-[#1E0B24]/90 border-[#FF3D91]/50 text-[#FFB6D9] animate-pulse shadow-[0_0_20px_rgba(255,61,145,0.35)]"
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-white/50">Playing ♫</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#FF3D91]" />
            <span>Enable Sound ♫</span>
          </>
        )}
      </button>
    </div>
  );
}
