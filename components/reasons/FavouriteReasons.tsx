"use client";

import React from "react";
import { Reason365, REASONS_365, CATEGORY_COLORS } from "@/data/reasons365";
import { Heart, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { gameAudio } from "@/lib/audio/gameAudio";

interface FavouriteReasonsProps {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectReason: (reason: Reason365) => void;
  onExploreAll: () => void;
}

export default function FavouriteReasons({
  favorites,
  onToggleFavorite,
  onSelectReason,
  onExploreAll,
}: FavouriteReasonsProps) {
  const favoriteItems = REASONS_365.filter((r) => favorites.includes(r.id));

  if (favoriteItems.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto py-16 px-6 text-center rounded-3xl bg-[#160B1E]/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FF3D91]/15 border border-[#FF3D91]/30 flex items-center justify-center text-[#FF69B4]">
          <Heart className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-2xl text-white">No Favourites Saved Yet</h3>
        <p className="font-serif italic text-white/70 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          As you explore the 365 reasons, tap the heart icon on any reason that touches your heart. They will all be gathered here in your private keepsake sanctuary.
        </p>
        <button
          onClick={onExploreAll}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F5A6CD]/25 to-[#C4A1D9]/25 hover:from-[#F5A6CD]/40 hover:to-[#C4A1D9]/40 border border-[#F5A6CD]/40 text-[#FFB6D9] text-xs font-mono tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(245,166,205,0.2)]"
        >
          Explore All 365 Reasons ➔
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="font-serif text-2xl text-white">Your Saved Collection</h3>
          <p className="text-xs font-mono text-white/50">
            {favoriteItems.length} cherished reason{favoriteItems.length === 1 ? "" : "s"} saved
          </p>
        </div>
        <button
          onClick={onExploreAll}
          className="text-xs font-mono text-[#F4E2C7] hover:underline"
        >
          Browse All 365 ➔
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {favoriteItems.map((item) => {
          const col = CATEGORY_COLORS[item.category] || {
            bg: "rgba(245, 166, 205, 0.12)",
            text: "#FFB6D9",
            border: "rgba(245, 166, 205, 0.35)",
            glow: "rgba(245, 166, 205, 0.4)",
          };

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => onSelectReason(item)}
              className="relative rounded-2xl p-6 bg-[#160B1E]/80 border border-[#FF3D91]/30 hover:border-[#FF3D91]/60 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(255,61,145,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: col.bg,
                      borderColor: col.border,
                      color: col.text,
                    }}
                  >
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#F4E2C7]/70">
                      #{item.number}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        gameAudio.playStarChime(400);
                        onToggleFavorite(item.id);
                      }}
                      title="Remove from Favourites"
                      className="p-1 rounded-full text-[#FF3D91] hover:text-white transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="py-4 space-y-2">
                  <h4 className="font-serif text-lg text-white font-medium leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-serif italic text-sm text-[#FFF5FA]/80 line-clamp-3 leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#FFB6D9]/70">
                <span>View Full</span>
                <span>➔</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
