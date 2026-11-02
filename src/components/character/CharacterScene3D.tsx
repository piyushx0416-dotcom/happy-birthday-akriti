"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  Ring,
  Sphere,
  Cylinder,
  MeshDistortMaterial,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Custom GLB loader component if user has placed /assets/models/her-character.glb
 */
function CustomGLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      // Subtle idle breathing
      const t = state.clock.getElapsedTime();
      modelRef.current.position.y = -0.5 + Math.sin(t * 1.5) * 0.03;
      modelRef.current.rotation.y = Math.sin(t * 0.5) * 0.08;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.2} position={[0, -0.5, 0]} />;
}

/**
 * Procedural 3D Cosmic Fantasy Hero Character & Pedestal
 * Sculpted to match Akriti's distinguishing traits:
 * - Natural dark black hair with soft waves and parted crown
 * - Soft oval facial structure & warm natural complexion
 * - Expressive dark brown eyes
 * - Small shimmering gold nose stud and delicate hoop earrings
 * - Ivory fantasy gown with champagne-gold sash and hem details
 * - Floating crystalline island with dual rotating rune rings
 * - Idle breathing, subtle head tilt, and hair sway animations
 */
export function CharacterScene3D() {
  const characterGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const hairGroupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const starlightCoreRef = useRef<THREE.Mesh>(null);

  const [hasCustomGLB, setHasCustomGLB] = useState<boolean>(false);

  useEffect(() => {
    // Check if her-character.glb is available
    fetch("/assets/models/her-character.glb", { method: "HEAD" })
      .then((res) => {
        if (res.ok && res.headers.get("content-length") !== "0") {
          setHasCustomGLB(true);
        }
      })
      .catch(() => setHasCustomGLB(false));
  }, []);

  // Procedural constellation points
  const constellationCount = 42;
  const constellationPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i < constellationCount; i++) {
      const radius = 2.4 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      points.push([
        radius * Math.cos(phi) * Math.cos(theta),
        radius * Math.sin(phi) + 0.6,
        radius * Math.cos(phi) * Math.sin(theta),
      ]);
    }
    return points;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Idle breathing animation (natural 3.5s respiratory rhythm)
    if (characterGroupRef.current) {
      const breath = Math.sin(t * 1.8);
      characterGroupRef.current.position.y = -0.3 + breath * 0.025;
      // Gentle subtle chest expansion
      characterGroupRef.current.scale.set(
        1 + breath * 0.008,
        1 + breath * 0.012,
        1 + breath * 0.008
      );
    }

    // 2. Subtle head movement & contemplative gaze
    if (headGroupRef.current) {
      headGroupRef.current.rotation.y = Math.sin(t * 0.6) * 0.06;
      headGroupRef.current.rotation.x = Math.sin(t * 0.9) * 0.03;
      headGroupRef.current.rotation.z = Math.sin(t * 0.4) * 0.02;
    }

    // 3. Gentle hair breeze sway
    if (hairGroupRef.current) {
      hairGroupRef.current.rotation.z = Math.sin(t * 1.2) * 0.03;
      hairGroupRef.current.rotation.y = Math.cos(t * 0.8) * 0.04;
    }

    // 4. Rotating cosmic rune rings
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = t * 0.2;
      outerRingRef.current.rotation.z = Math.sin(t * 0.3) * 0.15;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -t * 0.35;
      innerRingRef.current.rotation.x = Math.cos(t * 0.4) * 0.12;
    }

    // 5. Floating starlight core
    if (starlightCoreRef.current) {
      starlightCoreRef.current.rotation.y = t * 0.8;
      starlightCoreRef.current.rotation.x = t * 0.5;
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Cinematic Lighting Rig */}
      <ambientLight intensity={0.5} color="#C5B2E8" />
      {/* Key Light: Warm Champagne Gold */}
      <directionalLight
        position={[4, 8, 4]}
        intensity={2.2}
        color="#F8E5C8"
        castShadow
      />
      {/* Rim Light: Deep Purple & Lavender */}
      <pointLight position={[-4, 2, -3]} intensity={2.8} color="#9E82D1" />
      {/* Front Soft Fill Light: Dusty Pink Glow */}
      <pointLight position={[0, 2, 3]} intensity={1.6} color="#DDAEBC" />
      {/* Bottom Up-Light: Golden Reflection */}
      <pointLight position={[0, -2, 1]} intensity={1.2} color="#D6BD8B" />

      {/* Floating Island & Runes */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
        {/* Main Floating Island Pedestal (Polished Obsidian & Gold) */}
        <mesh position={[0, -1.3, 0]} receiveShadow>
          <cylinderGeometry args={[2.2, 1.4, 0.45, 48]} />
          <meshStandardMaterial
            color="#140E24"
            roughness={0.2}
            metalness={0.85}
            emissive="#2A1B45"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Lower Inset Pedestal Rim */}
        <mesh position={[0, -1.05, 0]}>
          <cylinderGeometry args={[1.9, 2.05, 0.1, 48]} />
          <meshStandardMaterial
            color="#D6BD8B"
            roughness={0.2}
            metalness={0.9}
            emissive="#A38A52"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Outer Rotating Golden Rune Ring */}
        <group ref={outerRingRef} position={[0, -0.4, 0]}>
          <Ring args={[2.55, 2.6, 64]} rotation={[Math.PI / 3.5, 0, 0]}>
            <meshStandardMaterial
              color="#D6BD8B"
              emissive="#D6BD8B"
              emissiveIntensity={0.7}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.85}
            />
          </Ring>
        </group>

        {/* Inner Counter-Rotating Lavender Rune Ring */}
        <group ref={innerRingRef} position={[0, 0.1, 0]}>
          <Ring args={[2.85, 2.88, 64]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
            <meshStandardMaterial
              color="#C5B2E8"
              emissive="#C5B2E8"
              emissiveIntensity={0.6}
              metalness={0.7}
              roughness={0.2}
              transparent
              opacity={0.75}
            />
          </Ring>
        </group>

        {/* Distant Floating Mini Crystals */}
        {[-2.2, 2.4, -1.8, 1.9].map((x, i) => (
          <mesh
            key={i}
            position={[x, -0.7 + (i % 2) * 0.4, (i % 3) - 1]}
            rotation={[0.3 * i, 0.5 * i, 0.2]}
          >
            <octahedronGeometry args={[0.15 + (i % 2) * 0.08]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#D6BD8B" : "#C5B2E8"}
              emissive={i % 2 === 0 ? "#D6BD8B" : "#C5B2E8"}
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>
        ))}

        {/* Character Presentation (Custom GLB OR Procedural Fantasy Avatar) */}
        {hasCustomGLB ? (
          <Suspense fallback={null}>
            <CustomGLBModel url="/assets/models/her-character.glb" />
          </Suspense>
        ) : (
          /* Procedural Fantasy Character Model */
          <group ref={characterGroupRef} position={[0, -0.3, 0]}>
            {/* Flowing Ivory Dress Silhouette */}
            <mesh position={[0, 0.0, 0]}>
              <coneGeometry args={[1.05, 1.95, 36, 1, true]} />
              <meshStandardMaterial
                color="#FAF6EE"
                emissive="#DDAEBC"
                emissiveIntensity={0.2}
                roughness={0.35}
                metalness={0.2}
                side={THREE.DoubleSide}
                transparent
                opacity={0.95}
              />
            </mesh>

            {/* Dress Champagne-Gold Hem Embroidery Ring */}
            <Ring
              args={[0.98, 1.06, 48]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -0.92, 0]}
            >
              <meshStandardMaterial
                color="#D6BD8B"
                emissive="#D6BD8B"
                emissiveIntensity={0.8}
                metalness={0.9}
              />
            </Ring>

            {/* Upper Bodice & Corset with Gold Inlay */}
            <mesh position={[0, 1.05, 0]}>
              <cylinderGeometry args={[0.32, 0.44, 0.65, 28]} />
              <meshStandardMaterial
                color="#FFFDF9"
                roughness={0.3}
                metalness={0.3}
                emissive="#EFE2C5"
                emissiveIntensity={0.25}
              />
            </mesh>

            {/* Champagne-Gold Waist Belt / Sash */}
            <Ring
              args={[0.42, 0.47, 36]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.76, 0]}
            >
              <meshStandardMaterial
                color="#D6BD8B"
                emissive="#D6BD8B"
                emissiveIntensity={0.9}
                metalness={0.9}
                roughness={0.15}
              />
            </Ring>

            {/* Delicate Shoulders & Neck */}
            <mesh position={[0, 1.45, 0]}>
              <cylinderGeometry args={[0.16, 0.22, 0.25, 20]} />
              <meshStandardMaterial
                color="#F0D5BE" // Warm natural skin tone
                roughness={0.5}
                metalness={0.05}
              />
            </mesh>

            {/* Head & Face Group (Natural Oval Proportions) */}
            <group ref={headGroupRef} position={[0, 1.68, 0]}>
              {/* Soft Oval Head Geometry */}
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.31, 36, 36]} />
                <meshStandardMaterial
                  color="#F0D5BE" // Akriti's warm natural skin
                  roughness={0.45}
                  metalness={0.06}
                />
              </mesh>

              {/* Expressive Dark Brown Eyes */}
              {/* Left Eye */}
              <mesh position={[0.1, 0.04, 0.27]}>
                <sphereGeometry args={[0.038, 16, 16]} />
                <meshBasicMaterial color="#2B1810" />
              </mesh>
              {/* Right Eye */}
              <mesh position={[-0.1, 0.04, 0.27]}>
                <sphereGeometry args={[0.038, 16, 16]} />
                <meshBasicMaterial color="#2B1810" />
              </mesh>

              {/* Eye Specular Starlight Glimmer */}
              <mesh position={[0.11, 0.055, 0.3]}>
                <sphereGeometry args={[0.01, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[-0.09, 0.055, 0.3]}>
                <sphereGeometry args={[0.01, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>

              {/* Naturally Defined Eyebrows */}
              <mesh position={[0.1, 0.1, 0.27]} rotation={[0, 0, -0.1]}>
                <boxGeometry args={[0.08, 0.015, 0.02]} />
                <meshBasicMaterial color="#1A1215" />
              </mesh>
              <mesh position={[-0.1, 0.1, 0.27]} rotation={[0, 0, 0.1]}>
                <boxGeometry args={[0.08, 0.015, 0.02]} />
                <meshBasicMaterial color="#1A1215" />
              </mesh>

              {/* Subtle Delicate Nose */}
              <mesh position={[0, -0.02, 0.3]}>
                <sphereGeometry args={[0.032, 16, 16]} />
                <meshStandardMaterial color="#E6C8B0" roughness={0.5} />
              </mesh>

              {/* Signature Shimmering Nose Stud (Right Nostril) */}
              <mesh position={[0.042, -0.02, 0.31]}>
                <sphereGeometry args={[0.012, 12, 12]} />
                <meshStandardMaterial
                  color="#FFF4DE"
                  emissive="#FFDF88"
                  emissiveIntensity={1.8}
                  metalness={0.95}
                  roughness={0.1}
                />
              </mesh>

              {/* Signature Small Hoop Earrings */}
              {/* Left Hoop */}
              <mesh position={[0.31, -0.03, 0]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.04, 0.009, 12, 24]} />
                <meshStandardMaterial
                  color="#D6BD8B"
                  emissive="#D6BD8B"
                  emissiveIntensity={0.8}
                  metalness={0.95}
                />
              </mesh>
              {/* Right Hoop */}
              <mesh position={[-0.31, -0.03, 0]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.04, 0.009, 12, 24]} />
                <meshStandardMaterial
                  color="#D6BD8B"
                  emissive="#D6BD8B"
                  emissiveIntensity={0.8}
                  metalness={0.95}
                />
              </mesh>

              {/* Floating Golden Halo / Starlight Tiara */}
              <Ring
                args={[0.36, 0.4, 36]}
                rotation={[-Math.PI / 3, 0, 0]}
                position={[0, 0.36, -0.06]}
              >
                <meshStandardMaterial
                  color="#D6BD8B"
                  emissive="#D6BD8B"
                  emissiveIntensity={1.2}
                  metalness={0.9}
                  roughness={0.1}
                />
              </Ring>
            </group>

            {/* Flowing Dark Black Wavy Hair Group */}
            <group ref={hairGroupRef} position={[0, 1.68, 0]}>
              {/* Crown Hair Volume (Middle-parted curvature) */}
              <mesh position={[0, 0.08, -0.06]}>
                <sphereGeometry
                  args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.72]}
                />
                <meshStandardMaterial
                  color="#08060A" // Rich dark black hair
                  roughness={0.3}
                  metalness={0.2}
                />
              </mesh>

              {/* Cascading Soft Waves (Left Shoulder) */}
              <mesh position={[0.26, -0.4, -0.05]} rotation={[0.1, 0, -0.15]}>
                <cylinderGeometry args={[0.1, 0.16, 0.95, 18]} />
                <meshStandardMaterial
                  color="#08060A"
                  roughness={0.3}
                  metalness={0.2}
                />
              </mesh>

              {/* Cascading Soft Waves (Right Shoulder) */}
              <mesh position={[-0.26, -0.4, -0.05]} rotation={[0.1, 0, 0.15]}>
                <cylinderGeometry args={[0.1, 0.16, 0.95, 18]} />
                <meshStandardMaterial
                  color="#08060A"
                  roughness={0.3}
                  metalness={0.2}
                />
              </mesh>

              {/* Back Hair Flow */}
              <mesh position={[0, -0.45, -0.18]} rotation={[-0.1, 0, 0]}>
                <cylinderGeometry args={[0.18, 0.28, 1.05, 20]} />
                <meshStandardMaterial
                  color="#08060A"
                  roughness={0.35}
                  metalness={0.15}
                />
              </mesh>
            </group>

            {/* Glowing Starlight Heart / Core */}
            <Sphere
              ref={starlightCoreRef}
              args={[0.16, 32, 32]}
              position={[0, 1.05, 0.2]}
            >
              <MeshDistortMaterial
                color="#D6BD8B"
                emissive="#FFF7E6"
                emissiveIntensity={1.0}
                distort={0.4}
                speed={3}
                roughness={0.1}
                metalness={0.3}
              />
            </Sphere>
          </group>
        )}

        {/* Floating Constellation Stars */}
        {constellationPoints.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.024, 10, 10]} />
            <meshBasicMaterial
              color={idx % 2 === 0 ? "#D6BD8B" : "#C5B2E8"}
            />
          </mesh>
        ))}

        {/* Ambient Stardust Particles */}
        <Sparkles
          count={140}
          scale={6.0}
          size={2.8}
          speed={0.4}
          color="#D6BD8B"
          opacity={0.85}
        />
        <Sparkles
          count={90}
          scale={4.8}
          size={3.2}
          speed={0.3}
          color="#C5B2E8"
          opacity={0.7}
        />
      </Float>
    </group>
  );
}
