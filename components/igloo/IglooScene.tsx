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
}: IglooSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Refs for scene components
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shardsGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const monolithsGroupRef = useRef<THREE.Group | null>(null);
  const warpLinesRef = useRef<THREE.LineSegments | null>(null);
  const particleCloudRef = useRef<THREE.Points | null>(null);
  const pedestalGroupRef = useRef<THREE.Group | null>(null);
  const monolithMeshesRef = useRef<THREE.Mesh[]>([]);

  // Particle Morph targets storage
  const particleTargetsRef = useRef<{ [key: number]: Float32Array }>({});
  const currentParticlePositionsRef = useRef<Float32Array | null>(null);

  // Mouse move handler for 3D parallax tilt & raycasting
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

    // --- 1. Scene & Camera Setup ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.008);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 2, 22);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- 2. Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xa2dcff, 1.8);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const pinkLight = new THREE.PointLight(0xff3d91, 2.5, 60);
    pinkLight.position.set(-15, -10, -30);
    scene.add(pinkLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 60);
    cyanLight.position.set(15, -10, -60);
    scene.add(cyanLight);

    // --- 3. Stage 1: Exploded Crystal Shards (Hero Dome Assembly) ---
    const shardsGroup = new THREE.Group();
    shardsGroupRef.current = shardsGroup;
    scene.add(shardsGroup);

    const shardCount = 28;
    const shardData: Array<{
      mesh: THREE.Mesh;
      explodedPos: THREE.Vector3;
      assembledPos: THREE.Vector3;
      rotSpeed: THREE.Vector3;
    }> = [];

    const shardMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x111c28,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.75,
      thickness: 1.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.9,
    });

    for (let i = 0; i < shardCount; i++) {
      // Create faceted crystal block
      const geom = new THREE.DodecahedronGeometry(0.7 + (i % 3) * 0.35, 0);
      const mesh = new THREE.Mesh(geom, shardMat.clone());

      // Target assembled position: forms a 3D faceted cardioid dome
      const t = (i / shardCount) * Math.PI * 2;
      const heartX = 16 * Math.pow(Math.sin(t), 3) * 0.28;
      const heartY = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.28;
      const heartZ = Math.sin(t * 3) * 1.5;

      const assembledPos = new THREE.Vector3(heartX, heartY, heartZ);

      // Exploded initial floating position (scattered in void)
      const explodedPos = new THREE.Vector3(
        heartX + (Math.sin(i * 1.7) * 18 + (i % 2 === 0 ? 8 : -8)),
        heartY + (Math.cos(i * 2.3) * 14 + (i % 3 === 0 ? 6 : -6)),
        heartZ + (Math.sin(i * 3.1) * 20 + 8)
      );

      mesh.position.copy(explodedPos);
      shardsGroup.add(mesh);

      shardData.push({
        mesh,
        explodedPos,
        assembledPos,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
      });
    }

    // Central glowing core inside the dome
    const coreGeom = new THREE.IcosahedronGeometry(2.4, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff0d42,
      emissive: 0xff0d42,
      emissiveIntensity: 0.8,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    shardsGroup.add(coreMesh);

    // --- 4. Stage 2: Aperture Ring & Blizzard Warp Speedlines ---
    const warpCount = 180;
    const warpPoints: number[] = [];
    for (let i = 0; i < warpCount; i++) {
      const rx = (Math.random() - 0.5) * 25;
      const ry = -5 - Math.random() * 25;
      const rz = (Math.random() - 0.5) * 25;
      warpPoints.push(rx, ry, rz);
      warpPoints.push(rx, ry - 3 - Math.random() * 4, rz);
    }
    const warpGeom = new THREE.BufferGeometry();
    warpGeom.setAttribute("position", new THREE.Float32BufferAttribute(warpPoints, 3));
    const warpMat = new THREE.LineBasicMaterial({
      color: 0xa2dcff,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const warpLines = new THREE.LineSegments(warpGeom, warpMat);
    scene.add(warpLines);
    warpLinesRef.current = warpLines;

    // --- 5. Stage 3: Concentric Planetary Rings ---
    const ringsGroup = new THREE.Group();
    ringsGroupRef.current = ringsGroup;
    ringsGroup.position.set(0, -10, 0);
    scene.add(ringsGroup);

    const ringCount = 4;
    const ringMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < ringCount; i++) {
      const radius = 6.5 + i * 2.2;
      const ringGeom = new THREE.TorusGeometry(radius, 0.06, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xff3d91,
        emissive: i % 2 === 0 ? 0x00f0ff : 0xff3d91,
        emissiveIntensity: 1.2,
        roughness: 0.2,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.set(0, 0, -12 - i * 10);
      ringsGroup.add(ringMesh);
      ringMeshes.push(ringMesh);
    }

    // --- 6. Stage 4: Floating 3D Memory Monoliths ---
    const monolithsGroup = new THREE.Group();
    monolithsGroupRef.current = monolithsGroup;
    scene.add(monolithsGroup);

    const textureLoader = new THREE.TextureLoader();
    const monolithMeshes: THREE.Mesh[] = [];

    // Monolith 3D positions in the zero-gravity void
    const monolithPositions = [
      new THREE.Vector3(-6.5, -9.0, -56),
      new THREE.Vector3(6.5, -10.5, -66),
      new THREE.Vector3(-5.8, -11.5, -76),
      new THREE.Vector3(5.5, -8.5, -86),
      new THREE.Vector3(-6.2, -10.0, -96),
      new THREE.Vector3(6.0, -11.0, -106),
      new THREE.Vector3(0.0, -9.5, -118), // Grand central portrait
    ];

    MEMORY_PHOTOS.forEach((photo, idx) => {
      const pos = monolithPositions[idx];
      const boxW = idx === 6 ? 4.2 : 3.2;
      const boxH = idx === 6 ? 5.6 : 4.4;
      const boxD = 0.35;

      const geom = new THREE.BoxGeometry(boxW, boxH, boxD);

      // Materials: front face with photo texture, sides with frosted glass
      const tex = textureLoader.load(photo.src);
      tex.colorSpace = THREE.SRGBColorSpace;

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x141822,
        roughness: 0.1,
        metalness: 0.2,
        transmission: 0.85,
        thickness: 0.8,
        transparent: true,
        opacity: 0.9,
      });

      const photoMat = new THREE.MeshBasicMaterial({ map: tex });

      // Box materials order: right, left, top, bottom, front, back
      const materials = [glassMat, glassMat, glassMat, glassMat, photoMat, glassMat];
      const mesh = new THREE.Mesh(geom, materials);
      mesh.position.copy(pos);
      mesh.rotation.y = idx % 2 === 0 ? 0.15 : -0.15;
      mesh.rotation.z = (idx % 2 === 0 ? 1 : -1) * 0.04;
      mesh.userData = { memoryId: idx, basePos: pos.clone(), baseRot: mesh.rotation.clone() };

      // Luminous neon border wireframe
      const edges = new THREE.EdgesGeometry(geom);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.45,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);

      monolithsGroup.add(mesh);
      monolithMeshes.push(mesh);
    });
    monolithMeshesRef.current = monolithMeshes;

    // --- 7. Stage 5: Illuminated Circular Pedestal & Morphing Particle Cloud ---
    const pedestalGroup = new THREE.Group();
    pedestalGroupRef.current = pedestalGroup;
    pedestalGroup.position.set(0, -15, -165);
    scene.add(pedestalGroup);

    // Circular glowing floor rings
    const floorRings = [4.5, 3.2, 1.8];
    floorRings.forEach((r, idx) => {
      const ringGeom = new THREE.RingGeometry(r - 0.08, r, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0xa2dcff : 0xff3d91,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.05 * idx;
      pedestalGroup.add(ringMesh);
    });

    // Circular base cylinder
    const baseCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(5.0, 5.2, 0.4, 64),
      new THREE.MeshStandardMaterial({ color: 0x0e1118, roughness: 0.3, metalness: 0.8 })
    );
    baseCylinder.position.y = -0.2;
    pedestalGroup.add(baseCylinder);

    // Generate Morphing Point Cloud (2,400 points)
    const particleCount = 2400;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Generate Target 0: Birthday Cake with candles
    const targetCake = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      if (i < 1600) {
        // Base Tier Cylinder
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.sqrt(Math.random()) * 2.2;
        const h = (Math.random() - 0.5) * 1.6 + 1.2;
        targetCake[i * 3] = Math.cos(angle) * rad;
        targetCake[i * 3 + 1] = h;
        targetCake[i * 3 + 2] = Math.sin(angle) * rad;
      } else if (i < 2200) {
        // Top Tier Cylinder
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.sqrt(Math.random()) * 1.3;
        const h = (Math.random() - 0.5) * 1.2 + 2.4;
        targetCake[i * 3] = Math.cos(angle) * rad;
        targetCake[i * 3 + 1] = h;
        targetCake[i * 3 + 2] = Math.sin(angle) * rad;
      } else {
        // Candle flame at top
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.25;
        const h = 3.2 + Math.random() * 0.8;
        targetCake[i * 3] = Math.cos(angle) * rad;
        targetCake[i * 3 + 1] = h;
        targetCake[i * 3 + 2] = Math.sin(angle) * rad;
      }
    }

    // Generate Target 1: Glowing 3D Heart
    const targetHeart = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = Math.random() * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const spread = (Math.random() - 0.5) * 1.8;
      targetHeart[i * 3] = x * 0.14 + (Math.random() - 0.5) * 0.4;
      targetHeart[i * 3 + 1] = y * 0.14 + 2.2 + (Math.random() - 0.5) * 0.4;
      targetHeart[i * 3 + 2] = spread;
    }

    // Generate Target 2: Constellation "AKRITI 19"
    const targetText = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = (Math.random() - 0.5) * 4.8;
      const v = (Math.random() - 0.5) * 2.8 + 2.2;
      const w = (Math.random() - 0.5) * 0.8;
      targetText[i * 3] = u;
      targetText[i * 3 + 1] = v;
      targetText[i * 3 + 2] = w;
    }

    particleTargetsRef.current = {
      0: targetCake,
      1: targetHeart,
      2: targetText,
    };

    // Initial positions start at Cake
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = targetCake[i];
      if (i % 3 === 0) colors[i] = 1.0; // R
      if (i % 3 === 1) colors[i] = 0.2 + Math.random() * 0.6; // G
      if (i % 3 === 2) colors[i] = 0.6 + Math.random() * 0.4; // B
    }
    currentParticlePositionsRef.current = new Float32Array(positions);

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleCloud = new THREE.Points(particleGeom, particleMat);
    pedestalGroup.add(particleCloud);
    particleCloudRef.current = particleCloud;

    // --- 8. Ambient Cosmic Dust (1,500 particles along flight path) ---
    const dustCount = 1500;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 60;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 40 - 8;
      dustPositions[i * 3 + 2] = 20 - Math.random() * 200;
    }
    const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.07,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });
    const dustPoints = new THREE.Points(dustGeom, dustMat);
    scene.add(dustPoints);

    // --- 9. Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- 10. Animation Loop ---
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // -------------------------------------------------------------
      // SCROLL-DRIVEN CAMERA SPLINE FLIGHT PATH
      // Maps scrollProgress [0, 1] to cinematic camera positions
      // -------------------------------------------------------------
      const p = scrollProgress;

      let targetCamX = 0;
      let targetCamY = 2;
      let targetCamZ = 22;
      let lookAtX = 0;
      let lookAtY = 0;
      let lookAtZ = 0;

      if (p <= 0.2) {
        // Stage 1: Frontal Hero View
        const t = p / 0.2;
        targetCamX = mouseRef.current.x * 1.5;
        targetCamY = 2 + mouseRef.current.y * 1.2;
        targetCamZ = 22 - t * 4;
        lookAtX = 0;
        lookAtY = 0;
        lookAtZ = 0;
      } else if (p <= 0.38) {
        // Stage 2: Overhead Arc & Vortex Dive
        const t = (p - 0.2) / 0.18;
        // Arc up to bird's eye view, then plunge through aperture
        targetCamX = Math.sin(t * Math.PI) * 2;
        targetCamY = THREE.MathUtils.lerp(2, -10, t);
        targetCamZ = THREE.MathUtils.lerp(18, 0, t);
        lookAtX = 0;
        lookAtY = THREE.MathUtils.lerp(0, -10, t);
        lookAtZ = THREE.MathUtils.lerp(0, -15, t);
      } else if (p <= 0.6) {
        // Stage 3: Flight Through Concentric Rings
        const t = (p - 0.38) / 0.22;
        targetCamX = mouseRef.current.x * 2.0;
        targetCamY = -10 + mouseRef.current.y * 1.5;
        targetCamZ = THREE.MathUtils.lerp(0, -50, t);
        lookAtX = 0;
        lookAtY = -10;
        lookAtZ = targetCamZ - 15;
      } else if (p <= 0.85) {
        // Stage 4: Gliding Through Floating Memory Monoliths
        const t = (p - 0.6) / 0.25;
        targetCamX = Math.sin(t * Math.PI * 3) * 2.5 + mouseRef.current.x * 1.8;
        targetCamY = -10 + Math.cos(t * Math.PI * 2) * 1.0 + mouseRef.current.y * 1.5;
        targetCamZ = THREE.MathUtils.lerp(-50, -135, t);
        lookAtX = 0;
        lookAtY = -10;
        lookAtZ = targetCamZ - 18;
      } else {
        // Stage 5: Descending onto the Wish Pedestal
        const t = (p - 0.85) / 0.15;
        targetCamX = mouseRef.current.x * 1.5;
        targetCamY = THREE.MathUtils.lerp(-10, -13.2, t);
        targetCamZ = THREE.MathUtils.lerp(-135, -154, t);
        lookAtX = 0;
        lookAtY = -12.8;
        lookAtZ = -165;
      }

      // Smooth camera interpolation
      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;

      const targetLookAt = new THREE.Vector3(lookAtX, lookAtY, lookAtZ);
      camera.lookAt(targetLookAt);

      // --- Animate Shards Assembly (Stage 1) ---
      const assembleProgress = Math.min(1.0, Math.max(0.0, p / 0.18));
      shardData.forEach(({ mesh, explodedPos, assembledPos, rotSpeed }) => {
        mesh.position.lerpVectors(explodedPos, assembledPos, assembleProgress);
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;
      });
      coreMesh.rotation.y += 0.01;
      coreMesh.rotation.x += 0.005;

      // --- Animate Warp Lines during Dive (Stage 2) ---
      if (warpLinesRef.current) {
        const inDiveZone = p > 0.18 && p < 0.42;
        const targetOpacity = inDiveZone ? Math.min(0.85, scrollVelocity * 0.15 + 0.2) : 0.0;
        const warpMat = warpLinesRef.current.material as THREE.LineBasicMaterial;
        warpMat.opacity += (targetOpacity - warpMat.opacity) * 0.1;
      }

      // --- Animate Concentric Rings (Stage 3) ---
      ringMeshes.forEach((rm, i) => {
        rm.rotation.z += (i % 2 === 0 ? 0.008 : -0.012);
        rm.rotation.x = Math.sin(elapsedTime * 0.5 + i) * 0.1;
      });

      // --- Animate Floating Memory Monoliths (Stage 4) ---
      monolithMeshes.forEach((mesh, idx) => {
        const isSelected = selectedMemory === idx;
        const hoverOffset = Math.sin(elapsedTime * 1.5 + idx) * 0.15;
        mesh.position.y = mesh.userData.basePos.y + hoverOffset;

        if (isSelected) {
          mesh.scale.set(1.15, 1.15, 1.15);
          mesh.rotation.y = 0;
        } else {
          mesh.scale.set(1.0, 1.0, 1.0);
          mesh.rotation.y = mesh.userData.baseRot.y + Math.sin(elapsedTime + idx) * 0.05;
        }
      });

      // Compute Screen-space 2D positions for HUD Leader Lines
      if (p > 0.5 && p < 0.9) {
        const screenPositions: Array<{ id: number; x: number; y: number; visible: boolean }> = [];
        monolithMeshes.forEach((mesh, idx) => {
          const worldPos = new THREE.Vector3();
          mesh.getWorldPosition(worldPos);

          const screenPos = worldPos.clone().project(camera);
          const isBehind = screenPos.z > 1;
          const sx = ((screenPos.x + 1) * width) / 2;
          const sy = ((-screenPos.y + 1) * height) / 2;

          const isVisible =
            !isBehind &&
            sx >= -100 &&
            sx <= width + 100 &&
            sy >= -100 &&
            sy <= height + 100 &&
            worldPos.distanceTo(camera.position) < 45;

          screenPositions.push({ id: idx, x: sx, y: sy, visible: isVisible });
        });
        onUpdateScreenPositions(screenPositions);
      } else {
        onUpdateScreenPositions([]);
      }

      // --- Animate Morphing Particle Sculpture (Stage 5) ---
      if (particleCloudRef.current && currentParticlePositionsRef.current) {
        const targetPositions = particleTargetsRef.current[activeMorphIndex];
        if (targetPositions) {
          const currentPos = currentParticlePositionsRef.current;
          const geom = particleCloudRef.current.geometry;
          const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;

          for (let i = 0; i < particleCount * 3; i++) {
            currentPos[i] += (targetPositions[i] - currentPos[i]) * 0.06;
          }
          posAttr.copyArray(currentPos);
          posAttr.needsUpdate = true;
        }
        particleCloudRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, [scrollProgress, scrollVelocity, selectedMemory, activeMorphIndex, onUpdateScreenPositions]);

  return <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" />;
}
