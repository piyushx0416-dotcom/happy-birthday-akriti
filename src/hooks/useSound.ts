"use client";

import { useEffect, useState, useCallback } from "react";
import { soundManager, SIGNATURE_TRACK, TrackMetadata } from "@/lib/audio";

export function useSound() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.65);
  const [progress, setProgressState] = useState<number>(0);

  useEffect(() => {
    // Sync initial state
    setIsMuted(soundManager.getIsMuted());
    setIsPlaying(soundManager.getIsPlaying());
    setVolumeState(soundManager.getVolume());
    setProgressState(soundManager.getProgress());

    // Subscribe to soundManager changes
    const unsubscribe = soundManager.subscribe(() => {
      setIsMuted(soundManager.getIsMuted());
      setIsPlaying(soundManager.getIsPlaying());
      setVolumeState(soundManager.getVolume());
      setProgressState(soundManager.getProgress());
    });

    return () => unsubscribe();
  }, []);

  const toggleSound = useCallback(() => {
    soundManager.toggleSound();
  }, []);

  const togglePlayMusic = useCallback(() => {
    soundManager.togglePlayMusic();
  }, []);

  const playMusic = useCallback(() => {
    soundManager.playMusic();
  }, []);

  const pauseMusic = useCallback(() => {
    soundManager.pauseMusic();
  }, []);

  const setVolume = useCallback((vol: number) => {
    soundManager.setVolume(vol);
    setVolumeState(vol);
  }, []);

  const setProgress = useCallback((sec: number) => {
    soundManager.setProgress(sec);
    setProgressState(sec);
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
    isPlaying,
    volume,
    progress,
    track: SIGNATURE_TRACK,
    toggleSound,
    togglePlayMusic,
    playMusic,
    pauseMusic,
    setVolume,
    setProgress,
    playClick,
    playEnvelope,
    playBlowCandle,
    playCelebration,
  };
}
