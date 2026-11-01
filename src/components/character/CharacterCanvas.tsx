"use client";

import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CharacterScene3D } from "./CharacterScene3D";
import { Sparkles, Image as ImageIcon, Box, RotateCcw } from "lucide-react";

export function CharacterCanvas() {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"3d" | "portrait">("3d");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Detect WebGL capability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[460px] sm:min-h-[580px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          <span className="text-xs font-sans tracking-widest text-gold/70">
            MATERIALIZING UNIVERSE...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] sm:h-[640px] lg:h-[720px] flex items-center justify-center select-none overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-b from-purple-deep/40 via-midnight to-midnight/90 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
      {/* Background Starlight Aura */}
      <div className="absolute inset-0 bg-cosmic-glow pointer-events-none" />
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-purple-royal/30 blur-[90px] pointer-events-none" />

      {/* Mode Switcher Pill */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-full glass-pill border border-gold/30 text-xs font-sans tracking-wider">
        <button
          onClick={() => setViewMode("3d")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
            viewMode === "3d"
              ? "bg-gold text-midnight font-medium shadow-md"
              : "text-ivory/70 hover:text-ivory"
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>3D Avatar</span>
        </button>
        <button
          onClick={() => setViewMode("portrait")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
            viewMode === "portrait"
              ? "bg-gold text-midnight font-medium shadow-md"
              : "text-ivory/70 hover:text-ivory"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Portrait</span>
        </button>
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 text-[11px] font-sans tracking-widest text-gold/70 px-3 py-1.5 rounded-full glass-pill border border-gold/15">
        <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
        <span>DRAG TO ROTATE UNIVERSE</span>
      </div>

      {/* Content Display: 3D Scene OR Photographic Masterpiece */}
      {viewMode === "3d" && hasWebGL ? (
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 1.2, 4.8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <CharacterScene3D />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
                rotateSpeed={0.6}
                dampingFactor={0.05}
              />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        /* Portrait / 2D Fallback Mode */
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="relative group max-w-sm sm:max-w-md w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gold/30 shadow-[0_0_50px_rgba(214,189,139,0.25)] transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/assets/akriti/reference/akriti-reference-01.jpg"
              alt="Akriti Singh — The Main Character"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 450px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 inset-x-6 text-left">
              <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-gold">
                THE MAIN CHARACTER
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
                Akriti Singh
              </h3>
              <p className="font-script text-lg text-lavender/90">
                A universe where she is the main character.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Developer Replacement Path Guidance (Discrete & Elegant) */}
      <div className="absolute bottom-4 right-4 z-20 text-[9px] font-mono tracking-wider text-ivory/30 hover:text-ivory/70 transition-colors hidden lg:block">
        Custom model path: public/assets/models/her-character.glb
      </div>
    </div>
  );
}
