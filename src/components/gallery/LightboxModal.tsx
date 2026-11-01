"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { MemoryItem } from "@/types";
import { useSound } from "@/hooks/useSound";

interface LightboxModalProps {
  item: MemoryItem | null;
  items: MemoryItem[];
  onClose: () => void;
  onSelect: (item: MemoryItem) => void;
}

export function LightboxModal({
  item,
  items,
  onClose,
  onSelect,
}: LightboxModalProps) {
  const { playClick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    playClick(880);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIndex]);
  };

  const handleNext = () => {
    playClick(920);
    const nextIndex = (currentIndex + 1) % items.length;
    onSelect(items[nextIndex]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-midnight/95 backdrop-blur-2xl"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2.5 rounded-full glass-pill border border-gold/30 text-ivory hover:text-gold transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 sm:left-8 z-50 p-3 rounded-full glass-pill border border-gold/30 text-ivory hover:text-gold hover:scale-110 transition-all cursor-pointer hidden sm:flex"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 sm:right-8 z-50 p-3 rounded-full glass-pill border border-gold/30 text-ivory hover:text-gold hover:scale-110 transition-all cursor-pointer hidden sm:flex"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Modal Content Frame */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center glass-card rounded-2xl border border-gold/30 overflow-hidden shadow-2xl"
        >
          <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black/40">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>

          {/* Caption Box */}
          <div className="w-full p-6 bg-purple-deep/70 border-t border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-sans tracking-widest text-gold uppercase px-2.5 py-0.5 rounded-full border border-gold/30 bg-purple-deep">
                  {item.category}
                </span>
                {item.date && (
                  <span className="flex items-center gap-1 text-[11px] font-sans text-ivory/60">
                    <Calendar className="w-3 h-3 text-gold/70" />
                    {item.date}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl text-ivory">{item.title}</h3>
              <p className="font-sans text-sm text-ivory/70 mt-1 font-light">
                {item.caption}
              </p>
            </div>

            <span className="text-xs font-mono text-gold/60 shrink-0">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
