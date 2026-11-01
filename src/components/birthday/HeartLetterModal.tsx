"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";
import { BIRTHDAY_DATA } from "@/data/birthday";
import { useSound } from "@/hooks/useSound";

interface HeartLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeartLetterModal({ isOpen, onClose }: HeartLetterModalProps) {
  const { playClick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const letter = BIRTHDAY_DATA.mainCelebrationLetter;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-midnight/95 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-2.5 rounded-full glass-pill border border-gold/30 text-ivory hover:text-gold transition-colors cursor-pointer"
          aria-label="Close Letter"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full my-8 p-8 sm:p-12 md:p-16 rounded-2xl bg-[#FBF7EE] text-[#1E1828] shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-[#E6DBCE] overflow-hidden select-text"
        >
          {/* Header */}
          <div className="border-b border-[#E3D7C5] pb-6 mb-8 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#9E82D1] uppercase font-semibold">
                NINETEENTH BIRTHDAY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171126] mt-1 font-normal">
                {letter.title}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-gold/15">
              <Heart className="w-5 h-5 text-gold-dark fill-gold-dark" />
            </div>
          </div>

          {/* Letter Body */}
          <div className="space-y-5 text-sm sm:text-base font-serif text-[#2B2338] leading-relaxed">
            {letter.paragraphs.map((p, idx) => (
              <p key={idx} className="first-letter:text-2xl first-letter:font-normal first-letter:text-[#A38A52]">
                {p}
              </p>
            ))}
          </div>

          {/* Signoff */}
          <div className="mt-10 pt-6 border-t border-[#E3D7C5] flex flex-col items-start">
            <p className="text-xs sm:text-sm font-sans text-[#6B5E78] italic">
              {letter.signoff}
            </p>
            <p className="font-script text-2xl sm:text-3xl text-[#171126] mt-2">
              {letter.author}
            </p>
          </div>

          {/* Close button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                playClick(880);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full text-xs font-sans tracking-widest uppercase bg-[#171126] text-[#FBF7EE] hover:bg-[#30204D] transition-colors cursor-pointer"
            >
              Close & Treasure Forever
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
