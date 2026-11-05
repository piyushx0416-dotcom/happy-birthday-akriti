// lib/audio/gameAudio.ts
// Completely silenced as requested: "remove all the background sounds even the smallest ones and keep only the one of the girls song"

class GameAudioSynth {
  // All sound effects muted - only the background song plays
  playStarChime(_frequency = 659.25) {}
  playRingTurn() {}
  playFragmentCollect() {}
  playLevelComplete() {}
  playVaultUnlock() {}
}

export const gameAudio = new GameAudioSynth();
