"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  Ring,
  Sphere,
  MeshDistortMaterial,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural 3D Cosmic Hero Character & Pedestal
 * Renders an ethereal fantasy scene with floating islands, rune rings,
 * stardust particles, and dynamic lighting.
 * If a custom .glb is placed in /assets/models/her-character.glb, it can be loaded.
 */
export function CharacterScene3D() {
  const ringsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [modelAvailable, setModelAvailable] = useState<boolean>(false);

  useEffect(() => {
    // Check if her-character.glb is actually present on server
    fetch("/assets/models/her-character.glb", { method: "HEAD" })
      .then((res) => {
        if (res.ok && res.headers.get("content-type")?.includes("octet-stream")) {
          setModelAvailable(true);
        }
      })
      .catch(() => setModelAvailable(false));
  }, []);

  // Procedural constellation points
  const constellationCount = 35;
  const constellationPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i < constellationCount; i++) {
      const radius = 2.2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      points.push([
        radius * Math.cos(phi) * Math.cos(theta),
        radius * Math.sin(phi) + 0.5,
        radius * Math.cos(phi) * Math.sin(theta),
      ]);
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.25;
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Dynamic Key Lighting */}
      <ambientLight intensity={0.4} color="#C5B2E8" />
      <directionalLight position={[4, 8, 4]} intensity={1.5} color="#D6BD8B" />
      <pointLight position={[-4, -2, -2]} intensity={2.0} color="#30204D" />
      <pointLight position={[0, 3, 2]} intensity={1.8} color="#DDAEBC" />

      {/* Floating Island Pedestal */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Main Base Crystal */}
        <mesh position={[0, -1.2, 0]} receiveShadow>
          <cylinderGeometry args={[2.0, 1.2, 0.4, 32]} />
          <meshStandardMaterial
            color="#171126"
            roughness={0.2}
            metalness={0.8}
            emissive="#30204D"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Golden Rune Ring 1 */}
        <Ring
          args={[2.05, 2.15, 64]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.0, 0]}
        >
          <meshStandardMaterial
            color="#D6BD8B"
            emissive="#D6BD8B"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </Ring>

        {/* Golden Rune Ring 2 (Outer Floating) */}
        <group ref={ringsRef} position={[0, 0.2, 0]}>
          <Ring args={[2.5, 2.53, 64]} rotation={[Math.PI / 4, 0, 0]}>
            <meshStandardMaterial
              color="#D6BD8B"
              emissive="#D6BD8B"
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
            />
          </Ring>
          <Ring args={[2.8, 2.82, 64]} rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
            <meshStandardMaterial
              color="#C5B2E8"
              emissive="#C5B2E8"
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </Ring>
        </group>

        {/* Celestial Ethereal Avatar Representation */}
        <group position={[0, 0.5, 0]}>
          {/* Ethereal Stylized Dress Silhouette */}
          <mesh position={[0, -0.2, 0]}>
            <coneGeometry args={[0.9, 1.8, 32, 1, true]} />
            <meshStandardMaterial
              color="#F5F0E8"
              emissive="#DDAEBC"
              emissiveIntensity={0.25}
              roughness={0.4}
              metalness={0.2}
              side={THREE.DoubleSide}
              transparent
              opacity={0.92}
            />
          </mesh>

          {/* Torso & Upper Garment with Gold Trim */}
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.3, 0.45, 0.6, 24]} />
            <meshStandardMaterial
              color="#FAF7F2"
              emissive="#D6BD8B"
              emissiveIntensity={0.3}
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>

          {/* Golden Waist Sash */}
          <Ring
            args={[0.42, 0.46, 32]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.52, 0]}
          >
            <meshStandardMaterial
              color="#D6BD8B"
              emissive="#D6BD8B"
              emissiveIntensity={0.9}
            />
          </Ring>

          {/* Stylized Head with Warm Skin & Dark Hair Crown */}
          <mesh position={[0, 1.35, 0]}>
            <sphereGeometry args={[0.32, 32, 32]} />
            <meshStandardMaterial
              color="#F0D5BE" // Warm natural skin tone
              roughness={0.5}
              metalness={0.05}
            />
          </mesh>

          {/* Dark Black Flowing Hair Volume */}
          <mesh position={[0, 1.45, -0.06]}>
            <sphereGeometry args={[0.36, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
            <meshStandardMaterial
              color="#0A080D" // Natural dark black hair
              roughness={0.3}
              metalness={0.15}
            />
          </mesh>

          {/* Cascading Hair Strands */}
          <mesh position={[0.22, 1.0, -0.1]}>
            <cylinderGeometry args={[0.08, 0.14, 0.9, 16]} />
            <meshStandardMaterial color="#0A080D" roughness={0.3} />
          </mesh>
          <mesh position={[-0.22, 1.0, -0.1]}>
            <cylinderGeometry args={[0.08, 0.14, 0.9, 16]} />
            <meshStandardMaterial color="#0A080D" roughness={0.3} />
          </mesh>

          {/* Golden Halo / Starlight Tiara */}
          <Ring
            args={[0.38, 0.42, 32]}
            rotation={[-Math.PI / 3, 0, 0]}
            position={[0, 1.7, -0.05]}
          >
            <meshStandardMaterial
              color="#D6BD8B"
              emissive="#D6BD8B"
              emissiveIntensity={1.2}
            />
          </Ring>

          {/* Floating Heart Core / Starlight Essence */}
          <Sphere ref={coreRef} args={[0.18, 32, 32]} position={[0, 0.82, 0.2]}>
            <MeshDistortMaterial
              color="#D6BD8B"
              emissive="#FFF4DE"
              emissiveIntensity={0.8}
              distort={0.4}
              speed={3}
              roughness={0.1}
            />
          </Sphere>
        </group>

        {/* Floating Constellation Stars */}
        {constellationPoints.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial
              color={idx % 2 === 0 ? "#D6BD8B" : "#C5B2E8"}
            />
          </mesh>
        ))}

        {/* Ambient Stardust particles */}
        <Sparkles
          count={120}
          scale={5.5}
          size={2.5}
          speed={0.4}
          color="#D6BD8B"
          opacity={0.8}
        />
        <Sparkles
          count={80}
          scale={4.0}
          size={3.0}
          speed={0.3}
          color="#C5B2E8"
          opacity={0.6}
        />
      </Float>
    </group>
  );
}
