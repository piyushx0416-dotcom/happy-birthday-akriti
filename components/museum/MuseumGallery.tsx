"use client";

import React, { useState } from "react";
import { MUSEUM_COLLECTIONS, MuseumCollection, MuseumExhibit } from "@/lib/data/museum";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ZoomIn, X, Sparkles, Calendar, Layers, Info } from "lucide-react";
import Image from "next/image";

export default function MuseumGallery() {
  const [activeCollectionId, setActiveCollectionId] = useState<string>("beginning");
  const [selectedExhibit, setSelectedExhibit] = useState<MuseumExhibit | null>(null);
  const [viewMode, setViewMode] = useState<"gallery" | "timeline">("gallery");

  const currentCollection =
    MUSEUM_COLLECTIONS.find((c) => c.id === activeCollectionId) ||
    MUSEUM_COLLECTIONS[0];

  const allExhibits = MUSEUM_COLLECTIONS.flatMap((c) => c.exhibits);

  return (
    <div className="w-full space-y-10">
      {/* Gallery Selector Bar */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 border border-gold-metallic/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Collection Nav Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {MUSEUM_COLLECTIONS.map((col) => {
            const isActive = col.id === activeCollectionId;
            return (
              <button
                key={col.id}
                onClick={() => {
                  setActiveCollectionId(col.id);
                  setViewMode("gallery");
                }}
                className={`px-4 py-2 rounded-full text-xs font-serif tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive && viewMode === "gallery"
                    ? "bg-gold-champagne text-obsidian-950 font-bold shadow-lg"
                    : "bg-midnight-900/60 text-ivory-warm/70 hover:text-ivory-warm border border-gold-metallic/20"
                }`}
              >
                <span className="text-[10px] font-mono opacity-60">{col.code}</span>
                <span>{col.title}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === "gallery" ? "timeline" : "gallery")}
            className="px-4 py-2 rounded-full border border-gold-metallic/30 glass-panel text-xs uppercase tracking-wider text-gold-champagne flex items-center gap-2 hover:border-gold-champagne transition-all"
          >
            {viewMode === "gallery" ? (
              <>
                <Calendar className="w-3.5 h-3.5" />
                <span>Timeline View</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5" />
                <span>Curated Galleries</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Curatorial Intro Card */}
      {viewMode === "gallery" && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-metallic/20 bg-gradient-to-r from-midnight-950 via-obsidian-950 to-midnight-950 text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-metallic font-mono">
            {currentCollection.code} ARCHIVE NOTE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-gold-champagne font-bold">
            {currentCollection.title}
          </h3>
          <p className="text-sm text-ivory-warm/75 italic font-serif leading-relaxed">
            {currentCollection.curatorIntro}
          </p>
        </div>
      )}

      {/* Gallery Grid View */}
      {viewMode === "gallery" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentCollection.exhibits.map((exhibit) => (
            <motion.div
              key={exhibit.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedExhibit(exhibit)}
              className="cursor-pointer group rounded-3xl overflow-hidden glass-panel border border-gold-metallic/30 shadow-2xl transition-all duration-300 hover:border-gold-champagne"
            >
              {/* Exhibit Image Container */}
              <div className="relative aspect-[4/5] w-full bg-obsidian-900 overflow-hidden">
                <img
                  src={exhibit.imageSrc}
                  alt={exhibit.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />

                {/* Top Corner Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-panel border border-gold-metallic/30 text-[10px] tracking-wider uppercase text-gold-champagne">
                  {exhibit.dateOrEra}
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-full glass-panel border border-gold-metallic/30 text-ivory-warm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-gold-metallic" />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-violet-glow font-mono">
                    {exhibit.medium}
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-ivory-warm group-hover:text-gold-champagne transition-colors mt-0.5">
                    {exhibit.title}
                  </h4>
                  <p className="text-xs text-ivory-warm/70 italic font-serif mt-1">
                    {exhibit.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Footer Curator Note */}
              <div className="p-5 border-t border-gold-metallic/15 bg-obsidian-950/70">
                <p className="text-xs text-ivory-warm/80 font-sans leading-relaxed line-clamp-2">
                  {exhibit.curatorNote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Timeline View */
        <div className="relative border-l border-gold-metallic/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {allExhibits.map((exhibit, idx) => (
            <motion.div
              key={exhibit.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedExhibit(exhibit)}
              className="cursor-pointer group relative glass-panel rounded-3xl p-6 border border-gold-metallic/25 hover:border-gold-champagne transition-all"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-8 w-4 h-4 rounded-full bg-gold-metallic border-2 border-obsidian-950 group-hover:scale-125 transition-transform" />

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-full sm:w-48 aspect-square rounded-2xl overflow-hidden shrink-0 bg-obsidian-900 border border-gold-metallic/20">
                  <img
                    src={exhibit.imageSrc}
                    alt={exhibit.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-gold-metallic">
                    {exhibit.dateOrEra} • {exhibit.medium}
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-gold-champagne">
                    {exhibit.title}
                  </h4>
                  <p className="text-xs text-rose-blush italic font-serif">
                    {exhibit.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-ivory-warm/80 leading-relaxed font-sans">
                    {exhibit.curatorNote}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedExhibit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-obsidian-950/90 backdrop-blur-xl">
            <div className="absolute inset-0" onClick={() => setSelectedExhibit(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl border border-gold-metallic/40 shadow-2xl p-6 sm:p-10 bg-midnight-950 text-ivory-warm z-10"
            >
              <button
                onClick={() => setSelectedExhibit(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-gold-metallic/30 hover:bg-midnight-800 transition-colors z-20"
              >
                <X className="w-5 h-5 text-ivory-warm" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Large Preview */}
                <div className="md:col-span-7 rounded-2xl overflow-hidden border border-gold-metallic/30 bg-obsidian-900 shadow-xl">
                  <img
                    src={selectedExhibit.imageSrc}
                    alt={selectedExhibit.title}
                    className="w-full h-auto max-h-[550px] object-contain mx-auto"
                  />
                </div>

                {/* Exhibit Curatorial Dossier */}
                <div className="md:col-span-5 space-y-5 text-left">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-violet-glow font-mono">
                      {selectedExhibit.dateOrEra}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-champagne mt-1">
                      {selectedExhibit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-blush italic font-serif mt-1">
                      {selectedExhibit.subtitle}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-midnight-900/70 border-l-2 border-gold-metallic font-serif italic text-xs sm:text-sm text-gold-champagne/90 leading-relaxed">
                    {selectedExhibit.accentQuote}
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-ivory-warm/80 leading-relaxed font-sans">
                    <h5 className="text-[11px] uppercase tracking-widest text-gold-metallic font-semibold">
                      Curator’s Analysis
                    </h5>
                    <p>{selectedExhibit.curatorNote}</p>
                  </div>

                  <div className="pt-4 border-t border-gold-metallic/20 text-[11px] text-ivory-warm/50 space-y-1">
                    <div>Format: {selectedExhibit.dimensions}</div>
                    <div>Medium: {selectedExhibit.medium}</div>
                    <div className="text-violet-glow font-mono">
                      Location: public{selectedExhibit.imageSrc}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
