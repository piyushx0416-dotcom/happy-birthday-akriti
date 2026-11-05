"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Heart,
  Camera,
  BookOpen,
  Sparkles,
  Mail,
  Gift,
  Star,
  Clock,
  Feather,
  Layers,
  ChevronDown
} from "lucide-react";
import StarfieldBackground from "@/components/3d/StarfieldBackground";

// Dynamically import 3D Universe Scene with fallback
const UniverseScene = dynamic(() => import("@/components/3d/UniverseScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-obsidian-950/80">
      <div className="w-12 h-12 rounded-full border-2 border-gold-metallic border-t-transparent animate-spin" />
      <span className="text-xs uppercase tracking-widest text-gold-champagne font-mono">
        Manifesting 3D Floating Islands...
      </span>
    </div>
  ),
});

const DESTINATIONS = [
  {
    title: "The World of Her",
    subtitle: "3D Stylized Character & Personal Dossier",
    category: "Main Character",
    route: "/her",
    icon: Heart,
    color: "from-pink-900/60 to-purple-900/60",
    accent: "#f472b6",
  },
  {
    title: "The Museum of Her",
    subtitle: "A Luxury Editorial Exhibition of 5 Curated Galleries",
    category: "Digital Exhibition",
    route: "/museum",
    icon: Camera,
    color: "from-amber-900/60 to-slate-900/60",
    accent: "#d4af37",
  },
  {
    title: "The Fairytale",
    subtitle: "5-Chapter Interactive Animated Storybook",
    category: "Narrative Odyssey",
    route: "/fairytale",
    icon: BookOpen,
    color: "from-purple-900/60 to-indigo-900/60",
    accent: "#c084fc",
  },
  {
    title: "365 Reasons",
    subtitle: "An Interactive Archive of Everything That Makes Her Extraordinary",
    category: "Daily Archive",
    route: "/reasons",
    icon: Sparkles,
    color: "from-amber-900/60 to-rose-900/60",
    accent: "#f5e7c8",
  },
  {
    title: "Open When Letters",
    subtitle: "8 Wax-Sealed Digital Envelopes for Every Emotional Weather",
    category: "Soulful Letters",
    route: "/letters",
    icon: Mail,
    color: "from-rose-900/60 to-purple-900/60",
    accent: "#e2b4bd",
  },
  {
    title: "The Birthday Room",
    subtitle: "Grand 19th Birthday Celebration, Countdown & Finale",
    category: "Milestone",
    route: "/birthday",
    icon: Gift,
    color: "from-amber-950/80 to-purple-950/80",
    accent: "#d4af37",
    highlight: true,
  },
  {
    title: "Her Constellation",
    subtitle: "Interactive Star Map of Her 8 Core Virtues & Lore",
    category: "Astronomy",
    route: "/constellation",
    icon: Star,
    color: "from-blue-900/60 to-violet-900/60",
    accent: "#8b5cf6",
  },
  {
    title: "The Time Capsule",
    subtitle: "Past Milestones, Present 19th Year & Future Wishes",
    category: "Chronicle",
    route: "/time-capsule",
    icon: Clock,
    color: "from-emerald-900/60 to-slate-900/60",
    accent: "#34d399",
  },
  {
    title: "Letter From Creator",
    subtitle: "A Handwritten Editorial Dedication to Akriti Singh",
    category: "Personal Note",
    route: "/creator-letter",
    icon: Feather,
    color: "from-amber-900/60 to-slate-950/60",
    accent: "#ebd39b",
  },
];

export default function UniversePage() {
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");

  return (
    <div className="relative min-h-screen w-full bg-obsidian-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <StarfieldBackground particleCount={120} speed={0.3} />

      {/* Header Dossier */}
      <div className="max-w-7xl mx-auto mb-8 text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-metallic/30 glass-panel text-gold-champagne text-xs font-mono tracking-[0.25em] uppercase">
          <Compass className="w-3.5 h-3.5 text-gold-metallic" />
          <span>CELESTIAL HUB • THE ARCHIPELAGO OF WONDER</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-warm tracking-tight">
          THE FANTASY <span className="font-bold text-gold-gradient italic">UNIVERSE</span>
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-rose-blush/90 max-w-xl mx-auto">
          Explore the floating islands, celestial portals, and interactive destinations created
          exclusively for Akriti Singh.
        </p>

        {/* View Mode Toggle Pill */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <button
            onClick={() => setViewMode("3d")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
              viewMode === "3d"
                ? "bg-gold-champagne text-obsidian-950 font-bold shadow-lg"
                : "glass-panel text-ivory-warm/60 hover:text-ivory-warm"
            }`}
          >
            3D Interactive World
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
              viewMode === "grid"
                ? "bg-gold-champagne text-obsidian-950 font-bold shadow-lg"
                : "glass-panel text-ivory-warm/60 hover:text-ivory-warm"
            }`}
          >
            Destination Directory
          </button>
        </div>
      </div>

      {/* 3D Scene Viewport */}
      {viewMode === "3d" ? (
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="w-full h-[580px] sm:h-[680px] rounded-3xl overflow-hidden glass-panel border border-gold-metallic/30 shadow-2xl relative">
            <UniverseScene />

            {/* Instruction Overlay Pill */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 glass-panel px-5 py-2 rounded-full border border-gold-metallic/30 pointer-events-none flex items-center gap-2 text-xs text-ivory-warm/80 font-mono tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
              <span>Rotate, Pan or Click Any Floating Destination Marker</span>
            </div>
          </div>

          {/* Quick Destination Pill Shelf below 3D */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DESTINATIONS.slice(0, 6).map((dest) => {
              const Icon = dest.icon;
              return (
                <Link
                  key={dest.route}
                  href={dest.route}
                  className="glass-panel p-3.5 rounded-2xl border border-gold-metallic/25 hover:border-gold-champagne hover:scale-105 transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
                >
                  <Icon className="w-4 h-4 text-gold-metallic group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-serif font-bold text-ivory-warm group-hover:text-gold-champagne transition-colors">
                    {dest.title}
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-violet-glow">
                    Enter Portal →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        /* Grid Directory View */
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => {
            const Icon = dest.icon;
            return (
              <Link
                key={dest.route}
                href={dest.route}
                className={`group rounded-3xl glass-panel p-7 border transition-all duration-300 flex flex-col justify-between h-[260px] hover:-translate-y-1.5 shadow-xl ${
                  dest.highlight
                    ? "border-gold-metallic bg-gradient-to-br from-midnight-800/90 via-obsidian-950 to-midnight-950 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                    : "border-gold-metallic/25 hover:border-gold-champagne hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] bg-obsidian-950/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-midnight-900 border border-gold-metallic/30 flex items-center justify-center group-hover:border-gold-champagne transition-all">
                    <Icon className="w-5 h-5 text-gold-metallic group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-violet-glow">
                    {dest.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-ivory-warm group-hover:text-gold-champagne transition-colors">
                    {dest.title}
                  </h3>
                  <p className="text-xs text-ivory-warm/70 mt-1 font-sans leading-relaxed">
                    {dest.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-gold-metallic/15 flex items-center justify-between text-xs text-gold-champagne font-mono tracking-wider">
                  <span>Explore Destination</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
