"use client";

import React, { useState, useEffect } from "react";
import { OpeningScreen } from "@/components/hero/OpeningScreen";
import { HeroSection } from "@/components/hero/HeroSection";
import { MuseumOfHer } from "@/components/museum/MuseumOfHer";
import { MemoriesSection } from "@/components/memories/MemoriesSection";
import { InteractiveFairytale } from "@/components/fairytale/InteractiveFairytale";
import { OpenWhenLetters } from "@/components/letters/OpenWhenLetters";
import { ReasonsToSmile } from "@/components/reasons/ReasonsToSmile";
import { BirthdayRoom } from "@/components/birthday/BirthdayRoom";
import { ParticleCanvas } from "@/components/common/ParticleCanvas";

export default function HomePage() {
  const [enteredUniverse, setEnteredUniverse] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already entered in this session
    const hasEntered = sessionStorage.getItem("her_universe_entered");
    if (hasEntered === "true") {
      setEnteredUniverse(true);
    }
  }, []);

  const handleEnterUniverse = () => {
    setEnteredUniverse(true);
    sessionStorage.setItem("her_universe_entered", "true");
  };

  return (
    <>
      <ParticleCanvas />

      {!enteredUniverse ? (
        <OpeningScreen onEnter={handleEnterUniverse} />
      ) : (
        <div className="relative z-10 space-y-16">
          <HeroSection />
          <MuseumOfHer />
          <MemoriesSection />
          <InteractiveFairytale />
          <OpenWhenLetters />
          <ReasonsToSmile />
          <BirthdayRoom />
        </div>
      )}
    </>
  );
}
