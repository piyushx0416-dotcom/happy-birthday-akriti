"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface InteractiveCakeProps {
  isBlownOut: boolean;
}

export function InteractiveCake({ isBlownOut }: InteractiveCakeProps) {
  // Generate 19 candles distributed in an elegant oval atop the cake tier
  const candles = useMemo(() => {
    return Array.from({ length: 19 }, (_, i) => {
      // 2 rings: 7 inner, 12 outer
      if (i < 7) {
        const angle = (i / 7) * Math.PI * 2;
        const rx = 45;
        const ry = 18;
        return {
          id: i,
          x: Math.cos(angle) * rx,
          y: Math.sin(angle) * ry,
          delay: (i * 0.08) % 0.5,
        };
      } else {
        const angle = ((i - 7) / 12) * Math.PI * 2;
        const rx = 85;
        const ry = 30;
        return {
          id: i,
          x: Math.cos(angle) * rx,
          y: Math.sin(angle) * ry,
          delay: (i * 0.06) % 0.6,
        };
      }
    });
  }, []);

  return (
    <div className="relative w-80 sm:w-96 h-80 flex items-center justify-center select-none my-6">
      {/* Golden Plate / Stand */}
      <div className="absolute bottom-6 w-72 sm:w-84 h-12 rounded-[50%] bg-gradient-to-r from-gold/40 via-gold to-gold/40 border-2 border-gold/70 shadow-[0_15px_40px_rgba(214,189,139,0.3)]" />

      {/* Cake Bottom Tier */}
      <div className="absolute bottom-12 w-64 sm:w-72 h-24 rounded-[50%/20px] bg-gradient-to-b from-[#2B1D40] via-[#1D142D] to-[#120B1E] border border-gold/40 shadow-2xl flex flex-col items-center justify-center">
        {/* Ivory Frosting Drips */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-ivory/80 via-ivory to-ivory/80 rounded-t-[50%/10px] shadow-sm" />
        <span className="font-serif text-xs tracking-[0.25em] text-gold uppercase mt-2">
          AKRITI • NINETEEN
        </span>
      </div>

      {/* Cake Top Tier */}
      <div className="absolute bottom-28 w-48 sm:w-56 h-20 rounded-[50%/18px] bg-gradient-to-b from-[#3D285B] via-[#2A1B3F] to-[#1D122D] border border-gold/50 shadow-xl flex items-center justify-center">
        {/* Frosting Piping */}
        <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r from-ivory via-[#FFF7E8] to-ivory rounded-t-[50%/10px]" />
      </div>

      {/* Top Surface where 19 Candles Stand */}
      <div className="absolute bottom-44 w-48 sm:w-56 h-16 flex items-center justify-center">
        {candles.map((candle) => (
          <div
            key={candle.id}
            className="absolute flex flex-col items-center"
            style={{
              transform: `translate(${candle.x}px, ${candle.y}px)`,
            }}
          >
            {/* Candle Flame with realistic flicker */}
            {!isBlownOut ? (
              <motion.div
                animate={{
                  scaleY: [1, 1.25, 0.9, 1.15, 1],
                  scaleX: [1, 0.85, 1.1, 0.95, 1],
                  opacity: [0.9, 1, 0.85, 1, 0.9],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8 + candle.delay,
                  ease: "easeInOut",
                }}
                className="w-2.5 h-4 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(255,180,50,0.95)]"
              />
            ) : (
              /* Wisps of smoke when blown out */
              <motion.div
                initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -20, scale: 1.5 }}
                transition={{ duration: 1.2, delay: candle.delay * 0.4 }}
                className="w-1.5 h-3 rounded-full bg-ivory/50 blur-[1px]"
              />
            )}

            {/* Candle Wick */}
            <div className="w-[1.5px] h-1.5 bg-[#4A3B32]" />

            {/* Candle Stick (Ivory with Gold Spiral) */}
            <div className="w-1.5 h-7 rounded-sm bg-gradient-to-b from-ivory to-gold-light border-[0.5px] border-gold/40 shadow-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
