"use client";

import React, { useState } from "react";
import {
  AKRITI_CONSTELLATION_STARS,
  CONSTELLATION_CONNECTIONS,
  ConstellationStar
} from "@/lib/data/constellation";
import { Sparkles, Star, Compass, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConstellationMap() {
  const [selectedStar, setSelectedStar] = useState<ConstellationStar>(
    AKRITI_CONSTELLATION_STARS[0]
  );
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);

  // Helper to find star coordinates
  const getStarCoords = (id: string) => {
    const star = AKRITI_CONSTELLATION_STARS.find((s) => s.id === id);
    return star ? { x: star.xPercent, y: star.yPercent } : { x: 50, y: 50 };
  };

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Star Map Canvas */}
        <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden glass-panel border border-gold-metallic/30 p-4 shadow-2xl bg-obsidian-950/80">
          {/* Map Compass Header */}
          <div className="absolute top-4 left-6 z-10 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-metallic/80">
            <Compass className="w-4 h-4 text-gold-metallic animate-spin-slow" />
            <span>Sector: AKRITI-19 • Coordinates: 06°11′2026″</span>
          </div>

          <div className="absolute top-4 right-6 z-10 text-[11px] tracking-wider text-ivory-warm/40 hidden sm:block">
            TOUCH ANY STAR TO UNVEIL ITS LORE
          </div>

          {/* SVG Constellation Chart */}
          <svg className="w-full h-full relative z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="starlightLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.6" />
                <stop offset="50%" stop-color="#f5e7c8" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#d4af37" stop-opacity="0.6" />
              </linearGradient>
              <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Constellation Connection Lines */}
            {CONSTELLATION_CONNECTIONS.map((conn, idx) => {
              const from = getStarCoords(conn.from);
              const to = getStarCoords(conn.to);
              const isHighlighted =
                selectedStar.id === conn.from ||
                selectedStar.id === conn.to ||
                hoveredStarId === conn.from ||
                hoveredStarId === conn.to;

              return (
                <line
                  key={`line-${idx}`}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={isHighlighted ? "url(#starlightLine)" : "rgba(212, 175, 55, 0.2)"}
                  strokeWidth={isHighlighted ? 0.75 : 0.35}
                  strokeDasharray={isHighlighted ? "none" : "1 1"}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Render Constellation Stars */}
            {AKRITI_CONSTELLATION_STARS.map((star) => {
              const isSelected = selectedStar.id === star.id;
              const isHovered = hoveredStarId === star.id;
              const radius = Math.max(1.5, 4.5 - star.magnitude * 0.8);

              return (
                <g
                  key={star.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedStar(star)}
                  onMouseEnter={() => setHoveredStarId(star.id)}
                  onMouseLeave={() => setHoveredStarId(null)}
                >
                  {/* Outer pulse aura */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={`${star.xPercent}%`}
                      cy={`${star.yPercent}%`}
                      r={radius * 3.5}
                      fill="none"
                      stroke={star.color}
                      strokeWidth="0.4"
                      strokeDasharray="1 1"
                      className="animate-spin-slow opacity-60"
                    />
                  )}

                  {/* Halo */}
                  <circle
                    cx={`${star.xPercent}%`}
                    cy={`${star.yPercent}%`}
                    r={radius * 1.8}
                    fill={star.color}
                    opacity={isSelected ? 0.4 : 0.2}
                    filter="url(#starGlow)"
                  />

                  {/* Core Star */}
                  <circle
                    cx={`${star.xPercent}%`}
                    cy={`${star.yPercent}%`}
                    r={radius}
                    fill={star.color}
                    className="transition-all duration-200"
                  />

                  {/* Star Name Label */}
                  <text
                    x={`${star.xPercent}%`}
                    y={`${star.yPercent + 4.5}%`}
                    textAnchor="middle"
                    fill={isSelected ? "#f5e7c8" : "rgba(253, 251, 247, 0.65)"}
                    fontSize="2.4"
                    fontFamily="serif"
                    className="tracking-wider select-none font-medium"
                  >
                    {star.name.replace("The Star of ", "")}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Bottom Star Map Legend */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-ivory-warm/50 border-t border-gold-metallic/15 pt-2">
            <span>Spectral Class: O-Type Gold & Violet Supergiants</span>
            <span>Epoch: November 6, 2026</span>
          </div>
        </div>

        {/* Selected Star Details Panel */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStar.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-metallic/40 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Star className="w-32 h-32 text-gold-metallic" />
              </div>

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-glow mb-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
                <span>{selectedStar.latinName}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-gold-champagne font-bold mb-1">
                {selectedStar.name}
              </h3>

              <div className="inline-block px-3 py-1 rounded-full bg-midnight-800 border border-gold-metallic/30 text-xs text-ivory-warm/90 font-medium mb-6">
                Virtue: {selectedStar.quality}
              </div>

              <div className="space-y-4 text-sm text-ivory-warm/80 leading-relaxed font-sans mb-6">
                <p>{selectedStar.lore}</p>
              </div>

              {/* Curated Accent Quote */}
              <div className="p-4 rounded-2xl bg-midnight-900/60 border-l-2 border-gold-metallic text-xs sm:text-sm italic font-serif text-gold-champagne/90 leading-relaxed">
                {selectedStar.quote}
              </div>

              <div className="mt-6 pt-4 border-t border-gold-metallic/15 flex items-center justify-between text-xs text-ivory-warm/50">
                <span>Brightness Magnitude: {selectedStar.magnitude}</span>
                <span>Constellation Akriti</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
