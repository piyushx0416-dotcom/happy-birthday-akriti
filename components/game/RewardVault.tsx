"use client";

import React, { useState } from "react";
import { QUEST_LEVELS, BONUS_SECRETS, QuestReward, BonusSecret } from "@/data/starlightQuestData";
import { Lock, Unlock, Sparkles, X, Gift, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gameAudio } from "@/lib/audio/gameAudio";

interface RewardVaultProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedLevels: number[];
  stardust: number;
  unlockedSecrets: string[];
  onUnlockSecret: (secretId: string, cost: number) => void;
}

export default function RewardVault({
  isOpen,
  onClose,
  unlockedLevels,
  stardust,
  unlockedSecrets,
  onUnlockSecret,
}: RewardVaultProps) {
  const [selectedReward, setSelectedReward] = useState<QuestReward | null>(null);
  const [activeTab, setActiveTab] = useState<"rewards" | "secrets">("rewards");

  if (!isOpen) return null;

  const unlockedCount = QUEST_LEVELS.filter(
    (lvl) => unlockedLevels.includes(lvl.id) || stardust >= (lvl.pointsRequired || lvl.stardustReward)
  ).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#14071A] border border-[#F5A6CD]/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF3D91]/20 border border-[#FF3D91]/40 flex items-center justify-center text-[#FF69B4]">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-white font-light">
                The Celestial Reward Vault
              </h2>
              <p className="text-xs font-mono text-[#F4E2C7]/70">
                Unlocked through The Starlight Quest for Akriti Singh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Stardust indicator */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E5C388]/15 border border-[#E5C388]/30 text-[#F4E2C7] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C388]" />
              <span>{stardust} Stardust</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="px-6 md:px-8 pt-4 flex items-center gap-3 border-b border-white/5">
          <button
            onClick={() => setActiveTab("rewards")}
            className={`pb-3 text-xs font-mono tracking-wider border-b-2 transition-all ${
              activeTab === "rewards"
                ? "border-[#FF3D91] text-[#FFB6D9] font-bold"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            Level Treasures ({unlockedCount}/5)
          </button>
          <button
            onClick={() => setActiveTab("secrets")}
            className={`pb-3 text-xs font-mono tracking-wider border-b-2 transition-all ${
              activeTab === "secrets"
                ? "border-[#E5C388] text-[#F4E2C7] font-bold"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            Bonus Secrets ({unlockedSecrets.length}/{BONUS_SECRETS.length})
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === "rewards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {QUEST_LEVELS.map((level) => {
                const pointsReq = level.pointsRequired || level.stardustReward;
                const isUnlocked = unlockedLevels.includes(level.id) || stardust >= pointsReq;

                return (
                  <div
                    key={level.id}
                    onClick={() => {
                      if (isUnlocked) {
                        gameAudio.playVaultUnlock();
                        setSelectedReward(level.reward);
                      }
                    }}
                    className={`relative rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                      isUnlocked
                        ? "bg-[#1C0D24]/80 border-[#F5A6CD]/40 hover:border-[#F5A6CD] cursor-pointer hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(245,166,205,0.2)]"
                        : "bg-white/[0.02] border-white/10 opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div>
                      {/* Top status */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#FFB6D9]">
                          Level {level.id}
                        </span>
                        {isUnlocked ? (
                          <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Unlocked</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-mono text-white/40">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>

                      {/* Title & Preview */}
                      <div className="py-4 space-y-2">
                        <h4 className="font-serif text-lg text-white font-medium leading-snug">
                          {level.reward.title}
                        </h4>
                        <p className="text-xs font-mono text-[#F4E2C7]/70">
                          {level.reward.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className={isUnlocked ? "text-[#FF69B4]" : "text-[#FF69B4]/60"}>
                        {isUnlocked ? "Click to Open Card" : `Requires ${pointsReq} Stardust`}
                      </span>
                      <span>➔</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Bonus Secrets shop */
            <div className="space-y-4">
              <p className="text-xs font-mono text-white/60 mb-2">
                Use stardust collected from completing puzzles and star exploration to unlock hidden secrets:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {BONUS_SECRETS.map((secret) => {
                  const isUnlocked = unlockedSecrets.includes(secret.id);
                  const canAfford = stardust >= secret.stardustCost;

                  return (
                    <div
                      key={secret.id}
                      className="rounded-2xl p-6 bg-[#1C0D24]/80 border border-[#E5C388]/30 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="text-[10px] font-mono tracking-widest uppercase text-[#F4E2C7]">
                            {secret.name}
                          </span>
                          <span className="text-xs font-mono text-[#E5C388]">
                            ✦ {secret.stardustCost}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-white mt-3">
                          {secret.title}
                        </h4>
                        <p className="text-xs font-sans text-white/70 mt-2">
                          {isUnlocked ? secret.unlockText : secret.description}
                        </p>
                      </div>

                      <div>
                        {isUnlocked ? (
                          <div className="w-full py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center flex items-center justify-center gap-1.5">
                            <Check className="w-3.5 h-3.5" />
                            <span>Unlocked Secret</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              if (canAfford) {
                                gameAudio.playVaultUnlock();
                                onUnlockSecret(secret.id, secret.stardustCost);
                              }
                            }}
                            disabled={!canAfford}
                            className={`w-full py-2.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                              canAfford
                                ? "bg-gradient-to-r from-[#E5C388] to-[#F4E2C7] text-black font-bold hover:scale-102 shadow-[0_0_15px_rgba(229,195,136,0.3)]"
                                : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                            }`}
                          >
                            {canAfford
                              ? `Unlock (${secret.stardustCost} Stardust)`
                              : `Need ${secret.stardustCost - stardust} more Stardust`}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Selected Reward Lightbox Modal */}
        <AnimatePresence>
          {selectedReward && (
            <div
              onClick={() => setSelectedReward(null)}
              className="fixed inset-0 z-60 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 md:p-10 bg-[#1A0A20] border-2 border-[#F5A6CD]/50 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <button
                  onClick={() => setSelectedReward(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#FFB6D9] px-3 py-1 rounded-full bg-[#FF3D91]/20 border border-[#FF3D91]/40">
                    {selectedReward.badge}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-normal pt-2">
                    {selectedReward.title}
                  </h3>
                  <p className="text-xs font-mono text-[#F4E2C7]/80">
                    {selectedReward.subtitle}
                  </p>
                </div>

                {/* Content paragraphs */}
                <div className="space-y-3 font-serif italic text-base sm:text-lg text-[#FFF5FA]/90 leading-relaxed pl-2 border-l-2 border-[#FFB6D9]/40">
                  {selectedReward.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Signature */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#F4E2C7]">
                  <span>{selectedReward.signature}</span>
                  <span className="text-[#FFB6D9]">Akriti Singh • Her Universe</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
