"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    playClick(1100);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      title="Back to top"
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full glass-pill border border-gold/30 text-gold hover:text-white hover:border-gold shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
