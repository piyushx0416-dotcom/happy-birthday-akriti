"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function useTextScramble(targetText: string, trigger: boolean = true, speed: number = 25) {
  const [displayText, setDisplayText] = useState(targetText);
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = targetText.length * 3;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const update = () => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) {
              return targetText[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration < maxIterations) {
        iteration++;
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(targetText);
      }
    };

    frameRef.current = requestAnimationFrame(update);
  }, [targetText]);

  useEffect(() => {
    if (trigger) {
      scramble();
    } else {
      setDisplayText(targetText);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [targetText, trigger, scramble]);

  return displayText;
}
