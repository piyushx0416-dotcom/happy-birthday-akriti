"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, Sparkles, Heart } from "lucide-react";
import { useSound } from "@/hooks/useSound";

const NAV_ITEMS = [
  { name: "HOME", href: "/" },
  { name: "HER", href: "/her" },
  { name: "MEMORIES", href: "/memories" },
  { name: "FAIRYTALE", href: "/fairytale" },
  { name: "LETTERS", href: "/letters" },
  { name: "REASONS", href: "/reasons" },
  { name: "BIRTHDAY", href: "/birthday" },
];

export function FloatingNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleSound, playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-white/5 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-gold/60 via-gold to-gold-light transition-all duration-150 shadow-[0_0_10px_rgba(214,189,139,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      <header
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 transition-all duration-500 ${
          scrolled ? "top-3" : "top-5"
        }`}
      >
        <nav className="glass-pill flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full max-w-5xl w-full border border-gold/20 shadow-2xl transition-all duration-300">
          {/* Logo / Monogram */}
          <Link
            href="/"
            onClick={() => playClick(920)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-royal to-gold/30 flex items-center justify-center border border-gold/40 group-hover:border-gold transition-all duration-300">
              <Sparkles className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-base font-semibold tracking-wider text-ivory group-hover:text-gold transition-colors">
                HER UNIVERSE
              </span>
              <span className="text-[9px] tracking-widest text-gold/70 uppercase font-sans hidden sm:inline-block">
                AKRITI SINGH
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => playClick(880)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-sans tracking-widest transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-gold font-medium"
                      : "text-ivory/70 hover:text-ivory hover:bg-white/5"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-gold/10 border border-gold/30 rounded-full -z-10 shadow-[0_0_12px_rgba(214,189,139,0.25)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Controls: Sound Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle Button */}
            <button
              onClick={() => {
                toggleSound();
                playClick(1000);
              }}
              title={isMuted ? "Enable Sound & Atmosphere" : "Mute Sound"}
              className="relative p-2 rounded-full border border-gold/25 hover:border-gold/60 bg-purple-deep/40 hover:bg-purple-royal/50 text-gold transition-all duration-300 cursor-pointer flex items-center gap-1.5"
              aria-label="Toggle Sound"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 opacity-75" />
              ) : (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping hidden sm:block" />
                </>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-gold/20 hover:border-gold/50 text-ivory hover:text-gold transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden glass-card rounded-2xl p-6 border border-gold/25 shadow-2xl bg-midnight/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              <div className="pb-3 border-b border-gold/15 flex items-center justify-between">
                <span className="font-serif text-gold text-lg">HER UNIVERSE</span>
                <span className="text-xs text-lavender font-script">Akriti Singh • 19</span>
              </div>
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      playClick(880);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-xl text-sm tracking-wider flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-gold/15 text-gold border border-gold/30 font-medium"
                        : "text-ivory/80 hover:bg-white/5 hover:text-ivory"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <Heart className="w-3.5 h-3.5 text-gold fill-gold" />}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
