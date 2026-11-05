"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Crown,
  Eye,
  Shirt,
  Smile,
  Shield,
  MessageCircle,
  Gem,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import StarfieldBackground from "@/components/3d/StarfieldBackground";

// Dynamically import 3D Character Scene
const CharacterScene = dynamic(() => import("@/components/3d/CharacterScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[580px] sm:h-[650px] rounded-3xl glass-panel border border-gold-metallic/30 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-full border-2 border-gold-metallic border-t-transparent animate-spin" />
      <span className="text-xs uppercase tracking-widest text-gold-champagne font-mono">
        Manifesting 3D Stylized Model of Akriti...
      </span>
    </div>
  ),
});

const CHARACTER_ATTRIBUTES = [
  {
    icon: Eye,
    title: "Facial Proportions & Eyes",
    description:
      "Soft oval facial structure, naturally defined eyebrows, delicate nose with a champagne-diamond nose stud, and expressive dark brown eyes reflecting profound intellect and warmth.",
  },
  {
    icon: Sparkles,
    title: "Signature Dark Hair",
    description:
      "Thick, midnight-black hair cascading in soft natural waves, catching the golden highlights of the sunset sky with effortless movement.",
  },
  {
    icon: Gem,
    title: "Editorial Adornments",
    description:
      "Small classic gold hoop earrings paired with a delicate nose stud. Minimalist, timeless accessories that honor her natural facial harmony without distraction.",
  },
  {
    icon: Shirt,
    title: "Ivory Fantasy Gown",
    description:
      "A bespoke couture gown tailored in warm ivory silk with delicate champagne-gold floral embroidery, a structured bodice, and a flowing skirt that responds dynamically to starlight.",
  },
];

const SIGNATURE_TRAITS = [
  {
    title: "Poised Composure",
    value: "Calm in Every Storm",
    detail: "Brings stillness to chaotic rooms through quiet dignity and grounded presence.",
  },
  {
    title: "Intellectual Precision",
    value: "Sharp & Discerning",
    detail: "Understands nuance, asks thoughtful questions, and sees through superficial noise.",
  },
  {
    title: "Gentle Heart",
    value: "Deep Empathy",
    detail: "Quietly protects and uplifts the people around her without seeking credit.",
  },
  {
    title: "Magnetic Humor",
    value: "Unfiltered Joy",
    detail: "Her uninhibited laughter is musical, infectious, and instantly warms the soul.",
  },
];

export default function HerPage() {
  const [activeSpeech, setActiveSpeech] = useState<string>(
    "Welcome to your little universe."
  );

  return (
    <div className="relative min-h-screen w-full bg-obsidian-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <StarfieldBackground particleCount={130} speed={0.3} />

      {/* Header Dossier */}
      <div className="max-w-7xl mx-auto mb-10 text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-metallic/30 glass-panel text-gold-champagne text-xs font-mono tracking-[0.25em] uppercase">
          <Crown className="w-3.5 h-3.5 text-gold-metallic" />
          <span>PROTAGONIST DOSSIER • AKRITI SINGH</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory-warm tracking-tight">
          THE WORLD OF <span className="font-bold text-gold-gradient italic">HER</span>
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-rose-blush/90 max-w-xl mx-auto">
          An original stylized 3D character presentation inspired by her natural beauty, poise, and
          golden spirit at age 19.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Character Viewport */}
        <div className="lg:col-span-7 space-y-6">
          <CharacterScene onInteract={(text) => setActiveSpeech(text)} />

          {/* Model Status Bar */}
          <div className="glass-panel rounded-2xl p-4 border border-gold-metallic/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory-warm/70 font-mono">
            <div className="flex items-center gap-2 text-gold-champagne">
              <CheckCircle2 className="w-4 h-4 text-gold-metallic" />
              <span>Procedural Stylized 3D Avatar Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-ivory-warm/50 text-[11px]">
              <span>Custom GLB Path: public/assets/models/akriti.glb</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Dossier & Attributes */}
        <div className="lg:col-span-5 space-y-6">
          {/* Character Bio Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-metallic/30 shadow-2xl space-y-4 bg-midnight-950/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-violet-glow">
                CHARACTER IDENTITY
              </span>
              <span className="text-[11px] font-mono text-gold-metallic">AGE: 19</span>
            </div>

            <h2 className="font-serif text-3xl font-bold text-gold-champagne">
              Akriti Singh
            </h2>

            <p className="font-serif italic text-sm text-rose-blush leading-relaxed">
              “She moves through the world not by raising her voice, but through the quiet gravity of
              her poise.”
            </p>

            <p className="text-xs sm:text-sm text-ivory-warm/80 font-sans leading-relaxed pt-2">
              Born under the November sky, Akriti embodies a rare harmony between high intellect and
              authentic softness. Whether dressed in everyday minimalism or an ivory fantasy gown,
              her natural elegance shines through.
            </p>
          </div>

          {/* Specifications Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-gold-metallic px-1">
              Design & Aesthetic Blueprint
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {CHARACTER_ATTRIBUTES.map((attr, idx) => {
                const Icon = attr.icon;
                return (
                  <div
                    key={idx}
                    className="glass-panel p-4 rounded-2xl border border-gold-metallic/20 hover:border-gold-metallic/40 transition-all flex items-start gap-3.5 bg-obsidian-950/70"
                  >
                    <div className="w-8 h-8 rounded-xl bg-midnight-900 border border-violet-glow/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-gold-metallic" />
                    </div>
                    <div>
                      <div className="font-serif text-sm font-bold text-gold-champagne">
                        {attr.title}
                      </div>
                      <div className="text-xs text-ivory-warm/70 mt-0.5 leading-relaxed font-sans">
                        {attr.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signature Traits Matrix */}
          <div className="glass-panel rounded-3xl p-6 border border-gold-metallic/25 space-y-4 bg-midnight-950/70">
            <h4 className="text-xs uppercase font-mono tracking-widest text-violet-glow">
              Core Personality Matrix
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {SIGNATURE_TRAITS.map((trait, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-obsidian-950 border border-gold-metallic/15 space-y-1"
                >
                  <div className="text-[10px] font-mono text-gold-metallic uppercase">
                    {trait.title}
                  </div>
                  <div className="font-serif text-xs font-bold text-ivory-warm">
                    {trait.value}
                  </div>
                  <div className="text-[10px] text-ivory-warm/60 leading-tight">
                    {trait.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
