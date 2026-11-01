import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  romanticNote?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  romanticNote,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 sm:mb-16", alignClasses[align], className)}>
      {badge && (
        <span className="inline-block px-3.5 py-1 mb-3 rounded-full text-[10px] tracking-[0.25em] font-sans uppercase text-gold/90 border border-gold/30 bg-purple-deep/40 backdrop-blur-md">
          {badge}
        </span>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory tracking-wide leading-tight font-normal">
        {title}
      </h2>

      {romanticNote && (
        <span className="font-script text-2xl sm:text-3xl text-lavender/90 mt-2">
          {romanticNote}
        </span>
      )}

      {subtitle && (
        <p className="mt-4 text-sm sm:text-base text-ivory/70 font-sans font-light leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}

      <div
        className={cn(
          "w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-6",
          align === "center" ? "mx-auto" : ""
        )}
      />
    </div>
  );
}
