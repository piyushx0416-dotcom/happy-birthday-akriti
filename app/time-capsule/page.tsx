"use client";

import React, { useState } from "react";
import StarfieldBackground from "@/components/3d/StarfieldBackground";
import { TIME_CAPSULE_ENTRIES, TimeCapsuleEntry } from "@/lib/data/timeCapsule";
import { motion } from "framer-motion";
import { Clock, Sparkles, Lock, Unlock, Calendar, Compass, Milestone } from "lucide-react";

export default function TimeCapsulePage() {
  const [selectedEra, setSelectedEra] = useState<"all" | "past" | "present" | "future">("all");

  const filteredEntries = TIME_CAPSULE_ENTRIES.filter((entry) => {
    if (selectedEra === "all") return true;
    return entry.era === selectedEra;
  });

  return (
    <div className="relative min-h-screen w-full bg-obsidian-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <StarfieldBackground particleCount={130} speed={0.3} />

      {/* Header Dossier */}
      <div className="max-w-7xl mx-auto mb-10 text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-metallic/30 glass-panel text-gold-champagne text-xs font-mono tracking-[0.25em] uppercase">
          <Clock className="w-3.5 h-3.5 text-gold-metallic" />
          <span>TEMPORAL ARCHIVE • PAST, PRESENT & FUTURE</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-warm tracking-tight">
          THE <span className="font-bold text-gold-gradient italic">TIME CAPSULE</span>
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-rose-blush/90 max-w-xl mx-auto">
          Preserved memories of where she began, the golden milestone of her 19th birthday today, and
          aspirations waiting to unfold across her twenties.
        </p>

        {/* Filter Pills */}
        <div className="pt-3 flex items-center justify-center gap-2 overflow-x-auto">
          {[
            { id: "all", label: "Entire Timeline" },
            { id: "past", label: "Past Memories" },
            { id: "present", label: "Present: Age 19" },
            { id: "future", label: "Future Horizons" },
          ].map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all whitespace-nowrap ${
                selectedEra === era.id
                  ? "bg-gold-champagne text-obsidian-950 font-bold shadow-md"
                  : "bg-midnight-900/60 text-ivory-warm/70 hover:text-ivory-warm border border-gold-metallic/20"
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Entries Grid */}
      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        {filteredEntries.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className={`glass-panel rounded-3xl p-6 sm:p-8 border transition-all relative overflow-hidden ${
              item.era === "present"
                ? "border-gold-metallic bg-gradient-to-r from-midnight-950 via-[#1e1336] to-midnight-950 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                : "border-gold-metallic/25 bg-obsidian-950/80 hover:border-gold-champagne"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-midnight-900 border border-gold-metallic/30 flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-violet-glow">
                      {item.badge}
                    </span>
                    <span className="text-gold-metallic">•</span>
                    <span className="text-xs font-mono text-gold-champagne font-bold">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory-warm">
                    {item.title}
                  </h3>
                </div>
              </div>

              {item.isLocked ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900 border border-rose-dusty/40 text-[10px] text-rose-dusty font-mono uppercase">
                  <Lock className="w-3 h-3" />
                  <span>Unlocks {item.futureUnlockDate}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight-900 border border-gold-metallic/30 text-[10px] text-gold-champagne font-mono uppercase">
                  <Unlock className="w-3 h-3 text-gold-metallic" />
                  <span>Unlocked Archive</span>
                </div>
              )}
            </div>

            <p className="text-xs text-rose-blush italic font-serif mb-2">
              {item.subtitle}
            </p>

            <p className="text-sm sm:text-base text-ivory-warm/80 font-sans leading-relaxed">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
