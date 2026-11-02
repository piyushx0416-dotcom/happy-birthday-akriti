"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc3,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Radio,
  Music,
} from "lucide-react";
import { useSound } from "@/hooks/useSound";

export function MusicPlayer() {
  const {
    isMuted,
    isPlaying,
    volume,
    progress,
    track,
    togglePlayMusic,
    setVolume,
    setProgress,
    playClick,
  } = useSound();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showEmbedModal, setShowEmbedModal] = useState<boolean>(false);
  const [audioSource, setAudioSource] = useState<"synth" | "youtube">("synth");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = (progress / track.duration) * 100;

  return (
    <>
      {/* Floating Persistent Luxury Music Player */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40 select-none">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Minimized Jewel Pill */
            <motion.button
              key="minimized"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => {
                playClick(920);
                setIsExpanded(true);
              }}
              className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-3 border border-gold/30 hover:border-gold shadow-[0_8px_30px_rgba(0,0,0,0.7)] group cursor-pointer"
              title="Open Soundtrack Player"
            >
              <div className="relative flex items-center justify-center">
                <Disc3
                  className={`w-5 h-5 text-gold ${
                    isPlaying ? "animate-spin-slow" : "opacity-80"
                  }`}
                />
                {isPlaying && (
                  <span className="absolute w-2 h-2 rounded-full bg-gold animate-ping" />
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-sans tracking-widest text-gold uppercase font-semibold">
                  {isPlaying ? "NOW PLAYING" : "SOUNDTRACK"}
                </span>
                <span className="text-xs font-serif text-ivory group-hover:text-gold transition-colors truncate max-w-[120px]">
                  {track.title}
                </span>
              </div>
              <ChevronUp className="w-3.5 h-3.5 text-gold/70 group-hover:text-gold transition-transform" />
            </motion.button>
          ) : (
            /* Full Floating Glassmorphic Player */
            <motion.div
              key="expanded"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card w-[310px] sm:w-[350px] p-4 sm:p-5 rounded-2xl border border-gold/30 shadow-[0_15px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-midnight/90"
            >
              {/* Header: Track Status & Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-gold/15 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span className="text-[10px] font-sans tracking-[0.2em] text-gold uppercase">
                    SIGNATURE SOUNDTRACK
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowEmbedModal(!showEmbedModal)}
                    className="p-1 rounded-full text-gold/70 hover:text-gold hover:bg-white/5 transition-colors cursor-pointer"
                    title="Audio Mode & Official Stream"
                  >
                    <Radio className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      playClick(880);
                      setIsExpanded(false);
                    }}
                    className="p-1 rounded-full text-ivory/60 hover:text-gold hover:bg-white/5 transition-colors cursor-pointer"
                    title="Minimize Player"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Track Info & Rotating Vinyl */}
              <div className="flex items-center gap-3.5 mb-3.5">
                {/* Rotating Vinyl Disc Thumbnail */}
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#1E162B] via-[#2A1D3D] to-gold/30 border border-gold/40 flex items-center justify-center shrink-0 shadow-md">
                  <Disc3
                    className={`w-7 h-7 text-gold ${
                      isPlaying ? "animate-spin-slow" : "opacity-80"
                    }`}
                  />
                  <div className="absolute w-3 h-3 rounded-full bg-midnight border border-gold/50" />
                </div>

                {/* Text Metadata */}
                <div className="flex flex-col min-w-0 flex-1">
                  <h4 className="font-serif text-base text-ivory font-medium truncate">
                    {track.title}
                  </h4>
                  <p className="text-xs text-lavender/90 font-sans truncate font-light">
                    {track.artists}
                  </p>
                </div>

                {/* Animated Waveform Visualizer */}
                <div className="flex items-end gap-1 h-6 px-1 shrink-0">
                  {[0.4, 0.8, 0.5, 1.0, 0.7].map((height, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        scaleY: isPlaying ? [height * 0.4, height, height * 0.6] : 0.2,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + i * 0.1,
                        ease: "easeInOut",
                      }}
                      className="w-1 bg-gradient-to-t from-gold/60 to-gold rounded-full origin-bottom"
                      style={{ height: "100%" }}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1 mb-3">
                <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-ivory/50">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(track.duration)}</span>
                </div>
              </div>

              {/* Bottom Row Controls: Play/Pause, Volume, Mode */}
              <div className="flex items-center justify-between pt-1">
                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playClick(950);
                      setVolume(volume > 0 ? 0 : 0.65);
                    }}
                    className="text-gold/80 hover:text-gold transition-colors cursor-pointer"
                    title={volume === 0 ? "Unmute" : "Mute"}
                  >
                    {volume === 0 || isMuted ? (
                      <VolumeX className="w-4 h-4 text-dustypink" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-16 sm:w-20 accent-[#D6BD8B] h-1 bg-white/20 rounded-lg cursor-pointer"
                    aria-label="Volume Control"
                  />
                </div>

                {/* Main Play/Pause Button */}
                <button
                  onClick={() => {
                    playClick(1050);
                    togglePlayMusic();
                  }}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold via-gold-light to-gold text-midnight flex items-center justify-center border border-gold/70 shadow-[0_0_20px_rgba(214,189,139,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title={isPlaying ? "Pause Track" : "Play Track"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-midnight" />
                  ) : (
                    <Play className="w-4 h-4 fill-midnight ml-0.5" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Official YouTube / External Audio Modal */}
      <AnimatePresence>
        {showEmbedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-xl"
            onClick={() => setShowEmbedModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-lg w-full p-6 rounded-3xl border border-gold/40 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gold/20">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-gold" />
                  <span className="font-serif text-lg text-ivory">
                    Signature Soundtrack Settings
                  </span>
                </div>
                <button
                  onClick={() => setShowEmbedModal(false)}
                  className="text-xs font-sans text-ivory/60 hover:text-gold cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <p className="text-xs font-sans text-ivory/70 leading-relaxed font-light">
                HER UNIVERSE features <span className="text-gold font-normal">“One of the Girls”</span> by The Weeknd, JENNIE, and Lily-Rose Depp as its official atmospheric soundtrack.
              </p>

              {/* YouTube Embed Container */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-gold/30 bg-black">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/f1r025atQ10?enablejsapi=1&rel=0"
                  title="The Weeknd, JENNIE, Lily-Rose Depp - One of the Girls"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
                <span className="text-ivory/50">
                  Built-in Dreamy Synth & Official Stream
                </span>
                <a
                  href="https://open.spotify.com/track/7CyPwkp0oE8Ro9Dd5CUDjW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold hover:text-white transition-colors"
                >
                  <span>Open on Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
