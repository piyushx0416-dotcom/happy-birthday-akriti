"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { Sparkles, Compass, Heart, Camera, BookOpen, Mail, Gift } from "lucide-react";

interface IslandProps {
  position: [number, number, number];
  scale?: [number, number, number];
  color: string;
  glowColor: string;
  rotationSpeed?: number;
}

// 3D Floating Island with Crystal & Stardust Elements
function FloatingIsland({ position, scale = [1, 1, 1], color, glowColor, rotationSpeed = 0.002 }: IslandProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8} position={position}>
      <group ref={meshRef} scale={scale}>
        {/* Island Base (Rugged inverted rock) */}
        <mesh position={[0, -0.6, 0]}>
          <coneGeometry args={[2.2, 2.5, 7]} />
          <meshStandardMaterial
            color="#140d28"
            roughness={0.85}
            metalness={0.2}
            flatShading
          />
        </mesh>

        {/* Island Surface Plateau */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[2.1, 2.2, 0.4, 7]} />
          <meshStandardMaterial
            color={color}
            roughness={0.6}
            metalness={0.3}
            flatShading
          />
        </mesh>

        {/* Glowing Crystal Formation */}
        <mesh position={[0, 1.2, 0]} rotation={[0.2, 0.4, 0]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color={glowColor}
            emissive={glowColor}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Delicate Golden Ring */}
        <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[2.4, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Stardust Waterfall Particle System
function StardustParticles({ count = 350 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Stream in a cylinder / waterfall plume
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8 + 1;
      p[i * 3] = Math.cos(angle) * radius;
      p[i * 3 + 1] = (Math.random() - 0.5) * 16;
      p[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= delta * 0.8;
        if (positions[i] < -8) {
          positions[i] = 8;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#f5e7c8"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Interactive Destination Portal in 3D Space
interface DestinationMarkerProps {
  position: [number, number, number];
  title: string;
  category: string;
  route: string;
  icon: any;
  glowColor: string;
}

function DestinationMarker({ position, title, category, route, icon: Icon, glowColor }: DestinationMarkerProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* 3D Pulsing Orb */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => router.push(route)}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={glowColor}
            emissive={glowColor}
            emissiveIntensity={hovered ? 1.5 : 0.7}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.8, 0.02, 16, 48]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={hovered ? 1.2 : 0.4}
          />
        </mesh>
      </Float>

      {/* HTML Annotation Label */}
      <Html position={[0, 1.2, 0]} center distanceFactor={12}>
        <button
          onClick={() => router.push(route)}
          className={`cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-xl glass-panel border flex items-center gap-2 whitespace-nowrap shadow-xl ${
            hovered
              ? "scale-110 border-gold-champagne bg-midnight-800/90 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              : "border-gold-metallic/30 bg-obsidian-950/80 hover:border-gold-champagne"
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-midnight-900 border border-violet-glow/40 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-gold-champagne" />
          </div>
          <div className="text-left">
            <div className="text-[9px] uppercase tracking-[0.2em] text-violet-glow font-medium leading-none">
              {category}
            </div>
            <div className="text-xs font-serif font-semibold text-ivory-warm tracking-wide mt-0.5">
              {title}
            </div>
          </div>
        </button>
      </Html>
    </group>
  );
}

// Main 3D World Component
export default function UniverseScene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 4, 14], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 15, 8]} intensity={1.2} color="#fbf7ee" />
        <pointLight position={[-8, -5, -8]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[8, 4, 6]} intensity={1.0} color="#d4af37" />

        {/* Central Core: The Star of Akriti */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial
              color="#f5e7c8"
              emissive="#f5e7c8"
              emissiveIntensity={0.9}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Celestial Orbital Rings */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[3.2, 0.04, 16, 100]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[3.8, 0.03, 16, 100]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.5} />
          </mesh>
        </Float>

        {/* Floating Islands across coordinates */}
        <FloatingIsland
          position={[-5.5, 1, -2]}
          scale={[1.1, 1.1, 1.1]}
          color="#241445"
          glowColor="#8b5cf6"
          rotationSpeed={0.003}
        />
        <FloatingIsland
          position={[5.8, 0.5, -3]}
          scale={[1.2, 1.2, 1.2]}
          color="#1e183a"
          glowColor="#d4af37"
          rotationSpeed={-0.002}
        />
        <FloatingIsland
          position={[-3, -2.5, 4]}
          scale={[0.8, 0.8, 0.8]}
          color="#2a1640"
          glowColor="#e2b4bd"
          rotationSpeed={0.004}
        />
        <FloatingIsland
          position={[4, -2, 3.5]}
          scale={[0.9, 0.9, 0.9]}
          color="#1a1532"
          glowColor="#a855f7"
          rotationSpeed={-0.003}
        />

        {/* Stardust particles & falling celestial water */}
        <StardustParticles count={450} />

        {/* 6 Destination Portals */}
        <DestinationMarker
          position={[-5.5, 2.5, -2]}
          title="The World of Her"
          category="3D Character"
          route="/her"
          icon={Heart}
          glowColor="#f472b6"
        />
        <DestinationMarker
          position={[5.8, 2, -3]}
          title="The Museum of Her"
          category="Exhibition"
          route="/museum"
          icon={Camera}
          glowColor="#ebd39b"
        />
        <DestinationMarker
          position={[-3, -1, 4]}
          title="The Fairytale"
          category="5-Chapter Story"
          route="/fairytale"
          icon={BookOpen}
          glowColor="#c084fc"
        />
        <DestinationMarker
          position={[4, -0.6, 3.5]}
          title="365 Reasons"
          category="Archive"
          route="/reasons"
          icon={Sparkles}
          glowColor="#f5e7c8"
        />
        <DestinationMarker
          position={[0, 4, -4]}
          title="The Birthday Room"
          category="Grand Celebration"
          route="/birthday"
          icon={Gift}
          glowColor="#d4af37"
        />
        <DestinationMarker
          position={[0, -3.2, 1]}
          title="Open When Letters"
          category="8 Envelopes"
          route="/letters"
          icon={Mail}
          glowColor="#e2b4bd"
        />

        <OrbitControls
          enableZoom={true}
          maxDistance={24}
          minDistance={6}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.5}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
