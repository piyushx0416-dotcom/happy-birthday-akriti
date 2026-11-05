"use client";

import React, { useState, useEffect } from "react";
import TopHeader from "@/components/haute/TopHeader";
import BottomDock from "@/components/haute/BottomDock";
import Act01TheMuse from "@/components/haute/Act01TheMuse";
import Act02TheChronicles from "@/components/haute/Act02TheChronicles";
import Act03ClawArcade from "@/components/haute/Act03ClawArcade";
import Act04TheConfession from "@/components/haute/Act04TheConfession";
import Act05CelestialVault from "@/components/haute/Act05CelestialVault";
import Act06TheTimepiece from "@/components/haute/Act06TheTimepiece";
import { backgroundMusic } from "@/lib/audio/soundtrack";

const actTitles = [
  "THE MUSE",
  "THE CHRONICLES",
  "CLAW OF DESTINY",
  "THE CONFESSION",
  "CELESTIAL VAULT",
  "THE TIMEPIECE",
];

export default function HauteExperience() {
  const [currentAct, setCurrentAct] = useState<number>(1);
  const totalActs = 6;

  // Initialize and ensure background audio plays automatically
  useEffect(() => {
    backgroundMusic.init();
    backgroundMusic.play();
  }, []);

  // Keyboard navigation: ArrowLeft and ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentAct((prev) => (prev < totalActs ? prev + 1 : 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentAct((prev) => (prev > 1 ? prev - 1 : totalActs));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalActs]);

  const handlePrev = () => {
    setCurrentAct((prev) => (prev > 1 ? prev - 1 : totalActs));
  };

  const handleNext = () => {
    setCurrentAct((prev) => (prev < totalActs ? prev + 1 : 1));
  };

  return (
    <main className="relative w-full min-h-screen bg-[#07050B] text-[#F8F1E8] overflow-hidden select-none">
      {/* Top Fixed Header */}
      <TopHeader
        currentAct={currentAct}
        totalActs={totalActs}
        actTitle={actTitles[currentAct - 1]}
        onSelectAct={(act) => setCurrentAct(act)}
      />

      {/* Current Act Viewport with smooth transitions */}
      <div className="relative w-full min-h-screen">
        {currentAct === 1 && <Act01TheMuse onNext={handleNext} />}
        {currentAct === 2 && <Act02TheChronicles onNext={handleNext} />}
        {currentAct === 3 && <Act03ClawArcade onNext={handleNext} />}
        {currentAct === 4 && <Act04TheConfession onNext={handleNext} />}
        {currentAct === 5 && <Act05CelestialVault onNext={handleNext} />}
        {currentAct === 6 && <Act06TheTimepiece onReplay={() => setCurrentAct(1)} />}
      </div>

      {/* Bottom Floating Navigation Dock */}
      <BottomDock
        currentAct={currentAct}
        totalActs={totalActs}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectAct={(act) => setCurrentAct(act)}
      />
    </main>
  );
}
