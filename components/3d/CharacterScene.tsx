"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Sparkles, MessageCircleHeart } from "lucide-react";

interface CharacterSceneProps {
  onInteract?: (dialogue: string) => void;
}

const DIALOGUES = [
  "Well, look who's here.",
  "Welcome to your little universe.",
  "You deserve all the magic in the world.",
  "At 19, you stand at the threshold of greatness.",
  "Out of all the universes, I'm glad yours exists in mine.",
  "Every star tonight shines in your honor."
];

// Procedural Stylized 3D Avatar representing Akriti
function StylizedCharacterMesh({ onSay }: { onSay: (text: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const hairRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftEarringRef = useRef<THREE.Mesh>(null);
  const rightEarringRef = useRef<THREE.Mesh>(null);

  const [dialogueIndex, setDialogueIndex] = useState(0);

  // Subtle breathing, gentle head tilt, and blinking
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Breathing (subtle y expansion & slight tilt)
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.04;
    }

    // Gentle head sway
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.08;
      headRef.current.rotation.z = Math.sin(t * 0.6) * 0.02;
    }

    // Hair sway
    if (hairRef.current) {
      hairRef.current.rotation.z = Math.sin(t * 1.2) * 0.03;
    }

    // Subtle blink cycle (squash eye scale every ~4 seconds)
    const blinkCycle = Math.sin(t * 1.8);
    if (leftEyeRef.current && rightEyeRef.current) {
      const isBlinking = blinkCycle > 0.96;
      leftEyeRef.current.scale.y = isBlinking ? 0.1 : 1;
      rightEyeRef.current.scale.y = isBlinking ? 0.1 : 1;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    const nextIdx = (dialogueIndex + 1) % DIALOGUES.length;
    setDialogueIndex(nextIdx);
    onSay(DIALOGUES[nextIdx]);
  };

  return (
    <group ref={groupRef} position={[0, -1.8, 0]} onClick={handleClick}>
      {/* --- HEAD GROUP --- */}
      <group ref={headRef} position={[0, 2.5, 0]}>
        {/* Soft Oval Head (Warm skin tone) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#d89f7f"
            roughness={0.65}
            metalness={0.05}
          />
        </mesh>

        {/* Delicate Nose */}
        <mesh position={[0, -0.05, 0.52]} rotation={[-0.2, 0, 0]}>
          <coneGeometry args={[0.07, 0.16, 16]} />
          <meshStandardMaterial color="#cf9474" roughness={0.7} />
        </mesh>

        {/* Small Nose Stud (Champagne diamond glimmer) */}
        <mesh position={[0.08, -0.07, 0.51]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1.5}
            roughness={0.1}
            metalness={1.0}
          />
        </mesh>

        {/* Defined Eyebrows */}
        <mesh position={[-0.18, 0.16, 0.48]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.18, 0.028, 0.02]} />
          <meshStandardMaterial color="#110d18" roughness={0.9} />
        </mesh>
        <mesh position={[0.18, 0.16, 0.48]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.18, 0.028, 0.02]} />
          <meshStandardMaterial color="#110d18" roughness={0.9} />
        </mesh>

        {/* Expressive Dark Brown Eyes */}
        <group position={[-0.18, 0.06, 0.49]}>
          {/* Eyeball white */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#faf6f0" roughness={0.3} />
          </mesh>
          {/* Iris (Dark brown / honey amber ring) */}
          <mesh ref={leftEyeRef} position={[0, 0, 0.05]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#301b0f" roughness={0.2} metalness={0.3} />
          </mesh>
        </group>

        <group position={[0.18, 0.06, 0.49]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#faf6f0" roughness={0.3} />
          </mesh>
          <mesh ref={rightEyeRef} position={[0, 0, 0.05]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#301b0f" roughness={0.2} metalness={0.3} />
          </mesh>
        </group>

        {/* Soft Natural Lips */}
        <mesh position={[0, -0.22, 0.48]} rotation={[0.05, 0, 0]}>
          <capsuleGeometry args={[0.045, 0.14, 8, 16]} />
          <meshStandardMaterial color="#b7666f" roughness={0.4} />
        </mesh>

        {/* Small Hoop Earrings (Gold) */}
        <mesh ref={leftEarringRef} position={[-0.54, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.085, 0.016, 16, 32]} />
          <meshStandardMaterial
            color="#f5e7c8"
            emissive="#d4af37"
            emissiveIntensity={0.5}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={rightEarringRef} position={[0.54, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.085, 0.016, 16, 32]} />
          <meshStandardMaterial
            color="#f5e7c8"
            emissive="#d4af37"
            emissiveIntensity={0.5}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Long, Thick, Flowing Dark Black Hair with Natural Soft Waves */}
        <group ref={hairRef}>
          {/* Crown & Volume */}
          <mesh position={[0, 0.2, -0.08]}>
            <sphereGeometry args={[0.62, 32, 32]} />
            <meshStandardMaterial color="#08060d" roughness={0.4} />
          </mesh>

          {/* Flowing Waves - Left Front */}
          <mesh position={[-0.38, -0.4, 0.12]} rotation={[0.1, 0.1, 0.15]}>
            <cylinderGeometry args={[0.14, 0.18, 1.3, 16]} />
            <meshStandardMaterial color="#0d0915" roughness={0.45} />
          </mesh>

          {/* Flowing Waves - Right Front */}
          <mesh position={[0.38, -0.4, 0.12]} rotation={[0.1, -0.1, -0.15]}>
            <cylinderGeometry args={[0.14, 0.18, 1.3, 16]} />
            <meshStandardMaterial color="#0d0915" roughness={0.45} />
          </mesh>

          {/* Back Waterfall of Waves */}
          <mesh position={[0, -0.6, -0.3]} rotation={[-0.1, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.55, 1.8, 16]} />
            <meshStandardMaterial color="#07050a" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* --- NECK & UPPER BODY --- */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.16, 0.22, 0.45, 16]} />
        <meshStandardMaterial color="#d89f7f" roughness={0.65} />
      </mesh>

      {/* --- ELEGANT IVORY FANTASY GOWN --- */}
      {/* Bodice / Corset with Champagne Gold Detailing */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.34, 0.38, 0.85, 24]} />
        <meshStandardMaterial
          color="#fdfbf7"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Gold Embroidery Trim along Neckline */}
      <mesh position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.025, 16, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.6}
          metalness={0.9}
        />
      </mesh>

      {/* Waistband (Champagne Gold Silk Ribbon) */}
      <mesh position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.39, 0.035, 16, 32]} />
        <meshStandardMaterial
          color="#f5e7c8"
          emissive="#d4af37"
          emissiveIntensity={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Flowing Skirt (Voluminous Fantasy Gown) */}
      <mesh position={[0, -0.4, 0]}>
        <coneGeometry args={[1.35, 2.3, 32]} />
        <meshStandardMaterial
          color="#fbf7ef"
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* Flowing Gold Lace Hem Overlay */}
      <mesh position={[0, -1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.36, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.5}
          metalness={0.95}
        />
      </mesh>

      {/* --- CELESTIAL STARDUST AURA --- */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh position={[0, 1.5, 0]}>
          <ringGeometry args={[1.5, 1.52, 64]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function CharacterScene({ onInteract }: CharacterSceneProps) {
  const [currentSpeech, setCurrentSpeech] = useState(
    "Welcome to your little universe. Touch me to hear what the stars whisper."
  );

  const handleSay = (text: string) => {
    setCurrentSpeech(text);
    if (onInteract) onInteract(text);
  };

  return (
    <div className="w-full h-[580px] sm:h-[650px] relative rounded-3xl overflow-hidden glass-panel border border-gold-metallic/30 shadow-2xl">
      {/* Interactive Dialogue Speech Bubble */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-center pointer-events-none">
        <div className="glass-panel px-6 py-3 rounded-2xl border-gold-metallic/40 max-w-md shadow-2xl backdrop-blur-2xl flex items-center gap-3 animate-pulse-glow">
          <MessageCircleHeart className="w-5 h-5 text-gold-metallic shrink-0" />
          <p className="font-serif text-sm sm:text-base text-gold-champagne italic text-center">
            “{currentSpeech}”
          </p>
        </div>
      </div>

      {/* Interactive Hint */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 text-[11px] tracking-wider text-ivory-warm/60 uppercase pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
        <span>Click character to speak • Drag to rotate</span>
      </div>

      <Canvas
        camera={{ position: [0, 1.2, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} color="#fef3c7" />
        <pointLight position={[-4, 2, 2]} intensity={1.2} color="#8b5cf6" />
        <pointLight position={[3, -1, 3]} intensity={0.9} color="#d4af37" />
        <spotLight
          position={[0, 6, 2]}
          angle={0.6}
          penumbra={0.8}
          intensity={2.0}
          color="#ffffff"
        />

        <StylizedCharacterMesh onSay={handleSay} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.3}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
