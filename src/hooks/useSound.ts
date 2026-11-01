"use client";

import { useEffect, useState, useCallback } from "react";
import { soundManager } from "@/lib/audio";

export function useSound() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolumeState] = useState<number>(0.5);

  useEffect(() => {
    setIsMuted(soundManager.getIsMuted());
    setVolumeState(soundManager.getVolume());
  }, []);

  const toggleSound = useCallback(() => {
    const isNowPlaying = soundManager.toggleSound();
    setIsMuted(!isNowPlaying);
  }, []);

  const setVolume = useCallback((vol: number) => {
    soundManager.setVolume(vol);
    setVolumeState(vol);
  }, []);

  const playClick = useCallback((freq?: number) => {
    soundManager.playChime(freq);
  }, []);

  const playEnvelope = useCallback(() => {
    soundManager.playEnvelopeOpen();
  }, []);

  const playBlowCandle = useCallback(() => {
    soundManager.playBlowCandle();
  }, []);

  const playCelebration = useCallback(() => {
    soundManager.playCelebrationFanfare();
  }, []);

  return {
    isMuted,
    volume,
    toggleSound,
    setVolume,
    playClick,
    playEnvelope,
    playBlowCandle,
    playCelebration,
  };
}
