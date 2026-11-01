"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParticleCanvasProps {
  particleCount?: number;
  className?: string;
}

export function ParticleCanvas({
  particleCount = 70,
  className = "fixed inset-0 pointer-events-none -z-10",
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Cosmic star particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.7 + 0.2,
      fadeSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      color:
        Math.random() > 0.6
          ? "rgba(214, 189, 139," // Gold
          : Math.random() > 0.3
          ? "rgba(197, 178, 232," // Lavender
          : "rgba(245, 240, 232,", // Ivory
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.alpha += p.fadeSpeed;

          if (p.alpha <= 0.1 || p.alpha >= 0.85) {
            p.fadeSpeed = -p.fadeSpeed;
          }

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowBlur = p.radius > 1.2 ? 8 : 2;
        ctx.shadowColor = "rgba(214, 189, 139, 0.4)";
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, prefersReducedMotion]);

  return <canvas ref={canvasRef} className={className} />;
}
