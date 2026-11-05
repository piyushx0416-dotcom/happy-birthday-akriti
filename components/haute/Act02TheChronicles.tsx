"use client";

import React, { useState } from "react";
import { Eye, Sparkles, Disc, Gem, Crown, ArrowRight } from "lucide-react";

interface Act02TheChroniclesProps {
  onNext: () => void;
}

const chronicleCards = [
  {
    id: "gaze",
    number: "01 // ESSENCE",
    icon: Eye,
    title: "The Gaze",
    description:
      "Her eyes carry an unspoken gravity. Deep, sharp, and intensely expressive — one direct glance is enough to leave anyone captivated.",
    tag: "MESMERIZING",
  },
  {
    id: "aura",
    number: "02 // WARMTH",
    icon: Sparkles,
    title: "The Aura",
    description:
      "An effortless, unforced magnetism. She doesn't need to compete for the spotlight; the room simply softens wherever she is.",
    tag: "EFFORTLESS",
  },
  {
    id: "smile",
    number: "03 // SMILE",
    icon: Disc,
    title: "The Smile",
    description:
      "When that genuine smile surfaces, it changes the entire atmosphere. Bright, honest, and quietly dangerous to your peace of mind.",
    tag: "CONTAGIOUS",
  },
  {
    id: "nose-pin",
    number: "04 // DETAIL",
    icon: Gem,
    title: "The Nose Pin",
    description:
      "That delicate sparkle on her left nostril. A subtle, signature mark of poise that ties together her whole look with sheer perfection.",
    tag: "ICONIC SIGNATURE",
  },
  {
    id: "strength",
    number: "05 // SPIRIT",
    icon: Crown,
    title: "The Strength",
    description:
      "Behind the gentle exterior lies an unwavering self-respect and courage. A woman who knows her worth and carries it like a crown.",
    tag: "ROYALTY",
  },
];

export default function Act02TheChronicles({ onNext }: Act02TheChroniclesProps) {
  const [activeCard, setActiveCard] = useState<string>("aura");

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-20 lg:py-24 bg-[#07050B] select-none">
      {/* Background Emerald Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-950/20 rounded-full blur-[160px]" />
      </div>

      {/* Top Header Information */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
        <div className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-emerald-400 font-medium">
          ROYAL DECREE & HER ESSENCE
        </div>

        <h2 className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#F8F1E8] tracking-tight">
          The Chronicles of Her.
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#F8F1E8]/75 max-w-2xl mx-auto leading-relaxed pt-1">
          What makes Akriti truly mesmerizing isn&apos;t just one thing. It&apos;s the
          balance of quiet poise, playful fire, and a presence that lingers long after
          she has left.
        </p>
      </div>

      {/* Five Cards Row */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 my-8">
        {chronicleCards.map((card) => {
          const Icon = card.icon;
          const isSelected = activeCard === card.id;

          return (
            <div
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className={`group cursor-pointer rounded-2xl p-5 sm:p-6 flex flex-col justify-between border transition-all duration-300 min-h-[310px] ${
                isSelected
                  ? "bg-[#0A1612]/90 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)] scale-[1.02]"
                  : "bg-[#0F0C16]/75 border-emerald-950/60 hover:border-emerald-500/50 hover:bg-[#0A1612]/50"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-950/60 text-emerald-400"
                      : "border-emerald-900/60 bg-[#13101C] text-[#E8C994]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] tracking-widest text-[#F8F1E8]/50 uppercase">
                  {card.number}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5 my-auto py-2">
                <h3 className="font-editorial-serif text-2xl font-medium text-[#F8F1E8]">
                  {card.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#F8F1E8]/70 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="pt-3 border-t border-emerald-900/40">
                <span
                  className={`font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-semibold ${
                    isSelected ? "text-emerald-400" : "text-[#E8C994]/60"
                  }`}
                >
                  {card.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="relative z-10 flex justify-center pb-4">
        <button
          onClick={onNext}
          className="group px-8 py-3.5 rounded-full bg-[#13101C] border border-emerald-400/50 hover:border-emerald-400 text-emerald-300 font-mono text-xs tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center gap-2.5"
        >
          <span>PROCEED TO CLAW OF DESTINY</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
