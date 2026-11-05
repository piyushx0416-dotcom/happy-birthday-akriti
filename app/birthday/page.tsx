"use client";

import React from "react";
import BirthdayExperience from "@/components/birthday/BirthdayExperience";
import StarfieldBackground from "@/components/3d/StarfieldBackground";
import { Gift, Sparkles } from "lucide-react";

export default function BirthdayPage() {
  return (
    <div className="relative min-h-screen w-full bg-obsidian-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <StarfieldBackground particleCount={160} speed={0.4} />

      {/* Main Birthday Room Component */}
      <div className="max-w-7xl mx-auto relative z-10">
        <BirthdayExperience />
      </div>
    </div>
  );
}
