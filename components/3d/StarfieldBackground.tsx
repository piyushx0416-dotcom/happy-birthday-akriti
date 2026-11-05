"use client";

import React, { useEffect, useRef } from "react";

interface StarfieldBackgroundProps {
  particleCount?: number;
  className?: string;
  speed?: number;
}

export default function StarfieldBackground({
  particleCount = 140,
  className = "",
  speed = 0.5,
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Generate stars
    const stars = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      baseAlpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color:
        Math.random() > 0.6
          ? "#f5e7c8" // Champagne Gold
          : Math.random() > 0.3
          ? "#a78bfa" // Electric Violet
          : "#ffffff", // Pure Diamond
      vx: (Math.random() - 0.5) * 0.15 * speed,
      vy: (Math.random() - 0.5) * 0.15 * speed,
    }));

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.015;
      targetMouseY = (e.clientY - height / 2) * 0.015;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.01;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render subtle celestial nebula glows
      const grad1 = ctx.createRadialGradient(
        width * 0.7 + mouseX * 2,
        height * 0.3 + mouseY * 2,
        0,
        width * 0.7 + mouseX * 2,
        height * 0.3 + mouseY * 2,
        width * 0.45
      );
      grad1.addColorStop(0, "rgba(139, 92, 246, 0.08)");
      grad1.addColorStop(0.6, "rgba(109, 40, 217, 0.03)");
      grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.2 - mouseX,
        height * 0.7 - mouseY,
        0,
        width * 0.2 - mouseX,
        height * 0.7 - mouseY,
        width * 0.4
      );
      grad2.addColorStop(0, "rgba(212, 175, 55, 0.05)");
      grad2.addColorStop(0.5, "rgba(235, 211, 155, 0.02)");
      grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around boundaries
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentAlpha =
          star.baseAlpha + Math.sin(time * 2 + star.twinkleOffset) * 0.25;
        const clampedAlpha = Math.max(0.05, Math.min(1, currentAlpha));

        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.beginPath();
        ctx.arc(
          star.x + mouseX * (star.size * 0.8),
          star.y + mouseY * (star.size * 0.8),
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Extra flare for larger stars
        if (star.size > 1.4 && clampedAlpha > 0.7) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = clampedAlpha * 0.4;
          const px = star.x + mouseX * (star.size * 0.8);
          const py = star.y + mouseY * (star.size * 0.8);
          ctx.beginPath();
          ctx.moveTo(px - 5, py);
          ctx.lineTo(px + 5, py);
          ctx.moveTo(px, py - 5);
          ctx.lineTo(px, py + 5);
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
