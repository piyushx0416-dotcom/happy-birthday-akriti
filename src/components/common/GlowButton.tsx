"use client";

import React from "react";
import Link from "next/link";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function GlowButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  onClick,
  ...props
}: GlowButtonProps) {
  const { playClick } = useSound();

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-xs sm:text-sm",
    lg: "px-8 py-4 text-sm sm:text-base",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-gold/90 via-gold-light to-gold text-midnight font-medium border border-gold/60 shadow-[0_0_20px_rgba(214,189,139,0.35)] hover:shadow-[0_0_32px_rgba(214,189,139,0.6)] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-purple-deep/70 text-ivory border border-gold/30 hover:border-gold/70 hover:bg-purple-royal/60 shadow-lg hover:shadow-[0_0_24px_rgba(214,189,139,0.2)] hover:scale-[1.02] active:scale-[0.98]",
    outline:
      "bg-transparent text-gold border border-gold/40 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(214,189,139,0.25)] hover:scale-[1.02] active:scale-[0.98]",
    ghost:
      "bg-transparent text-ivory/80 hover:text-gold hover:bg-white/5",
  };

  const combinedClasses = cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full font-sans tracking-widest uppercase transition-all duration-300 cursor-pointer select-none",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick(960);
    if (onClick) onClick(e);
  };

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        onClick={() => playClick(960)}
      >
        {children}
        {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} onClick={handleClick} {...props}>
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </button>
  );
}
