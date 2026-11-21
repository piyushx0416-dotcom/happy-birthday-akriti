"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as THREE from "three";

interface IglooSceneProps {
  scrollProgress: number; // Normalized 0 to 1
  scrollVelocity: number;
  onSelectMemory: (index: number) => void;
  selectedMemory: number | null;
  activeMorphIndex: number;
  onUpdateScreenPositions: (positions: Array<{ id: number; x: number; y: number; visible: boolean }>) => void;
  onUpdateBlueprintMarkers: (markers: Array<{ id: string; num: string; x: number; y: number; visible: boolean }>) => void;
}

const MEMORY_PHOTOS = [
  { id: 0, title: "WARM LIGHT SMILE", date: "MEM_01 // 2024", src: "/assets/akriti/heart-photo-01.jpg" },
  { id: 1, title: "ALIEN EARMUFFS", date: "MEM_02 // 2024", src: "/assets/akriti/heart-photo-02.jpg" },
  { id: 2, title: "LAKESIDE DRESS", date: "MEM_03 // 2023", src: "/assets/akriti/heart-photo-03.jpg" },
  { id: 3, title: "STRIPED TOP NOSE PIN", date: "MEM_04 // 2024", src: "/assets/akriti/heart-photo-04.jpg" },
  { id: 4, title: "SERENE FLORAL TOP", date: "MEM_05 // 2024", src: "/assets/akriti/heart-photo-05.jpg" },
  { id: 5, title: "WHITE SUNGLASSES", date: "MEM_06 // 2024", src: "/assets/akriti/heart-photo-06.jpg" },
  { id: 6, title: "EMERALD SARI PORTRAIT", date: "MEM_07 // 2023", src: "/assets/akriti/heart-photo-07.jpg" },
];

export default function IglooScene({
  scrollProgress,
  scrollVelocity,
  onSelectMemory,
  selectedMemory,
  activeMorphIndex,
  onUpdateScreenPositions,
  onUpdateBlueprintMarkers,
}: IglooSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Refs for scene components
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const iglooGroupRef = useRef<THREE.Group | null>(null);
  const monolithsGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const pedestalGroupRef = useRef<THREE.Group | null>(null);
  const particleCloudRef = useRef<THREE.Points | null>(null);
  const snowParticlesRef = useRef<THREE.Points | null>(null);
  const monolithMeshesRef = useRef<THREE.Mesh[]>([]);

  // Blueprint tracked blocks
  const blueprintMarkersRef = useRef<Array<{ id: string; num: string; mesh: THREE.Mesh }>>([]);

  // Particle Morph targets storage
  const particleTargetsRef = useRef<{ [key: number]: Float32Array }>({});
  const currentParticlePositionsRef = useRef<Float32Array | null>(null);

  // Mouse move handler for 3D parallax tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Click handler for 3D raycasting onto memory monoliths
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!cameraRef.current || !sceneRef.current) return;
      const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const intersects = raycaster.intersectObjects(monolithMeshesRef.current, true);
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !(obj.userData && obj.userData.memoryId !== undefined)) {
          obj = obj.parent;
        }
        if (obj && obj.userData.memoryId !== undefined) {
          onSelectMemory(obj.userData.memoryId);
        }
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [onSelectMemory]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene & Camera Setup (igloo.inc silver/frost palette) ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const skyColor = new THREE.Color(0xa8b6c2);
    scene.background = skyColor;
    scene.fog = new THREE.Fog(0xa8b6c2, 10, 68);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 1000);
    camera.position.set(0, 1.25, 13.0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- 2. Lighting (Cold Arctic Sunlight + Volumetric Igloo Glow) ---
    const hemiLight = new THREE.HemisphereLight(0xe4edf5, 0x768796, 1.2);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(18, 28, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 90;
    sunLight.shadow.camera.left = -22;
    sunLight.shadow.camera.right = 22;
    sunLight.shadow.camera.top = 22;
    sunLight.shadow.camera.bottom = -22;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    const fillBlue = new THREE.DirectionalLight(0x82b4d4, 0.7);
    fillBlue.position.set(-20, 12, -15);
    scene.add(fillBlue);

    // --- 3. Snowy Terrain & Mountain Ridges ---
    // Ground mesh with procedural snow drifts & elevated central mound
    const groundGeom = new THREE.PlaneGeometry(160, 160, 110, 110);
    groundGeom.rotateX(-Math.PI / 2);
    const posAttr = groundGeom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      const dist = Math.sqrt(vx * vx + vz * vz);

      // Elevated central snow mound where igloo sits
      let vy = Math.exp(-(dist * dist) / 38) * 1.05;

      // Natural undulating snowdrifts
      vy += Math.sin(vx * 0.07 + 0.3) * Math.cos(vz * 0.07) * 0.75;
      vy += Math.sin(vx * 0.16 + 1.2) * Math.cos(vz * 0.12) * 0.38;

      // Distant rolling mountain ridges around the perimeter
      if (dist > 22) {
        const edge = (dist - 22) / 45;
        vy += Math.sin(vx * 0.045) * Math.cos(vz * 0.045 + 0.5) * 10 * edge;
        vy += Math.abs(Math.sin(vx * 0.035 + 0.8)) * 8 * edge;
      }

      posAttr.setY(i, vy);
    }
    groundGeom.computeVertexNormals();

    const groundSnowMat = new THREE.MeshStandardMaterial({
      color: 0xcfdde7,
      roughness: 0.82,
      metalness: 0.04,
    });
    const groundMesh = new THREE.Mesh(groundGeom, groundSnowMat);
    groundMesh.receiveShadow = true;
    groundMesh.position.y = -1.25;
    scene.add(groundMesh);

    // Distant mountain ranges fading into the silvery fog
    const mountainGeom = new THREE.ConeGeometry(55, 30, 36);
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x8b9ca9,
      roughness: 0.94,
      metalness: 0.02,
    });
    const m1 = new THREE.Mesh(mountainGeom, mountainMat);
    m1.position.set(-42, 6, -45);
    scene.add(m1);

    const m2 = new THREE.Mesh(mountainGeom, mountainMat);
    m2.position.set(45, 8, -55);
    m2.scale.set(1.3, 1.25, 1.3);
    scene.add(m2);

    const m3 = new THREE.Mesh(mountainGeom, mountainMat);
    m3.position.set(8, 4, -60);
    m3.scale.set(1.15, 0.95, 1.15);
    scene.add(m3);

    // --- 4. Hero Stage: The Glowing Modular Ice Igloo (Matching igloo.inc Hero) ---
    const iglooGroup = new THREE.Group();
    iglooGroup.position.set(0, -0.28, 0);
    iglooGroupRef.current = iglooGroup;
    scene.add(iglooGroup);

    // Frosted Ice Material with Realistic Refraction & Subtle Blue Emissive Core
    const iceBlockMat = new THREE.MeshPhysicalMaterial({
      color: 0xd6e8f4,
      emissive: 0x122432,
      roughness: 0.28,
      metalness: 0.05,
      transmission: 0.62,
      thickness: 1.6,
      ior: 1.31,
      transparent: true,
      opacity: 0.95,
      reflectivity: 0.5,
    });

    const iglooBlocks: Array<{
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      baseRot: THREE.Euler;
      explodedPos: THREE.Vector3;
      explodedRot: THREE.Euler;
      isLevitating: boolean;
      levitateSpeed: number;
    }> = [];

    // Igloo dome parameters
    const domeRadius = 3.35;
    const blockHeight = 0.58;
    const blockDepth = 0.64;

    // Dome tiers / courses matching igloo.inc
    const tiers = [
      { y: 0.28, lat: 0.1, count: 14, isLevitating: false },
      { y: 0.82, lat: 0.3, count: 13, isLevitating: false },
      { y: 1.38, lat: 0.52, count: 11, isLevitating: false },
      { y: 1.95, lat: 0.74, count: 9, isLevitating: false },
      { y: 2.52, lat: 0.98, count: 7, isLevitating: true, levitateOffset: 0.75 },
      { y: 3.08, lat: 1.24, count: 5, isLevitating: true, levitateOffset: 1.45 },
      { y: 3.56, lat: 1.44, count: 3, isLevitating: true, levitateOffset: 2.2 },
    ];

    let blockCounter = 0;
    const trackedBlueprintBlocks: Array<{ id: string; num: string; mesh: THREE.Mesh }> = [];

    tiers.forEach((tier, tierIdx) => {
      const ringRadius = domeRadius * Math.cos(tier.lat);
      const angleStep = (Math.PI * 2) / tier.count;

      for (let j = 0; j < tier.count; j++) {
        const angle = j * angleStep;

        // Front doorway gap
        const isDoorwayZone = tierIdx <= 1 && Math.abs(angle - Math.PI * 1.5) < 0.48;
        if (isDoorwayZone) continue;

        const blockWidth = ((Math.PI * 2 * ringRadius) / tier.count) * 0.92;
        const geom = new THREE.BoxGeometry(blockWidth, blockHeight, blockDepth);
        geom.computeVertexNormals();

        const mesh = new THREE.Mesh(geom, iceBlockMat.clone());
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const bx = ringRadius * Math.cos(angle);
        const bz = ringRadius * Math.sin(angle);
        let by = tier.y;

        // Zero-gravity levitation for upper dome courses
        if (tier.isLevitating) {
          by += (tier.levitateOffset || 0.8) + Math.sin(j * 1.6) * 0.18;
        }

        const basePos = new THREE.Vector3(bx, by, bz);
        mesh.position.copy(basePos);

        // Slightly rounded orientation
        mesh.rotation.y = -angle + Math.PI / 2;
        mesh.rotation.x = -tier.lat * 0.4;
        mesh.rotation.z = Math.sin(angle) * 0.05;

        const baseRot = mesh.rotation.clone();

        // Exploded outward trajectory when scrolling
        const outwardDir = basePos.clone().normalize();
        const explodedPos = basePos.clone().add(
          outwardDir.multiplyScalar(7 + Math.random() * 8).add(new THREE.Vector3(0, Math.random() * 5 + 3, 0))
        );
        const explodedRot = new THREE.Euler(
          baseRot.x + (Math.random() - 0.5) * 2.8,
          baseRot.y + (Math.random() - 0.5) * 2.8,
          baseRot.z + (Math.random() - 0.5) * 2.8
        );

        iglooGroup.add(mesh);

        iglooBlocks.push({
          mesh,
          basePos,
          baseRot,
          explodedPos,
          explodedRot,
          isLevitating: tier.isLevitating,
          levitateSpeed: 0.6 + Math.random() * 0.5,
        });

        // Blueprint constellation crosshairs (+ 22, + 29, + 26, + 17, + 49)
        if (
          (tierIdx === 1 && j === 3) ||
          (tierIdx === 2 && j === 8) ||
          (tierIdx === 2 && j === 2) ||
          (tierIdx === 3 && j === 5) ||
          (tierIdx === 4 && j === 4)
        ) {
          const blueprintNumbers = ["22", "29", "26", "17", "49"];
          const num = blueprintNumbers[trackedBlueprintBlocks.length % blueprintNumbers.length];
          trackedBlueprintBlocks.push({
            id: `bp_${blockCounter}`,
            num,
            mesh,
          });
        }

        blockCounter++;
      }
    });

    blueprintMarkersRef.current = trackedBlueprintBlocks;

    // Entrance Archway Tunnel (extending forward along +Z)
    const archCount = 5;
    for (let a = 0; a < archCount; a++) {
      const archGeom = new THREE.BoxGeometry(0.52, 0.48, 0.5);
      const archMesh = new THREE.Mesh(archGeom, iceBlockMat.clone());
      archMesh.castShadow = true;
      archMesh.receiveShadow = true;

      const t = a / (archCount - 1);
      const archAngle = Math.PI * (0.15 + t * 0.7);
      const ax = Math.cos(archAngle) * 0.98;
      const ay = Math.sin(archAngle) * 0.98 + 0.35;
      const az = domeRadius * 0.96 + 0.5;

      archMesh.position.set(ax, ay, az);
      archMesh.rotation.z = -archAngle + Math.PI / 2;

      iglooGroup.add(archMesh);
    }

    // --- 5. Volumetric Interior Core Light (Pure White & Cyan Incandescence) ---
    // Intense point light inside the igloo that bursts through crevices and the entrance
    const coreLight = new THREE.PointLight(0xffffff, 16, 28);
    coreLight.position.set(0, 1.2, 0);
    iglooGroup.add(coreLight);

    const coreCyanGlow = new THREE.PointLight(0x00f0ff, 9, 20);
    coreCyanGlow.position.set(0, 1.1, 0);
    iglooGroup.add(coreCyanGlow);

    // Front ground door light beam (illuminates the snow outside the entrance)
    const doorBeamLight = new THREE.SpotLight(0xffffff, 14, 18, Math.PI / 4, 0.6, 1);
    doorBeamLight.position.set(0, 1.0, 1.5);
    doorBeamLight.target.position.set(0, -1.0, 7.0);
    iglooGroup.add(doorBeamLight);
    iglooGroup.add(doorBeamLight.target);

    // Glowing core crystal mesh inside
    const coreCrystalGeom = new THREE.OctahedronGeometry(1.0, 0);
    const coreCrystalMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.95,
    });
    const coreCrystal = new THREE.Mesh(coreCrystalGeom, coreCrystalMat);
    coreCrystal.position.set(0, 1.2, 0);
    iglooGroup.add(coreCrystal);

    // Blueprint 3D Line Segments connecting the tracked markers
    const bpLineGeom = new THREE.BufferGeometry();
    const bpPositions = new Float32Array(trackedBlueprintBlocks.length * 6);
    bpLineGeom.setAttribute("position", new THREE.BufferAttribute(bpPositions, 3));
    const bpLineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const bpLineSegments = new THREE.LineSegments(bpLineGeom, bpLineMat);
    scene.add(bpLineSegments);

    // --- 6. Stage 2: Glacial Aperture Tunnel & Blizzard Particles ---
    const ringsGroup = new THREE.Group();
    ringsGroup.position.set(0, 0, -30);
    ringsGroupRef.current = ringsGroup;
    scene.add(ringsGroup);

    // Concentric ice ring segments (from step_53_shot_1_04_crystal_shard_pinned.png)
    for (let r = 0; r < 4; r++) {
      const ringRadius = 5 + r * 2.8;
      const segmentCount = 6 + r * 2;
      for (let s = 0; s < segmentCount; s++) {
        const segGeom = new THREE.BoxGeometry(2.2, 0.45, 0.6);
        const segMesh = new THREE.Mesh(segGeom, iceBlockMat.clone());
        const theta = (s / segmentCount) * Math.PI * 2;
        segMesh.position.set(Math.cos(theta) * ringRadius, Math.sin(theta) * ringRadius, (r - 2) * 4);
        segMesh.rotation.z = theta + Math.PI / 2;
        ringsGroup.add(segMesh);
      }
    }

    // Drifting Arctic Snow Particles / Blizzard
    const snowCount = 450;
    const snowGeom = new THREE.BufferGeometry();
    const snowCoords = new Float32Array(snowCount * 3);
    for (let i = 0; i < snowCount; i++) {
      snowCoords[i * 3] = (Math.random() - 0.5) * 55;
      snowCoords[i * 3 + 1] = Math.random() * 25 - 2;
      snowCoords[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    snowGeom.setAttribute("position", new THREE.BufferAttribute(snowCoords, 3));
    const snowParticlesMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const snowParticles = new THREE.Points(snowGeom, snowParticlesMat);
    snowParticlesRef.current = snowParticles;
    scene.add(snowParticles);

    // --- 7. Stage 3: Floating Frozen Memory Cubes (igloo.inc PORTFOLIO_CO_02 OVERPASS Style) ---
    const monolithsGroup = new THREE.Group();
    monolithsGroup.position.set(0, 0, -65);
    monolithsGroupRef.current = monolithsGroup;
    scene.add(monolithsGroup);

    const textureLoader = new THREE.TextureLoader();
    monolithMeshesRef.current = [];

    MEMORY_PHOTOS.forEach((photo, idx) => {
      const monolithContainer = new THREE.Group();
      monolithContainer.userData = { memoryId: photo.id };

      // Outer Frosted Ice Block with beveled edges
      const blockGeom = new THREE.BoxGeometry(3.2, 4.4, 0.7);
      const iceBlockMesh = new THREE.Mesh(
        blockGeom,
        new THREE.MeshPhysicalMaterial({
          color: 0xebf5fb,
          roughness: 0.18,
          metalness: 0.05,
          transmission: 0.65,
          thickness: 1.8,
          ior: 1.34,
          transparent: true,
          opacity: 0.92,
        })
      );
      iceBlockMesh.castShadow = true;
      iceBlockMesh.userData = { memoryId: photo.id };
      monolithContainer.add(iceBlockMesh);
      monolithMeshesRef.current.push(iceBlockMesh);

      // Embedded Photo Plane inside the ice block
      textureLoader.load(photo.src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const photoMat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.94,
        });
        const photoGeom = new THREE.PlaneGeometry(2.7, 3.8);
        const photoMesh = new THREE.Mesh(photoGeom, photoMat);
        photoMesh.position.z = 0.05;
        photoMesh.userData = { memoryId: photo.id };
        monolithContainer.add(photoMesh);
        monolithMeshesRef.current.push(photoMesh);
      });

      // Spatial arrangement along an atmospheric orbital corridor
      const angle = (idx / MEMORY_PHOTOS.length) * Math.PI * 1.8 - Math.PI * 0.9;
      const radius = 10.5;
      const mx = Math.sin(angle) * radius;
      const my = ((idx % 3) - 1) * 2.2;
      const mz = -idx * 8.5;

      monolithContainer.position.set(mx, my, mz);
      monolithContainer.rotation.y = -angle * 0.5 + (Math.random() - 0.5) * 0.2;
      monolithContainer.rotation.x = (Math.random() - 0.5) * 0.15;

      monolithsGroup.add(monolithContainer);
    });

    // --- 8. Stage 4: Pudgy Point-Cloud Pedestal Finale (step_67_shot_1_15) ---
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.0, -135);
    pedestalGroupRef.current = pedestalGroup;
    scene.add(pedestalGroup);

    // Glowing concentric circular pedestal base on the floor
    const pedestalBaseGeom = new THREE.CylinderGeometry(6.5, 7.2, 0.4, 48);
    const pedestalBaseMat = new THREE.MeshStandardMaterial({
      color: 0x9fb2bf,
      roughness: 0.5,
      metalness: 0.3,
    });
    const pedestalBase = new THREE.Mesh(pedestalBaseGeom, pedestalBaseMat);
    pedestalBase.receiveShadow = true;
    pedestalGroup.add(pedestalBase);

    // Glowing neon cyan circular ring on the pedestal floor
    const ringFloorGeom = new THREE.RingGeometry(4.8, 5.1, 48);
    ringFloorGeom.rotateX(-Math.PI / 2);
    const ringFloorMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const ringFloorMesh = new THREE.Mesh(ringFloorGeom, ringFloorMat);
    ringFloorMesh.position.y = 0.22;
    pedestalGroup.add(ringFloorMesh);

    // Secondary concentric glow ring
    const ringFloor2Geom = new THREE.RingGeometry(3.2, 3.4, 48);
    ringFloor2Geom.rotateX(-Math.PI / 2);
    const ringFloor2Mesh = new THREE.Mesh(ringFloor2Geom, ringFloorMat.clone());
    ringFloor2Mesh.position.y = 0.23;
    pedestalGroup.add(ringFloor2Mesh);

    // 2,800 Frosted Particles for Morphing Sculpture
    const particleCount = 2800;
    const pGeom = new THREE.BufferGeometry();
    const initialPositions = new Float32Array(particleCount * 3);

    // Generate Shape 1: Pudgy Figure with Earmuffs (inspired by Akriti's pink earmuffs photo!)
    const shape1 = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const height = v * 3.5;
      const radius = 1.6 * (1.1 - (height / 3.5) * 0.3);

      let px = radius * Math.cos(theta);
      let py = height + 0.8;
      let pz = radius * Math.sin(theta);

      // Add earmuff bumps on the sides
      if (Math.abs(px) > 1.2 && py > 2.5) {
        px += (px > 0 ? 0.6 : -0.6);
      }

      shape1[i * 3] = px + (Math.random() - 0.5) * 0.15;
      shape1[i * 3 + 1] = py + (Math.random() - 0.5) * 0.15;
      shape1[i * 3 + 2] = pz + (Math.random() - 0.5) * 0.15;
    }

    // Generate Shape 2: 3D Volumetric Heart
    const shape2 = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = Math.PI * 2 * Math.random();
      const hx = 16 * Math.pow(Math.sin(t), 3) * 0.18;
      const hy = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.18 + 2.5;
      const depth = (Math.random() - 0.5) * 1.8 * (1 - Math.abs(t - Math.PI) / Math.PI);
      shape2[i * 3] = hx + (Math.random() - 0.5) * 0.2;
      shape2[i * 3 + 1] = hy + (Math.random() - 0.5) * 0.2;
      shape2[i * 3 + 2] = depth + (Math.random() - 0.5) * 0.2;
    }

    // Generate Shape 3: "AKRITI 19" Constellation Cloud
    const shape3 = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const lam = 2 * Math.PI * Math.random();
      const rad = 2.4 * Math.cbrt(Math.random());
      shape3[i * 3] = rad * Math.sin(phi) * Math.cos(lam);
      shape3[i * 3 + 1] = rad * Math.cos(phi) + 2.4;
      shape3[i * 3 + 2] = rad * Math.sin(phi) * Math.sin(lam) * 0.5;
    }

    particleTargetsRef.current = { 0: shape1, 1: shape2, 2: shape3 };
    currentParticlePositionsRef.current = new Float32Array(shape1);
    initialPositions.set(shape1);

    pGeom.setAttribute("position", new THREE.BufferAttribute(initialPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(pGeom, pMat);
    particleCloudRef.current = particleCloud;
    pedestalGroup.add(particleCloud);

    // --- 9. Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const nw = containerRef.current.clientWidth || window.innerWidth;
      const nh = containerRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = nw / nh;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    // --- 10. Animation Loop & Dynamic Scroll Flight Controller ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const p = scrollProgress; // 0 to 1

      // A. Camera Trajectory along Spline Flight Path
      if (cameraRef.current) {
        let camX = mouseRef.current.x * 0.5;
        let camY = 1.25;
        let camZ = 13.0;
        let targetLookAt = new THREE.Vector3(0, 1.1, 0);

        if (p < 0.2) {
          // Hero view: slight breathing orbit around snowy igloo
          const heroP = p / 0.2;
          camY = 1.25 + heroP * 6.2; // Starts rising to overhead
          camZ = 13.0 - heroP * 8.5; // Glides closer
          targetLookAt.set(0, 1.1 - heroP * 0.5, 0);
        } else if (p < 0.45) {
          // Overhead plunge through glowing roof into aperture tunnel
          const tP = (p - 0.2) / 0.25;
          camX = mouseRef.current.x * 1.2;
          camY = 7.45 - tP * 6.5;
          camZ = 4.5 - tP * 35.0;
          targetLookAt.set(0, 0, camZ - 10);
        } else if (p < 0.8) {
          // Gliding smoothly through floating frozen memory monoliths
          const mP = (p - 0.45) / 0.35;
          camX = Math.sin(mP * Math.PI * 2) * 2.5 + mouseRef.current.x * 0.8;
          camY = Math.cos(mP * Math.PI * 2) * 1.2 + 0.5;
          camZ = -30 - mP * 70;
          targetLookAt.set(0, 0, camZ - 15);
        } else {
          // Settling onto the Pudgy point-cloud pedestal
          const pedP = (p - 0.8) / 0.2;
          camX = mouseRef.current.x * 1.5;
          camY = 1.2 + (1 - pedP) * 1.5;
          camZ = -100 - pedP * 25; // Sits at -125 looking at pedestal at -135
          targetLookAt.set(0, 1.5, -135);
        }

        cameraRef.current.position.set(camX, camY, camZ);
        cameraRef.current.lookAt(targetLookAt);
      }

      // B. Animate Igloo Blocks (Hovering / Exploding based on scroll)
      if (iglooBlocks.length > 0) {
        const explodeFactor = Math.min(1, Math.max(0, (p - 0.05) / 0.25));

        iglooBlocks.forEach((b, idx) => {
          if (explodeFactor <= 0) {
            // Hero subtle zero-gravity levitation for top blocks
            if (b.isLevitating) {
              const lev = Math.sin(elapsedTime * b.levitateSpeed + idx) * 0.08;
              b.mesh.position.y = b.basePos.y + lev;
            } else {
              b.mesh.position.copy(b.basePos);
            }
            b.mesh.rotation.copy(b.baseRot);
          } else {
            // Smoothly disperse outwards as camera dives
            b.mesh.position.lerpVectors(b.basePos, b.explodedPos, explodeFactor);
            b.mesh.rotation.x = THREE.MathUtils.lerp(b.baseRot.x, b.explodedRot.x, explodeFactor);
            b.mesh.rotation.y = THREE.MathUtils.lerp(b.baseRot.y, b.explodedRot.y, explodeFactor);
            b.mesh.rotation.z = THREE.MathUtils.lerp(b.baseRot.z, b.explodedRot.z, explodeFactor);
          }
        });

        // Pulsing core light inside igloo
        const coreIntensity = 14 + Math.sin(elapsedTime * 2.5) * 3;
        coreLight.intensity = coreIntensity;
        coreCrystal.rotation.y = elapsedTime * 0.5;
        coreCrystal.rotation.x = elapsedTime * 0.3;
      }

      // C. Update Blueprint Constellation Lines & Tracked 2D Markers
      if (trackedBlueprintBlocks.length > 0 && cameraRef.current) {
        const bpPosAttr = bpLineGeom.attributes.position as THREE.BufferAttribute;
        const screenMarkers: Array<{ id: string; num: string; x: number; y: number; visible: boolean }> = [];

        for (let i = 0; i < trackedBlueprintBlocks.length; i++) {
          const currentMesh = trackedBlueprintBlocks[i].mesh;
          const nextMesh = trackedBlueprintBlocks[(i + 1) % trackedBlueprintBlocks.length].mesh;

          const v1 = new THREE.Vector3();
          const v2 = new THREE.Vector3();
          currentMesh.getWorldPosition(v1);
          nextMesh.getWorldPosition(v2);

          bpPosAttr.setXYZ(i * 2, v1.x, v1.y, v1.z);
          bpPosAttr.setXYZ(i * 2 + 1, v2.x, v2.y, v2.z);

          // Project to 2D screen space
          const proj = v1.clone().project(cameraRef.current);
          const isVisible = proj.z > 0 && proj.z < 1 && p < 0.25;
          const screenX = (proj.x * 0.5 + 0.5) * window.innerWidth;
          const screenY = (-(proj.y * 0.5) + 0.5) * window.innerHeight;

          screenMarkers.push({
            id: trackedBlueprintBlocks[i].id,
            num: trackedBlueprintBlocks[i].num,
            x: screenX,
            y: screenY,
            visible: isVisible,
          });
        }
        bpPosAttr.needsUpdate = true;
        onUpdateBlueprintMarkers(screenMarkers);
      }

      // D. Drift Arctic Blizzard Particles
      if (snowParticlesRef.current) {
        const pos = snowParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < snowCount; i++) {
          let sy = pos.getY(i) - 0.04;
          let sx = pos.getX(i) + Math.sin(elapsedTime * 0.5 + i) * 0.02;
          if (sy < -2) sy = 24;
          pos.setY(i, sy);
          pos.setX(i, sx);
        }
        pos.needsUpdate = true;
      }

      // E. Rotate Aperture Ice Rings
      if (ringsGroupRef.current) {
        ringsGroupRef.current.rotation.z = elapsedTime * 0.2;
      }

      // F. Smooth Morph of Pedestal Particle Cloud
      if (particleCloudRef.current && currentParticlePositionsRef.current) {
        const targetPositions = particleTargetsRef.current[activeMorphIndex] || particleTargetsRef.current[0];
        const currentPos = currentParticlePositionsRef.current;
        const geom = particleCloudRef.current.geometry;
        const posAttr = geom.attributes.position as THREE.BufferAttribute;

        for (let i = 0; i < particleCount * 3; i++) {
          currentPos[i] += (targetPositions[i] - currentPos[i]) * 0.08;
        }
        posAttr.copyArray(currentPos);
        posAttr.needsUpdate = true;
        particleCloudRef.current.rotation.y = elapsedTime * 0.25;
      }

      // G. Project 2D Screen Positions for Memory Monoliths
      if (cameraRef.current && monolithMeshesRef.current.length > 0 && p >= 0.45 && p <= 0.85) {
        const positions: Array<{ id: number; x: number; y: number; visible: boolean }> = [];
        monolithsGroup.children.forEach((child) => {
          const worldPos = new THREE.Vector3();
          child.getWorldPosition(worldPos);

          const proj = worldPos.clone().project(cameraRef.current!);
          const isVisible = proj.z > 0 && proj.z < 1;
          const sx = (proj.x * 0.5 + 0.5) * window.innerWidth;
          const sy = (-(proj.y * 0.5) + 0.5) * window.innerHeight;

          positions.push({
            id: child.userData.memoryId,
            x: sx,
            y: sy,
            visible: isVisible,
          });
        });
        onUpdateScreenPositions(positions);
      } else {
        onUpdateScreenPositions([]);
      }

      // Render Scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [onSelectMemory, activeMorphIndex, onUpdateScreenPositions, onUpdateBlueprintMarkers]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
