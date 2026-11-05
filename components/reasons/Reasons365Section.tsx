"use client";

import React, { useState, useEffect } from "react";
import { REASONS_365, Reason365 } from "@/data/reasons365";
import ReasonReveal from "./ReasonReveal";
import ReasonsArchive from "./ReasonsArchive";
import FavouriteReasons from "./FavouriteReasons";
import { Sparkles, Grid, Heart, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gameAudio } from "@/lib/audio/gameAudio";

interface Reasons365SectionProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function Reasons365Section({ onBack, onNext }: Reasons365SectionProps) {
  const [activeTab, setActiveTab] = useState<"card" | "archive" | "favorites">("card");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [discoveredIds, setDiscoveredIds] = useState<number[]>([]);
  const [selectedReasonId, setSelectedReasonId] = useState<number>(1);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("akriti_365_favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedDisc = localStorage.getItem("akriti_365_discovered");
      if (savedDisc) setDiscoveredIds(JSON.parse(savedDisc));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("akriti_365_favorites", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleDiscover = (id: number) => {
    setDiscoveredIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem("akriti_365_discovered", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSelectFromArchive = (reason: Reason365) => {
    setSelectedReasonId(reason.id);
    setActiveTab("card");
    gameAudio.playStarChime(750);
  };

  const discoveredPercentage = Math.round((discoveredIds.length / REASONS_365.length) * 100);

  return (
    <section className="relative w-full min-h-screen bg-[#08080D] text-[#F8F1E8] py-16 px-4 sm:px-6 lg:px-8 select-none">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF3D91]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-[#9333EA]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs tracking-[0.25em] uppercase text-[#FF69B4]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3D91]" />
            <span>Chapter II &bull; 365 Reasons Why I Love You</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Every Day With You Is A Gift
          </h2>
          <p className="font-serif italic text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Written exclusively for Akriti Singh on her 19th Birthday. 365 reasons — one for every single sunrise and sunset of the year.
          </p>

          {/* Discovery Progress Bar */}
          <div className="max-w-xs mx-auto pt-2">
            <div className="flex justify-between text-xs text-white/50 mb-1.5 font-mono">
              <span>{discoveredIds.length} / 365 Discovered</span>
              <span>{discoveredPercentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF3D91] to-[#FF80BF]"
                initial={{ width: 0 }}
                animate={{ width: `${discoveredPercentage}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => {
                setActiveTab("card");
                gameAudio.playRingTurn();
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "card"
                  ? "bg-gradient-to-r from-[#FF3D91] to-[#D91A6C] text-white shadow-lg shadow-[#FF3D91]/25"
                  : "text-white/70 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Card View</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("archive");
                gameAudio.playRingTurn();
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "archive"
                  ? "bg-gradient-to-r from-[#FF3D91] to-[#D91A6C] text-white shadow-lg shadow-[#FF3D91]/25"
                  : "text-white/70 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>All 365 Archive</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("favorites");
                gameAudio.playRingTurn();
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "favorites"
                  ? "bg-gradient-to-r from-[#FF3D91] to-[#D91A6C] text-white shadow-lg shadow-[#FF3D91]/25"
                  : "text-white/70 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? "fill-current text-[#FF3D91]" : ""}`} />
              <span>Favourites ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "card" && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <ReasonReveal
                initialReasonId={selectedReasonId}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onDiscover={handleDiscover}
                onOpenArchive={() => setActiveTab("archive")}
              />
            </motion.div>
          )}

          {activeTab === "archive" && (
            <motion.div
              key="archive"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <ReasonsArchive
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onDiscover={handleDiscover}
                onSelectReason={handleSelectFromArchive}
              />
            </motion.div>
          )}

          {activeTab === "favorites" && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <FavouriteReasons
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectReason={handleSelectFromArchive}
                onExploreAll={() => setActiveTab("archive")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Navigation Footer */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          

          {onNext && (
            <button
              onClick={() => {
                gameAudio.playStarChime(880);
                onNext();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF3D91] to-[#D91A6C] hover:from-[#ff549f] hover:to-[#eb287b] text-white text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-lg shadow-[#FF3D91]/30 hover:scale-105 active:scale-95 transition-all ml-auto"
            >
              <span>Chapter III: The Starlight Quest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
