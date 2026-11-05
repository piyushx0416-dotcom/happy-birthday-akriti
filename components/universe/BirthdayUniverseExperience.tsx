"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import confetti from "canvas-confetti";
import { birthdayUniverseData, AuthoritativeMessage } from "@/data/birthdayUniverseMessages";
import { backgroundMusic } from "@/lib/audio/soundtrack";

interface BirthdayUniverseProps {
  onBackToCollage?: () => void;
  onReplayFromStart?: () => void;
  standalone?: boolean;
}

// Internal representation for the Hybrid 2.5D/3D Screen-Space Layout Engine
interface LayoutNode {
  id: string;
  text: string;
  tier: "foreground" | "midground" | "background";
  priority: "high" | "medium" | "low";
  sprite: THREE.Sprite;
  // 3D position & dynamics
  x: number;
  y: number;
  z: number;
  baseX: number;
  upwardSpeed: number;
  driftOmegaX: number;
  driftPhaseX: number;
  driftAmpX: number;
  // 3D dimensions
  scaleX: number;
  scaleY: number;
  // Screen-space projected bounding box (updated each frame)
  screenX: number;
  screenY: number;
  projW: number;
  projH: number;
  maxOpacity: number;
  assignedLane: number;
}

export default function BirthdayUniverseExperience({
  onBackToCollage,
  onReplayFromStart,
  standalone = false,
}: BirthdayUniverseProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // Background soundtrack (Starts immediately at Jennie's vocal line)
  useEffect(() => {
    backgroundMusic.init();
    backgroundMusic.play();
  }, []);


  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    // ===============================================================
    // 1. THREE.JS SCENE, CAMERA, RENDERER
    // ===============================================================
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.set(0, 0, isMobile ? 24 : 20);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    container.appendChild(renderer.domElement);

    // ===============================================================
    // ===============================================================
    // 2. 3D CONTAINER FOR THE FLOATING TEXT UNIVERSE
    // ===============================================================
    // ===============================================================
    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    // High-Resolution Texture Generator: Crisp Serif + Soft Romantic Glow (Tiered)
    const createMessageTexture = (
      text: string,
      color: string,
      fontType: "serif" | "emoji",
      baseSize: number,
      tier: "foreground" | "midground" | "background"
    ): THREE.CanvasTexture => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(canvas);

      const res = 5; // 5x ultra-sharp scale for retina & 4K rendering
      const fontSize = baseSize * res;
      const isEmoji = fontType === "emoji";

      const emojiFont = `${fontSize * 1.15}px "Segoe UI Emoji", "Noto Color Emoji", "Apple Color Emoji", sans-serif`;
      const textFont = `700 ${fontSize}px "Playfair Display", Georgia, serif`;

      ctx.font = isEmoji ? emojiFont : textFont;

      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = fontSize * 1.45;

      canvas.width = Math.ceil(textWidth + 44 * res);
      canvas.height = Math.ceil(textHeight + 32 * res);

      // Re-apply context styling after canvas dimension update
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.font = isEmoji ? emojiFont : textFont;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (isEmoji) {
        // Delicate romantic rose glow halo for hearts
        ctx.shadowColor = "rgba(255, 143, 197, 0.45)";
        ctx.shadowBlur = 8 * res;
        ctx.fillText(text, cx, cy);

        // Razor-sharp core emoji pass (shadowBlur = 0 prevents blur)
        ctx.shadowBlur = 0;
        ctx.fillText(text, cx, cy);
      } else {
        // Tiered lighting: Foreground soft bloom, Midground subtle glow, Background gentle shimmer
        if (tier === "foreground") {
          // Foreground: Soft romantic pink outer glow
          ctx.shadowColor = "rgba(245, 166, 205, 0.45)";
          ctx.shadowBlur = 8 * res;
          ctx.fillStyle = color;
          ctx.fillText(text, cx, cy);

          // Core letterform: Crisp, warm, using authentic color
          ctx.shadowBlur = 0;
          ctx.fillStyle = color;
          ctx.fillText(text, cx, cy);
        } else if (tier === "midground") {
          // Midground: Subtle blush bloom
          ctx.shadowColor = "rgba(232, 138, 184, 0.35)";
          ctx.shadowBlur = 6 * res;
          ctx.fillStyle = color;
          ctx.fillText(text, cx, cy);

          // Core letterform
          ctx.shadowBlur = 0;
          ctx.fillStyle = color;
          ctx.fillText(text, cx, cy);
        } else {
          // Background: Dim rose and soft ivory, very subtle glow
          ctx.shadowColor = "rgba(232, 138, 184, 0.20)";
          ctx.shadowBlur = 4 * res;
          ctx.fillStyle = color;
          ctx.fillText(text, cx, cy);

          // Core letterform
          ctx.shadowBlur = 0;
          ctx.fillStyle = color;
          ctx.fillText(text, cx, cy);
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      if (maxAnisotropy > 1) {
        texture.anisotropy = Math.min(maxAnisotropy, 16);
      }
      return texture;
    };

    // ===============================================================
    // 4. SCREEN-SPACE-AWARE THREE-TIER COMPOSITION ENGINE
    // ===============================================================
    const layoutNodes: LayoutNode[] = [];

    // Filter authoritative messages by tier
    const allMessages = birthdayUniverseData.messages;
    const fgMessages = allMessages.filter((m) => m.tier === "foreground");
    const mgMessages = allMessages.filter((m) => m.tier === "midground");
    const bgMessages = allMessages.filter((m) => m.tier === "background");

    const Y_MIN = -5.2;
    const Y_MAX = 5.2;
    const Y_SPAN = Y_MAX - Y_MIN;

    // --- TIER 1: FOREGROUND (Exactly 5 Prominent Messages) ---
    // Strict non-overlapping horizontal lanes & staggered vertical positions
    const FG_LANES = isMobile
      ? [-6.5, -2.2, 2.2, 6.5] // 4 lanes on mobile
      : [-10.5, -5.5, 0.0, 5.5, 10.5]; // 5 lanes on desktop

    const fgCount = Math.min(fgMessages.length, FG_LANES.length);

    for (let i = 0; i < fgCount; i++) {
      const msg = fgMessages[i];
      const color = msg.color || "#FFF5FA";
      const font = msg.fontType || "serif";
      const baseFontSize = isMobile ? (msg.baseSize ? msg.baseSize * 0.85 : 24) : (msg.baseSize || 30);

      const texture = createMessageTexture(msg.text, color, font, baseFontSize, "foreground");
      const aspect = texture.image.width / texture.image.height;

      // Foreground scaling: ~25-32% of screen width (prominent, elegant, readable)
      const hScale = isMobile ? 0.72 : 0.88;
      const wScale = hScale * aspect;

      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(wScale, hScale, 1);

      // Depth: Z in [4.0, 5.2] (foreground close to camera at Z=20)
      const z = 4.2 + (i % 3) * 0.4;
      const baseX = FG_LANES[i];
      // Staggered Y across [-4.0, +4.0]
      const initialY = -4.0 + (i / fgCount) * 8.0;

      sprite.position.set(baseX, initialY, z);
      cloudGroup.add(sprite);

      layoutNodes.push({
        id: msg.id,
        text: msg.text,
        tier: "foreground",
        priority: "high",
        sprite,
        x: baseX,
        y: initialY,
        z,
        baseX,
        upwardSpeed: 0.88 + (i % 3) * 0.05,
        driftOmegaX: 0.35 + i * 0.1,
        driftPhaseX: (i * 1.5) % Math.PI,
        driftAmpX: 0.15, // Subtle lateral drift to preserve lane separation
        scaleX: wScale,
        scaleY: hScale,
        screenX: 0,
        screenY: 0,
        projW: 0,
        projH: 0,
        maxOpacity: 0.96,
        assignedLane: i,
      });
    }

    // --- TIER 2: MIDGROUND (14 to 16 Readable Supporting Messages) ---
    const mgCount = isMobile ? 12 : Math.min(mgMessages.length, 16);
    const MG_X_SPAN = isMobile ? 11.0 : 15.0;

    for (let i = 0; i < mgCount; i++) {
      const msg = mgMessages[i];
      const color = msg.color || "#FFEBF4";
      const font = msg.fontType || "serif";
      const baseFontSize = isMobile ? 18 : 22;

      const texture = createMessageTexture(msg.text, color, font, baseFontSize, "midground");
      const aspect = texture.image.width / texture.image.height;

      const hScale = isMobile ? 0.52 : 0.64;
      const wScale = hScale * aspect;

      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(wScale, hScale, 1);

      const z = -1.5 + ((i * 5) % 4) * 0.9; // Z in [-1.5, 1.2]
      // Distributed across horizontal field
      const normCol = ((i * 11) % mgCount) / (mgCount - 1);
      const baseX = -MG_X_SPAN + normCol * (2 * MG_X_SPAN);
      const initialY = Y_MIN + (i / mgCount) * Y_SPAN;

      sprite.position.set(baseX, initialY, z);
      cloudGroup.add(sprite);

      layoutNodes.push({
        id: msg.id,
        text: msg.text,
        tier: "midground",
        priority: "medium",
        sprite,
        x: baseX,
        y: initialY,
        z,
        baseX,
        upwardSpeed: 0.76 + ((i * 3) % 4) * 0.04,
        driftOmegaX: 0.45 + (i % 3) * 0.1,
        driftPhaseX: (i * 2.1) % Math.PI,
        driftAmpX: 0.25,
        scaleX: wScale,
        scaleY: hScale,
        screenX: 0,
        screenY: 0,
        projW: 0,
        projH: 0,
        maxOpacity: 0.85,
        assignedLane: -1,
      });
    }

    // --- TIER 3: BACKGROUND (28 to 36 Ambient Deep-Field Messages & Hearts) ---
    const bgCount = isMobile ? 24 : Math.min(bgMessages.length, 36);
    const BG_X_SPAN = isMobile ? 12.5 : 17.0;

    for (let i = 0; i < bgCount; i++) {
      const msg = bgMessages[i];
      const color = msg.color || "#FF75B8";
      const font = msg.fontType || "serif";
      const baseFontSize = isMobile ? 13 : 15;

      const texture = createMessageTexture(msg.text, color, font, baseFontSize, "background");
      const aspect = texture.image.width / texture.image.height;

      const hScale = isMobile ? 0.36 : 0.44;
      const wScale = hScale * aspect;

      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(wScale, hScale, 1);

      const z = -8.5 + ((i * 7) % 6) * 1.0; // Z in [-8.5, -3.5]
      const normCol = ((i * 17) % bgCount) / (bgCount - 1);
      const baseX = -BG_X_SPAN + normCol * (2 * BG_X_SPAN);
      const initialY = Y_MIN + (i / bgCount) * Y_SPAN;

      sprite.position.set(baseX, initialY, z);
      cloudGroup.add(sprite);

      layoutNodes.push({
        id: msg.id,
        text: msg.text,
        tier: "background",
        priority: "low",
        sprite,
        x: baseX,
        y: initialY,
        z,
        baseX,
        upwardSpeed: 0.65 + ((i * 5) % 4) * 0.04,
        driftOmegaX: 0.5 + (i % 4) * 0.1,
        driftPhaseX: (i * 1.8) % Math.PI,
        driftAmpX: 0.2,
        scaleX: wScale,
        scaleY: hScale,
        screenX: 0,
        screenY: 0,
        projW: 0,
        projH: 0,
        maxOpacity: 0.58,
        assignedLane: -1,
      });
    }

    // ===============================================================
    // 5. INTERACTION SYSTEM: CURSOR / DRAG ORBIT ONLY
    // "all the texts are going up by defaulty and its turning right or left only when we are turning it with the cursor"
    // ===============================================================
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.003;
        prevMouseX = clientX;
        prevMouseY = clientY;
      } else {
        // Natural cursor hover look-around (moves only when user moves cursor)
        const normX = (clientX / width) - 0.5;
        const normY = (clientY / height) - 0.5;
        targetRotationY = normX * 0.65;
        targetRotationX = normY * 0.28;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    domElement.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp, { passive: true });

    // ===============================================================
    // 6. ANIMATION LOOP & SCREEN-SPACE COLLISION RESOLUTION ENGINE
    // ===============================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const worldPosVec = new THREE.Vector3();
    const ndcVec = new THREE.Vector3();

    const fovRad = (camera.fov * Math.PI) / 180.0;
    const tanHalfFov = Math.tan(fovRad / 2.0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Step A: Upward translation & organic lateral drift
      layoutNodes.forEach((node) => {
        node.y += node.upwardSpeed * delta;

        // Wrap around seamlessly when rising above the upper boundary
        if (node.y > Y_MAX) {
          node.y = Y_MIN;
          // If not in a fixed foreground lane, choose a balanced X position
          if (node.tier !== "foreground") {
            const span = node.tier === "midground" ? MG_X_SPAN : BG_X_SPAN;
            node.baseX = Math.max(-span, Math.min(span, node.baseX + (Math.random() - 0.5) * 1.8));
          }
        }

        const floatX = Math.sin(time * node.driftOmegaX + node.driftPhaseX) * node.driftAmpX;
        node.x = node.baseX + floatX;

        node.sprite.position.set(node.x, node.y, node.z);
      });

      // Step B: Project 3D nodes to 2D Screen-Space & Calculate Bounding Boxes
      cloudGroup.updateMatrixWorld(true);

      layoutNodes.forEach((node) => {
        node.sprite.getWorldPosition(worldPosVec);

        // Distance from camera to object
        const dist = camera.position.distanceTo(worldPosVec);

        // Project to Normalized Device Coordinates (-1 to +1)
        ndcVec.copy(worldPosVec).project(camera);

        // Screen-space pixels
        node.screenX = ((ndcVec.x + 1.0) * 0.5) * width;
        node.screenY = ((1.0 - ndcVec.y) * 0.5) * height;

        // Exact projected pixel width and height
        node.projH = (node.scaleY / (2.0 * tanHalfFov * dist)) * height;
        node.projW = (node.scaleX / (2.0 * tanHalfFov * dist * camera.aspect)) * width;
      });

      // Step C: Screen-Space Collision Resolution
      // 1. Foreground vs Foreground: Absolute zero overlap guarantee
      const fgNodes = layoutNodes.filter((n) => n.tier === "foreground");
      for (let i = 0; i < fgNodes.length; i++) {
        for (let j = i + 1; j < fgNodes.length; j++) {
          const a = fgNodes[i];
          const b = fgNodes[j];

          const padX = 28;
          const padY = 16;
          const overlapX = (a.projW / 2 + b.projW / 2 + padX) - Math.abs(a.screenX - b.screenX);
          const overlapY = (a.projH / 2 + b.projH / 2 + padY) - Math.abs(a.screenY - b.screenY);

          if (overlapX > 0 && overlapY > 0) {
            // Push apart laterally in 3D
            const pushDir = a.screenX < b.screenX ? -1 : 1;
            const pushForce = 0.8 * delta;
            a.baseX += pushDir * pushForce;
            b.baseX -= pushDir * pushForce;
          }
        }
      }

      // 2. Foreground vs Midground: Midground yields to keep Foreground 100% legible
      const mgNodes = layoutNodes.filter((n) => n.tier === "midground");
      mgNodes.forEach((mg) => {
        let isOccludedBehindFg = false;

        for (const fg of fgNodes) {
          const padX = 20;
          const padY = 14;
          const overlapX = (fg.projW / 2 + mg.projW / 2 + padX) - Math.abs(fg.screenX - mg.screenX);
          const overlapY = (fg.projH / 2 + mg.projH / 2 + padY) - Math.abs(fg.screenY - mg.screenY);

          if (overlapX > 0 && overlapY > 0) {
            // Nudge midground message laterally away from the prominent foreground message
            const pushDir = mg.screenX < fg.screenX ? -1 : 1;
            mg.baseX += pushDir * 0.9 * delta;
            isOccludedBehindFg = true;
          }
        }

        // Soften opacity if temporarily directly behind foreground
        (mg as any).occludedFactor = isOccludedBehindFg ? 0.35 : 1.0;
      });

      // Step D: Apply Vertical Fading Horizons & Subtle Romantic Breathing Luminance
      const FADE_MARGIN = 1.6;
      layoutNodes.forEach((node) => {
        let verticalAlpha = 1.0;

        if (node.y > (Y_MAX - FADE_MARGIN)) {
          verticalAlpha = Math.max(0, (Y_MAX - node.y) / FADE_MARGIN);
        } else if (node.y < (Y_MIN + FADE_MARGIN)) {
          verticalAlpha = Math.max(0, (node.y - Y_MIN) / FADE_MARGIN);
        }

        const occludeFactor = (node as any).occludedFactor ?? 1.0;
        // Slow, gentle breathing luminance variation (period ~8.5s, amplitude 0.05)
        const breathing = 1.0 + Math.sin(time * 0.75 + node.driftPhaseX) * 0.05;
        node.sprite.material.opacity = Math.min(1.0, node.maxOpacity * verticalAlpha * occludeFactor * breathing);
      });

      // Step E: Smooth Cursor-Driven Inertial Orbit (Zero Autonomous Sideways Spin)
      cloudGroup.rotation.y += (targetRotationY - cloudGroup.rotation.y) * 0.06;
      cloudGroup.rotation.x += (targetRotationX - cloudGroup.rotation.x) * 0.06;

      // Subtle cosmic dust drift

      renderer.render(scene, camera);
    };

    animate();

    // ===============================================================
    // 7. RESPONSIVE RESIZE HANDLING
    // ===============================================================
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      const mob = width < 768;
      camera.aspect = width / height;
      camera.position.z = mob ? 24 : 20;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      domElement.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  // Ambient interactive burst on click
  const handleBurst = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    confetti({
      particleCount: 16,
      spread: 60,
      startVelocity: 20,
      origin: { x, y },
      colors: ["#FFF5FA", "#FCEAF3", "#FF8FC5", "#F5A6CD", "#E88AB8", "#FFB6D9"],
      shapes: ["circle"],
      scalar: 0.75,
      ticks: 70,
    });
  }, []);

  return (
    <div
      onClick={handleBurst}
      className="fixed inset-0 w-full h-full bg-[#000000] z-20 overflow-hidden select-none cursor-default"
    >
      {/* Three.js Canvas Container (Screen-space managed 3D universe) */}
      {/* 3D Birthday Universe Floating Messages Cloud */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-auto z-10" />

      {/* Subtle Hint (Fades out when interacting) */}
      <div
        className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-700 ${
          isInteracting ? "opacity-0" : "opacity-30 hover:opacity-70"
        }`}
      >
        <span className="text-[10px] font-mono text-[#FCEAF3]/35 tracking-widest uppercase">
          Move or drag to explore her 3D universe
        </span>
      </div>
    </div>
  );
}
