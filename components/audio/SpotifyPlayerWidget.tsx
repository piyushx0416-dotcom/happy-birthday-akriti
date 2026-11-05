"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ExternalLink, Music2, X, ChevronDown, ChevronUp } from "lucide-react";
import { backgroundMusic } from "@/lib/audio/soundtrack";

const SPOTIFY_TRACK_URL = "https://open.spotify.com/track/7CyPwkp0oE8Ro9Dd5CUDjW";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/track/7CyPwkp0oE8Ro9Dd5CUDjW?utm_source=generator&theme=0";

export default function SpotifyPlayerWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Subscribe to real-time audio playback state
    const unsubscribe = backgroundMusic.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    backgroundMusic.toggle();
  };

  return (
    <>
      {/* ============================================================== */}
      {/* FLOATING SPOTIFY PILL & CONTROLS (Top Right)                   */}
      {/* ============================================================== */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[99999] flex items-center gap-2 select-none pointer-events-auto">
        {/* Expanded Spotify Information Pill */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.6)] text-xs text-white/90 hover:border-[#1DB954]/50 transition-colors"
        >
          {/* Spotify Green Logo Icon */}
          <a
            href={SPOTIFY_TRACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Listen on Spotify"
            className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1DB954] text-black shadow-[0_0_12px_rgba(29,185,84,0.6)] hover:scale-110 transition-transform"
          >
            <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.306c-.215.353-.675.467-1.028.252-2.825-1.726-6.381-2.116-10.57-1.158-.403.093-.807-.156-.899-.56-.093-.404.156-.808.56-.9 4.582-1.047 8.52-.607 11.685 1.328.353.215.467.675.252 1.038zm1.467-3.262c-.27.441-.849.582-1.29.312-3.233-1.987-8.162-2.562-11.986-1.401-.497.151-1.03-.133-1.18-.63-.151-.498.132-1.03.63-1.18 4.373-1.327 9.809-.687 13.514 1.589.442.27.583.849.312 1.31zm.126-3.41c-3.877-2.302-10.28-2.515-13.993-1.388-.595.181-1.226-.162-1.407-.757-.181-.595.162-1.226.757-1.407 4.269-1.296 11.341-1.043 15.802 1.606.536.318.71 1.011.392 1.547-.318.536-1.011.71-1.551.399z" />
            </svg>
          </a>

          {/* Track and Artist Info */}
          <div className="flex flex-col text-left leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white tracking-wide text-[11px]">One of the Girls</span>
              <span className="text-[10px] text-[#1DB954] font-mono">● Spotify</span>
            </div>
            <span className="text-[10px] text-white/50 truncate max-w-[150px]">The Weeknd, JENNIE</span>
          </div>

          {/* Animated Audio Equalizer Bars */}
          <div className="flex items-end gap-[2px] h-3.5 px-1">
            <span
              className={`w-[2.5px] rounded-full bg-[#1DB954] transition-all duration-300 ${
                isPlaying ? "h-3 animate-pulse" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#1DB954] transition-all duration-300 ${
                isPlaying ? "h-4 animate-bounce" : "h-1 opacity-40"
              }`}
              style={{ animationDelay: "150ms" }}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#1DB954] transition-all duration-300 ${
                isPlaying ? "h-2.5 animate-pulse" : "h-1 opacity-40"
              }`}
              style={{ animationDelay: "300ms" }}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#1DB954] transition-all duration-300 ${
                isPlaying ? "h-3.5 animate-bounce" : "h-1 opacity-40"
              }`}
              style={{ animationDelay: "75ms" }}
            />
          </div>

          {/* Spotify Embed Toggle Button */}
          <button
            onClick={() => setShowEmbedModal(!showEmbedModal)}
            title="Open Spotify Embed Player"
            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Music2 className="w-3.5 h-3.5" />
          </button>

          {/* Direct Track Link */}
          <a
            href={SPOTIFY_TRACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Spotify App"
            className="p-1 rounded-full text-white/60 hover:text-[#1DB954] hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Circular Music Toggle Button (Matching user's reference video & original aya-sigma-six) */}
        <motion.button
          onClick={handleTogglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          title={isPlaying ? "Pause Music" : "Play Music"}
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8800] via-[#FF5500] to-[#E63946] text-white shadow-[0_4px_18px_rgba(255,100,0,0.5)] border border-white/20 transition-all cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}

          {/* Subtle Spotify Green indicator dot */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#1DB954] border-2 border-black flex items-center justify-center" />
        </motion.button>
      </div>

      {/* ============================================================== */}
      {/* SPOTIFY EMBED MODAL / MINI-PLAYER POPUP                        */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showEmbedModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 right-3 sm:top-20 sm:right-5 z-[99999] w-[90vw] max-w-[380px] p-4 rounded-2xl bg-[#121212]/95 border border-[#1DB954]/40 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(29,185,84,0.2)] text-white pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.306c-.215.353-.675.467-1.028.252-2.825-1.726-6.381-2.116-10.57-1.158-.403.093-.807-.156-.899-.56-.093-.404.156-.808.56-.9 4.582-1.047 8.52-.607 11.685 1.328.353.215.467.675.252 1.038zm1.467-3.262c-.27.441-.849.582-1.29.312-3.233-1.987-8.162-2.562-11.986-1.401-.497.151-1.03-.133-1.18-.63-.151-.498.132-1.03.63-1.18 4.373-1.327 9.809-.687 13.514 1.589.442.27.583.849.312 1.31zm.126-3.41c-3.877-2.302-10.28-2.515-13.993-1.388-.595.181-1.226-.162-1.407-.757-.181-.595.162-1.226.757-1.407 4.269-1.296 11.341-1.043 15.802 1.606.536.318.71 1.011.392 1.547-.318.536-1.011.71-1.551.399z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold tracking-wider text-white">Spotify Integrated Player</span>
              </div>
              <button
                onClick={() => setShowEmbedModal(false)}
                className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Spotify Embed Iframe */}
            <div className="w-full overflow-hidden rounded-xl bg-black/40">
              <iframe
                style={{ borderRadius: "12px" }}
                src={SPOTIFY_EMBED_URL}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Embed: One Of The Girls"
              />
            </div>

            {/* Footer Quick Links */}
            <div className="flex items-center justify-between mt-3 pt-2 text-[11px] text-white/60">
              <span>Playing in high-fidelity audio</span>
              <a
                href={SPOTIFY_TRACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#1DB954] hover:underline font-medium"
              >
                <span>Open Spotify App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
