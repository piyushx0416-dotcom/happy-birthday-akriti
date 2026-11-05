"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Menu,
  X,
  Compass,
  Heart,
  BookOpen,
  Mail,
  Camera,
  Star,
  Clock,
  Feather,
  Gift
} from "lucide-react";
import { ambientSound } from "@/lib/audio/soundtrack";
import { calculateTimeUntilBirthday } from "@/lib/utils/countdown";

const NAV_LINKS = [
  { name: "Universe", href: "/universe", icon: Compass },
  { name: "Her", href: "/her", icon: Heart },
  { name: "Museum", href: "/museum", icon: Camera },
  { name: "Fairytale", href: "/fairytale", icon: BookOpen },
  { name: "365 Reasons", href: "/reasons", icon: Sparkles },
  { name: "Letters", href: "/letters", icon: Mail },
  { name: "Birthday Room", href: "/birthday", icon: Gift, highlight: true },
];

const MORE_LINKS = [
  { name: "Her Constellation", href: "/constellation", icon: Star, desc: "Interactive star map of her virtues" },
  { name: "The Time Capsule", href: "/time-capsule", icon: Clock, desc: "Past memories, present & future wishes" },
  { name: "Letter From Creator", href: "/creator-letter", icon: Feather, desc: "Personal birthday letter to Akriti" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number>(4);

  // Keep root page purely cinematic with its own dedicated experience controller
  if (pathname === "/") {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update countdown days
    const time = calculateTimeUntilBirthday();
    setDaysRemaining(time.days);

    const interval = setInterval(() => {
      const t = calculateTimeUntilBirthday();
      setDaysRemaining(t.days);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Sync audio playing state
  useEffect(() => {
    const checkAudio = () => {
      setIsAudioPlaying(ambientSound.getIsPlaying());
    };
    const interval = setInterval(checkAudio, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const state = ambientSound.toggle();
    setIsAudioPlaying(state);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 bg-obsidian-950/80 backdrop-blur-xl border-b border-gold-metallic/15" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-gold-metallic/40 flex items-center justify-center bg-midnight-900/50 group-hover:border-gold-champagne group-hover:scale-105 transition-all">
              <Sparkles className="w-4 h-4 text-gold-metallic group-hover:text-gold-champagne transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-[0.25em] text-sm text-ivory-warm font-medium group-hover:text-gold-champagne transition-colors">
                HER UNIVERSE
              </span>
              <span className="text-[10px] tracking-[0.35em] text-violet-glow uppercase">
                AKRITI SINGH • 19
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border-gold-metallic/20">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "text-gold-champagne bg-midnight-800/80 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                      : link.highlight
                      ? "text-rose-dusty hover:text-rose-gold hover:bg-midnight-900/40"
                      : "text-ivory-warm/75 hover:text-ivory-warm hover:bg-midnight-900/40"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-gold-metallic" : "opacity-60"}`} />
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 rounded-full border border-gold-metallic/40 pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* More Experiences Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`px-3 py-1.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all flex items-center gap-1 ${
                  ["/constellation", "/time-capsule", "/creator-letter"].includes(pathname)
                    ? "text-violet-glow bg-midnight-800/80"
                    : "text-ivory-warm/60 hover:text-ivory-warm"
                }`}
              >
                <span>More</span>
                <span className="text-[10px]">▾</span>
              </button>

              <AnimatePresence>
                {isMoreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 glass-panel rounded-2xl p-2.5 shadow-2xl z-50 border-gold-metallic/30"
                  >
                    {MORE_LINKS.map((link) => {
                      const Icon = link.icon;
                      const isItemActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMoreMenuOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                            isItemActive
                              ? "bg-midnight-800/90 text-gold-champagne border border-gold-metallic/30"
                              : "hover:bg-midnight-900/60 text-ivory-warm/80 hover:text-ivory-warm"
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-obsidian-900/80 border border-violet-glow/20 mt-0.5">
                            <Icon className="w-3.5 h-3.5 text-gold-metallic" />
                          </div>
                          <div>
                            <div className="text-xs font-medium tracking-wide">{link.name}</div>
                            <div className="text-[10px] text-ivory-warm/50 leading-tight mt-0.5">{link.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Birthday Pill Button */}
            <Link
              href="/birthday"
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-metallic/40 bg-midnight-900/60 hover:bg-midnight-800/80 text-xs tracking-wider text-gold-champagne transition-all hover:border-gold-champagne hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]"
            >
              <Gift className="w-3.5 h-3.5 text-gold-metallic animate-pulse" />
              <span>
                {daysRemaining > 0 ? (
                  <>
                    <span className="font-semibold">{daysRemaining}d</span> to 19
                  </>
                ) : (
                  <span className="font-semibold text-rose-blush">Happy 19th!</span>
                )}
              </span>
            </Link>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-medium ${
                isAudioPlaying
                  ? "border-violet-glow/60 bg-violet-deep/20 text-violet-glow shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "border-ivory-warm/20 bg-midnight-900/40 text-ivory-warm/60 hover:text-ivory-warm hover:border-ivory-warm/40"
              }`}
              title={isAudioPlaying ? "Mute Celestial Audio" : "Play Celestial Soundtrack"}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-violet-glow animate-[pulse_0.8s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-2/3 bg-gold-champagne animate-[pulse_1.1s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-4/5 bg-violet-glow animate-[pulse_0.9s_ease-in-out_infinite]" />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px] uppercase tracking-wider">Audio</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-gold-metallic/25 bg-midnight-900/60 text-ivory-warm hover:text-gold-champagne transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-obsidian-950/95 backdrop-blur-2xl border-b border-gold-metallic/20 px-6 py-8 shadow-2xl lg:hidden overflow-y-auto max-h-[85vh]"
          >
            <div className="flex flex-col gap-2">
              <div className="text-[11px] tracking-[0.25em] text-gold-metallic/70 uppercase mb-2">
                Main Portals
              </div>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-midnight-800 text-gold-champagne border border-gold-metallic/30"
                        : "text-ivory-warm/80 hover:text-ivory-warm hover:bg-midnight-900/50"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-gold-metallic" />
                    <span className="text-sm font-medium tracking-wide">{link.name}</span>
                  </Link>
                );
              })}

              <div className="border-t border-gold-metallic/15 my-3 pt-3">
                <div className="text-[11px] tracking-[0.25em] text-violet-glow/70 uppercase mb-2">
                  Special Experiences
                </div>
                {MORE_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? "bg-midnight-800 text-gold-champagne border border-gold-metallic/30"
                          : "text-ivory-warm/70 hover:text-ivory-warm hover:bg-midnight-900/50"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-violet-glow" />
                      <div className="text-left">
                        <div className="text-xs font-medium">{link.name}</div>
                        <div className="text-[10px] text-ivory-warm/40">{link.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Sound Control */}
              <div className="mt-4 pt-4 border-t border-gold-metallic/15 flex items-center justify-between">
                <span className="text-xs text-ivory-warm/70">Celestial Ambient Audio</span>
                <button
                  onClick={toggleSound}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${
                    isAudioPlaying
                      ? "border-violet-glow bg-violet-deep/20 text-violet-glow"
                      : "border-ivory-warm/20 text-ivory-warm/60"
                  }`}
                >
                  {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isAudioPlaying ? "Playing" : "Muted"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
