"use client";

import React, { useState, useMemo } from "react";
import { Reason365, REASONS_365, REASON_CATEGORIES, ReasonCategory, CATEGORY_COLORS } from "@/data/reasons365";
import { Search, Heart, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gameAudio } from "@/lib/audio/gameAudio";

interface ReasonsArchiveProps {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onDiscover: (id: number) => void;
  onSelectReason?: (reason: Reason365) => void;
}

export default function ReasonsArchive({
  favorites,
  onToggleFavorite,
  onDiscover,
  onSelectReason,
}: ReasonsArchiveProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ReasonCategory | "All">("All");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [jumpNumber, setJumpNumber] = useState("");
  const [selectedModalReason, setSelectedModalReason] = useState<Reason365 | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;

  // Filtered dataset
  const filteredReasons = useMemo(() => {
    return REASONS_365.filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      if (showOnlyFavorites && !favorites.includes(item.id)) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesNumber = item.number.toString() === q;
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesText = item.text.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        return matchesNumber || matchesTitle || matchesText || matchesCategory;
      }
      return true;
    });
  }, [selectedCategory, showOnlyFavorites, favorites, searchQuery]);

  const totalPages = Math.ceil(filteredReasons.length / pageSize) || 1;
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReasons.slice(start, start + pageSize);
  }, [filteredReasons, currentPage, pageSize]);

  const handleCardClick = (item: Reason365) => {
    gameAudio.playStarChime(750);
    onDiscover(item.id);
    setSelectedModalReason(item);
    if (onSelectReason) onSelectReason(item);
  };

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpNumber, 10);
    if (num >= 1 && num <= 365) {
      const target = REASONS_365.find((r) => r.number === num);
      if (target) {
        handleCardClick(target);
        setJumpNumber("");
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="rounded-3xl p-5 md:p-6 bg-[#160B1A]/80 border border-white/10 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search reasons, words, or #number..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#F5A6CD]/60 focus:bg-white/10 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <form onSubmit={handleJump} className="flex items-center gap-2">
              <span className="text-xs font-mono text-white/50">Jump to #</span>
              <input
                type="number"
                min="1"
                max="365"
                placeholder="1-365"
                value={jumpNumber}
                onChange={(e) => setJumpNumber(e.target.value)}
                className="w-20 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-center text-white focus:outline-none focus:border-[#F5A6CD]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-[#F5A6CD]/20 text-[#FFB6D9] text-xs font-mono transition-all"
              >
                Go
              </button>
            </form>

            <button
              onClick={() => {
                setShowOnlyFavorites((prev) => !prev);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-mono tracking-wider transition-all ${
                showOnlyFavorites
                  ? "bg-[#FF3D91]/25 border-[#FF3D91] text-[#FFB6D9] shadow-[0_0_15px_rgba(255,61,145,0.3)]"
                  : "bg-white/5 border-white/15 text-white/70 hover:border-white/30"
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  showOnlyFavorites ? "fill-[#FF3D91] text-[#FF3D91]" : ""
                }`}
              />
              <span>Favourites ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/10">
          <button
            onClick={() => {
              setSelectedCategory("All");
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all border ${
              selectedCategory === "All"
                ? "bg-[#F5A6CD]/25 border-[#F5A6CD] text-white shadow-[0_0_12px_rgba(245,166,205,0.3)]"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/25"
            }`}
          >
            All Categories (365)
          </button>

          {REASON_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const style = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all border`}
                style={{
                  backgroundColor: isSelected ? style.bg : "rgba(255,255,255,0.03)",
                  borderColor: isSelected ? style.border : "rgba(255,255,255,0.1)",
                  color: isSelected ? style.text : "rgba(255,255,255,0.6)",
                  boxShadow: isSelected ? `0 0 15px ${style.glow}` : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Reasons Cards */}
      {filteredReasons.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <p className="font-serif text-xl text-white/80">No reasons found</p>
          <p className="text-xs font-mono text-white/40">
            Try adjusting your search query or removing filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentItems.map((item) => {
            const isFav = favorites.includes(item.id);
            const col = CATEGORY_COLORS[item.category] || {
              bg: "rgba(245, 166, 205, 0.12)",
              text: "#FFB6D9",
              border: "rgba(245, 166, 205, 0.35)",
              glow: "rgba(245, 166, 205, 0.4)",
            };

            return (
              <motion.div
                key={item.id}
                layoutId={`card-${item.id}`}
                onClick={() => handleCardClick(item)}
                className="group relative rounded-2xl p-6 bg-[#160B1E]/60 border border-white/10 hover:border-[#F5A6CD]/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
                style={{
                  boxShadow: isFav ? `0 0 20px ${col.glow}20` : undefined,
                }}
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
                      <span className="text-xs font-mono text-[#F4E2C7]/60">
                        #{item.number}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          gameAudio.playStarChime(950);
                          onToggleFavorite(item.id);
                        }}
                        className={`p-1.5 rounded-full transition-transform active:scale-75 ${
                          isFav ? "text-[#FF3D91]" : "text-white/30 hover:text-white/80"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>

                  <div className="py-4 space-y-2">
                    <h4 className="font-serif text-lg text-white/90 group-hover:text-[#FFB6D9] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="font-serif italic text-sm text-white/70 line-clamp-3 leading-relaxed">
                      "{item.text}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40 group-hover:text-[#F4E2C7]/80 transition-colors">
                  <span>Read full reason</span>
                  <span>➔</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6">
          <button
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full border text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all ${
              currentPage === 1
                ? "border-white/5 text-white/20 cursor-not-allowed"
                : "border-white/15 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <span className="text-xs font-mono text-white/60 px-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full border text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all ${
              currentPage === totalPages
                ? "border-white/5 text-white/20 cursor-not-allowed"
                : "border-white/15 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedModalReason && (
          <div
            onClick={() => setSelectedModalReason(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl p-8 md:p-10 bg-[#160B1E] border border-[#F5A6CD]/30 shadow-[0_25px_80px_rgba(0,0,0,0.9)] space-y-6"
            >
              <button
                onClick={() => setSelectedModalReason(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white/70 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[selectedModalReason.category]?.bg,
                    borderColor:
                      CATEGORY_COLORS[selectedModalReason.category]?.border,
                    color:
                      CATEGORY_COLORS[selectedModalReason.category]?.text,
                  }}
                >
                  {selectedModalReason.category}
                </span>
                <span className="text-xs font-mono text-[#F4E2C7]/70">
                  Reason #{selectedModalReason.number} of 365
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-snug">
                  {selectedModalReason.title}
                </h3>
                <p className="font-serif italic text-lg md:text-xl text-[#FFF5FA]/90 leading-relaxed pl-2 border-l-2 border-[#FFB6D9]/40">
                  "{selectedModalReason.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    gameAudio.playStarChime(950);
                    onToggleFavorite(selectedModalReason.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono transition-all ${
                    favorites.includes(selectedModalReason.id)
                      ? "border-[#FF3D91] bg-[#FF3D91]/20 text-[#FFB6D9]"
                      : "border-white/15 bg-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(selectedModalReason.id)
                        ? "fill-current"
                        : ""
                    }`}
                  />
                  <span>
                    {favorites.includes(selectedModalReason.id)
                      ? "Saved in Favourites"
                      : "Save to Favourites"}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedModalReason(null)}
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wider transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
