"use client";

import React, { useState, useEffect } from "react";
import ConstellationPuzzle from "./ConstellationPuzzle";
import OrbitalPuzzle from "./OrbitalPuzzle";
import StardustField from "./StardustField";
import CelestialMechanism from "./CelestialMechanism";
import FinalConstellation from "./FinalConstellation";
import RewardVault from "./RewardVault";
import { QUEST_LEVELS, QuestLevel, QuestReward } from "@/data/starlightQuestData";
import { Sparkles, Gift, HelpCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gameAudio } from "@/lib/audio/gameAudio";

interface StarlightQuestProps {
  onNext?: () => void;
  standalone?: boolean;
}

export default function StarlightQuest({
  onNext,
  standalone = false,
}: StarlightQuestProps) {
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [playableLevels, setPlayableLevels] = useState<number[]>([1]);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [unlockedCards, setUnlockedCards] = useState<number[]>([]);
  // Stardust points start at 0 and always reset to 0 on refresh as requested
  const [stardust, setStardust] = useState<number>(0);
  const [unlockedSecrets, setUnlockedSecrets] = useState<string[]>([]);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [celebrationReward, setCelebrationReward] = useState<QuestReward | null>(null);

  // On refresh or initial visit: ALWAYS reset stardust points to 0 and start with all cards locked (0/5)
  useEffect(() => {
    try {
      localStorage.removeItem("akriti_quest_progress");
    } catch {}
    setStardust(0);
    setUnlockedCards([]);
    setCompletedLevels([]);
    setPlayableLevels([1]);
    setCurrentLevelId(1);
    setUnlockedSecrets([]);
  }, []);

  // Unlock cards progressively as the user earns the required points or completes levels
  useEffect(() => {
    const newlyUnlocked = QUEST_LEVELS
      .filter((lvl) => stardust >= lvl.pointsRequired || completedLevels.includes(lvl.id))
      .map((lvl) => lvl.id);

    if (newlyUnlocked.length > 0) {
      setUnlockedCards((prev) => Array.from(new Set([...prev, ...newlyUnlocked])));
    }
  }, [stardust, completedLevels]);

  const handleCollectStardust = (amount: number) => {
    setStardust((prev) => prev + amount);
  };

  const handleLevelComplete = (lvlId: number) => {
    const currentLevelObj = QUEST_LEVELS.find((l) => l.id === lvlId);
    if (!currentLevelObj) return;

    const nextLvl = Math.min(5, lvlId + 1);
    setPlayableLevels((prev) => Array.from(new Set([...prev, lvlId, nextLvl])));
    setCompletedLevels((prev) => Array.from(new Set([...prev, lvlId])));
    setUnlockedCards((prev) => Array.from(new Set([...prev, lvlId])));
    setStardust((prev) => prev + currentLevelObj.stardustReward);

    // Show celebration modal with reward
    setCelebrationReward(currentLevelObj.reward);
  };

  const handleUnlockSecret = (secretId: string, cost: number) => {
    if (stardust >= cost && !unlockedSecrets.includes(secretId)) {
      setStardust((prev) => prev - cost);
      setUnlockedSecrets((prev) => [...prev, secretId]);
    }
  };

  const activeLevel: QuestLevel =
    QUEST_LEVELS.find((l) => l.id === currentLevelId) || QUEST_LEVELS[0];

  return (
    <section className="relative min-h-screen w-full bg-[#08020D] text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Background Celestial Observatory Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-br from-[#1C0926]/70 via-[#FF3D91]/10 to-transparent rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-[#E5C388]/10 via-transparent to-transparent rounded-full blur-[100px]" />
        {/* Subtle star particle pattern */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* Top Bar with Navigation & HUD */}
      <div className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#F4E2C7] uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C388]" />
            <span>The Celestial Observatory</span>
          </span>
        </div>

        {/* Currency & Vault Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E5C388]/15 border border-[#E5C388]/30 text-[#F4E2C7] text-xs font-mono shadow-[0_0_15px_rgba(229,195,136,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C388]" />
            <span>{stardust} Stardust</span>
          </div>

          <button
            onClick={() => {
              gameAudio.playVaultUnlock();
              setIsVaultOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF3D91] to-[#FF69B4] hover:from-[#FF1493] hover:to-[#FF3D91] text-white text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,61,145,0.4)]"
          >
            <Gift className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reward Vault</span>
            <span>({unlockedCards.length}/5)</span>
          </button>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#FF69B4]/30 bg-[#1A0A20]/70 text-[#FFB6D9] text-[11px] font-mono tracking-[0.2em] uppercase">
          <span>THE CELESTIAL ODYSSEY</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
          THE STARLIGHT <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFB6D9] via-[#F4E2C7] to-[#C4A1D9]">QUEST</span>
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-white/70 max-w-xl mx-auto">
          “A little adventure through a universe made just for you.”
        </p>
      </div>

      {/* Level Selection Map Bar */}
      <div className="max-w-2xl mx-auto mb-8 p-2 rounded-full bg-[#14061B]/80 border border-white/10 backdrop-blur-md flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        {QUEST_LEVELS.map((lvl) => {
          const isPlayable = playableLevels.includes(lvl.id);
          const isCurrent = currentLevelId === lvl.id;
          const isFinished = completedLevels.includes(lvl.id);

          return (
            <button
              key={lvl.id}
              onClick={() => {
                if (isPlayable) {
                  gameAudio.playStarChime(400 + lvl.id * 80);
                  setCurrentLevelId(lvl.id);
                }
              }}
              disabled={!isPlayable}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                isCurrent
                  ? "bg-gradient-to-r from-[#FF3D91] to-[#F5A6CD] text-white shadow-[0_0_15px_rgba(255,61,145,0.5)] font-bold"
                  : isPlayable
                  ? "text-white/80 hover:text-white hover:bg-white/5"
                  : "text-white/20 cursor-not-allowed"
              }`}
            >
              <span>L{lvl.id}</span>
              {isFinished && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Active Level Header & Lore Bar */}
      <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-[#14071A]/70 border border-white/10 backdrop-blur-md flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-serif text-lg sm:text-xl text-white font-medium">
            {activeLevel.title}
          </h3>
          <p className="text-xs font-mono text-[#F4E2C7]/70">
            {activeLevel.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowHintModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5C388]/30 bg-[#E5C388]/10 text-[#F4E2C7] text-xs font-mono tracking-wider hover:bg-[#E5C388]/20 transition-all"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#E5C388]" />
          <span>Hint</span>
        </button>
      </div>

      {/* Level Playfield Screen */}
      <div className="max-w-4xl mx-auto">
        {currentLevelId === 1 && (
          <ConstellationPuzzle
            onComplete={() => handleLevelComplete(1)}
            onCollectStardust={handleCollectStardust}
          />
        )}
        {currentLevelId === 2 && (
          <OrbitalPuzzle
            onComplete={() => handleLevelComplete(2)}
            onCollectStardust={handleCollectStardust}
          />
        )}
        {currentLevelId === 3 && (
          <StardustField
            onComplete={() => handleLevelComplete(3)}
            onCollectStardust={handleCollectStardust}
          />
        )}
        {currentLevelId === 4 && (
          <CelestialMechanism
            onComplete={() => handleLevelComplete(4)}
            onCollectStardust={handleCollectStardust}
          />
        )}
        {currentLevelId === 5 && (
          <FinalConstellation
            onComplete={() => handleLevelComplete(5)}
            onCollectStardust={handleCollectStardust}
            onEnterUniverse={onNext}
          />
        )}
      </div>

      {/* Level Complete Celebration Modal */}
      <AnimatePresence>
        {celebrationReward && (
          <div
            onClick={() => setCelebrationReward(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl p-8 bg-[#180820] border-2 border-[#F5A6CD]/50 shadow-[0_25px_80px_rgba(255,61,145,0.4)] text-center space-y-5"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#FF1493] to-[#F4E2C7] flex items-center justify-center text-white shadow-[0_0_30px_#FF69B4]">
                <Sparkles className="w-8 h-8 text-black" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#F4E2C7] px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {celebrationReward.badge}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  Level {celebrationReward.levelId} Mastered!
                </h3>
                <p className="font-serif italic text-sm sm:text-base text-[#FFB6D9]">
                  {celebrationReward.title}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white/70 space-y-1">
                <p className="text-emerald-400 font-bold">
                  ✓ Unlocked in your Celestial Reward Vault
                </p>
                <p>Cosmetic Reward: {celebrationReward.cosmeticUnlock}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setCelebrationReward(null);
                    setIsVaultOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF3D91] to-[#F5A6CD] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,61,145,0.5)]"
                >
                  View in Reward Vault 🎁
                </button>

                <button
                  onClick={() => {
                    setCelebrationReward(null);
                    if (currentLevelId < 5) {
                      setCurrentLevelId((prev) => prev + 1);
                    } else if (onNext) {
                      onNext();
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-mono tracking-wider transition-all"
                >
                  {currentLevelId < 5 ? "Next Level ➔" : "Cosmic Horizon ➔"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hint Modal */}
      <AnimatePresence>
        {showHintModal && (
          <div
            onClick={() => setShowHintModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl p-6 bg-[#160B1E] border border-[#E5C388]/40 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2 text-[#F4E2C7]">
                <HelpCircle className="w-5 h-5 text-[#E5C388]" />
                <h4 className="font-serif text-lg font-medium">
                  {activeLevel.title} — Observatory Log
                </h4>
              </div>

              <p className="font-serif italic text-sm text-white/80 leading-relaxed pl-2 border-l-2 border-[#E5C388]/40">
                “{activeLevel.lore}”
              </p>

              <div className="p-3.5 rounded-xl bg-[#E5C388]/10 border border-[#E5C388]/20 text-xs font-sans text-[#F4E2C7] leading-relaxed">
                <span className="font-bold font-mono">Guide: </span>
                {activeLevel.hint}
              </div>

              <button
                onClick={() => setShowHintModal(false)}
                className="w-full py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wider"
              >
                Close Guide
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reward Vault Modal */}
      <RewardVault
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        unlockedLevels={unlockedCards}
        stardust={stardust}
        unlockedSecrets={unlockedSecrets}
        onUnlockSecret={handleUnlockSecret}
      />

      {/* Bottom Grand Finale Banner */}
      {onNext && (
        <div className="max-w-4xl mx-auto mt-20 p-8 rounded-3xl bg-gradient-to-b from-[#180820]/90 to-[#0A020D]/95 border border-[#FF3D91]/35 backdrop-blur-xl text-center space-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#F4E2C7]">
            ✦ The Celestial Reveal ✦
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Witness the <span className="italic text-[#FFB6D9]">Cosmic Sky of Her Birth</span>
          </h3>
          <p className="font-serif italic text-sm sm:text-base text-white/70 max-w-lg mx-auto">
            Gaze upon the deep universe as it appeared on November 6, the exact day Akriti was born, leading directly into her 3D Birthday Universe.
          </p>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF3D91] via-[#FF69B4] to-[#F5A6CD] text-white text-xs font-mono font-semibold tracking-widest uppercase transition-all shadow-[0_0_35px_rgba(255,61,145,0.6)] hover:scale-105 active:scale-95"
          >
            <span>Proceed to Cosmic Horizon</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
