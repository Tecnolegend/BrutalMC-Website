"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";
import {
  RotateCw,
  Eye,
  Sparkles,
  Flame,
  Maximize2,
  Minimize2,
  Camera,
  Info,
  Compass,
} from "lucide-react";

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  weakness: string;
  loot: string;
  pos: [number, number, number];
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "head",
    title: "Celestial Horns & Cranium",
    subtitle: "Critical Strike Hitbox",
    desc: "Shenron's alabaster crown channels celestial winds. Striking the head bypasses 15% armor and interrupts channeled breath attacks.",
    weakness: "+25% Critical Damage multiplier",
    loot: "Horn of the Celestial Wyrm (15% Drop Rate)",
    pos: [1.8, 1.3, 0.4],
  },
  {
    id: "pearl",
    title: "The Celestial Dragon Pearl",
    subtitle: "Life-Force Energy Conduit",
    desc: "A pure compressed pearl of raw celestial energy orbiting Shenron. In Phase 3, players must shatter this orb to halt health regeneration.",
    weakness: "Vulnerable to Bows & Tridents",
    loot: "Shenron's Dragon Pearl (5% Drop Rate)",
    pos: [0.0, 1.8, 1.6],
  },
  {
    id: "scales",
    title: "Alabaster Scale Carapace",
    subtitle: "Heavy Armor Plating",
    desc: "Dense white diamond-hardness scales deflect non-enchanted arrows and reflect 10% piercing damage when Shenron drops under 50% health.",
    weakness: "Penetrated by Netherite Axes & Magic",
    loot: "Shenron's White Scales (100% Drop Rate, 3-6x)",
    pos: [-0.6, 0.2, 0.2],
  },
  {
    id: "tail",
    title: "Whirlwind Tail Whip",
    subtitle: "Knockback Hazard Zone",
    desc: "A massive sweeping tail capable of whipping in a 360-degree arc, launching melee players 15 blocks backwards into the abyss.",
    weakness: "Tail is vulnerable right after a missed sweep",
    loot: "Dragon Blood Shards & Soul Gems",
    pos: [-3.2, -0.6, -0.8],
  },
];

export default function Shenron3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [activeAction, setActiveAction] = useState<"idle" | "roar" | "breath">("idle");
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [cameraView, setCameraView] = useState<"overview" | "head" | "pearl" | "tail">("overview");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References for animation manipulation
  const animStateRef = useRef({
    action: "idle" as "idle" | "roar" | "breath",
    actionTimer: 0,
    autoRotate: true,
    cameraTarget: new THREE.Vector3(0, 0.4, 0),
    cameraPos: new THREE.Vector3(0, 1.2, 6.8),
    targetCameraPos: new THREE.Vector3(0, 1.2, 6.8),
    targetCameraLookAt: new THREE.Vector3(0, 0.4, 0),
    mouse: { x: 0, y: 0, isDragging: false, prevX: 0, prevY: 0 },
    orbitRot: { x: 0.15, y: 0.3 },
    targetOrbitRot: { x: 0.15, y: 0.3 },
    zoom: 1.0,
    targetZoom: 1.0,
  });

  // Keep state ref synced
  useEffect(() => {
    animStateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  // Handle action triggers
  const triggerRoar = useCallback(() => {
    sound.playPower();
    setActiveAction("roar");
    animStateRef.current.action = "roar";
    animStateRef.current.actionTimer = 2.4; // 2.4 seconds
    setTimeout(() => {
      setActiveAction("idle");
      animStateRef.current.action = "idle";
    }, 2400);
  }, []);

  const triggerBreath = useCallback(() => {
    sound.playPower();
    setActiveAction("breath");
    animStateRef.current.action = "breath";
    animStateRef.current.actionTimer = 3.2; // 3.2 seconds
    setTimeout(() => {
      setActiveAction("idle");
      animStateRef.current.action = "idle";
    }, 3200);
  }, []);

  const changeCameraView = useCallback((view: "overview" | "head" | "pearl" | "tail") => {
    sound.playClick();
    setCameraView(view);
    const state = animStateRef.current;
    if (view === "overview") {
      state.targetCameraPos.set(0, 1.2, 6.8);
      state.targetCameraLookAt.set(0, 0.3, 0);
      state.targetOrbitRot.x = 0.15;
      state.targetOrbitRot.y = 0.3;
      state.targetZoom = 1.0;
    } else if (view === "head") {
      state.targetCameraPos.set(2.8, 1.8, 3.4);
      state.targetCameraLookAt.set(1.6, 1.1, 0.3);
      state.targetOrbitRot.x = 0.05;
      state.targetOrbitRot.y = 0.7;
      state.targetZoom = 1.4;
    } else if (view === "pearl") {
      state.targetCameraPos.set(0.2, 2.5, 3.8);
      state.targetCameraLookAt.set(0.0, 1.7, 1.5);
      state.targetOrbitRot.x = 0.25;
      state.targetOrbitRot.y = 0.0;
      state.targetZoom = 1.3;
    } else if (view === "tail") {
      state.targetCameraPos.set(-4.0, 0.2, 4.2);
      state.targetCameraLookAt.set(-2.8, -0.4, -0.6);
      state.targetOrbitRot.x = 0.1;
      state.targetOrbitRot.y = -0.6;
      state.targetZoom = 1.2;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE & RENDERER SETUP
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 6.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // ROOT GROUPS
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const dragonGroup = new THREE.Group();
    worldGroup.add(dragonGroup);

    // LIGHTING SETUP FOR WHITE CELESTIAL DRAGON
    // 1. Soft deep navy celestial ambient
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.6);
    scene.add(ambientLight);

    // 2. Pure White Key Light (Highlights the pearlescent alabaster scales)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // 3. Starlight Cyan Rim Light (Rear-Right, creates celestial silhouette)
    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.2);
    cyanRim.position.set(-6, 4, -5);
    scene.add(cyanRim);

    // 4. Ethereal Gold Accent Light (Rear-Left)
    const goldRim = new THREE.DirectionalLight(0xfef08a, 1.4);
    goldRim.position.set(6, -2, -4);
    scene.add(goldRim);

    // 5. Dynamic Celestial Point Light attached to Dragon Pearl
    const pearlLight = new THREE.PointLight(0xe0f2fe, 12, 8);
    scene.add(pearlLight);

    // MATERIALS FOR SHENRON
    // Pure White Pearlescent Scale Material
    const scaleMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.32,
      metalness: 0.18,
    });

    // Ribbed Underbelly Plate Material (Ivory white)
    const bellyMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.45,
      metalness: 0.08,
    });

    // Horns, Spikes & Talons (Alabaster Bone Silver)
    const hornMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.22,
      metalness: 0.35,
    });

    // Glowing Cyan Eyes
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 3.8,
      roughness: 0.1,
    });

    // Crystalline Dorsal Spikes (Glows with celestial light)
    const crestMat = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.95,
    });

    // Translucent Dragon Wings / Fin Membrane
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.82,
      side: THREE.DoubleSide,
    });

    // DRAGON HEAD ASSEMBLY
    const headGroup = new THREE.Group();
    headGroup.position.set(1.8, 1.1, 0.4);
    dragonGroup.add(headGroup);

    // Cranium / Upper Skull (Blocky voxel dragon skull)
    const skullGeo = new THREE.BoxGeometry(0.72, 0.52, 0.82);
    const skullMesh = new THREE.Mesh(skullGeo, scaleMat);
    headGroup.add(skullMesh);

    // Snout / Upper Jaw
    const snoutGeo = new THREE.BoxGeometry(0.58, 0.34, 0.85);
    const snoutMesh = new THREE.Mesh(snoutGeo, scaleMat);
    snoutMesh.position.set(0, -0.06, 0.72);
    headGroup.add(snoutMesh);

    // Muzzle ridge / Nostrils
    const noseGeo = new THREE.BoxGeometry(0.38, 0.12, 0.28);
    const noseMesh = new THREE.Mesh(noseGeo, scaleMat);
    noseMesh.position.set(0, 0.15, 0.95);
    headGroup.add(noseMesh);

    // Lower Jaw Group (Articulated for roaring & breath attacks!)
    const jawGroup = new THREE.Group();
    jawGroup.position.set(0, -0.22, 0.35);
    headGroup.add(jawGroup);

    const lowerJawGeo = new THREE.BoxGeometry(0.52, 0.22, 0.82);
    const lowerJawMesh = new THREE.Mesh(lowerJawGeo, bellyMat);
    lowerJawMesh.position.set(0, 0, 0.38);
    jawGroup.add(lowerJawMesh);

    // Dragon Teeth inside jaw
    const teethGeo = new THREE.BoxGeometry(0.44, 0.08, 0.65);
    const teethMesh = new THREE.Mesh(teethGeo, hornMat);
    teethMesh.position.set(0, 0.12, 0.36);
    jawGroup.add(teethMesh);

    // Glowing Cyan Dragon Eyes (Left & Right)
    const eyeGeo = new THREE.BoxGeometry(0.14, 0.12, 0.22);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(0.38, 0.12, 0.25);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(-0.38, 0.12, 0.25);
    headGroup.add(rightEye);

    // Pearlescent Alabaster Main Horns (Sweeping backward with segments)
    function createHorn(isRight: boolean) {
      const hornGroup = new THREE.Group();
      const mult = isRight ? 1 : -1;

      // Base horn
      const baseGeo = new THREE.BoxGeometry(0.18, 0.45, 0.18);
      const baseMesh = new THREE.Mesh(baseGeo, hornMat);
      baseMesh.rotation.x = -0.4;
      baseMesh.rotation.z = mult * 0.3;
      baseMesh.position.set(mult * 0.32, 0.38, -0.15);
      hornGroup.add(baseMesh);

      // Mid horn
      const midGeo = new THREE.BoxGeometry(0.14, 0.5, 0.14);
      const midMesh = new THREE.Mesh(midGeo, hornMat);
      midMesh.rotation.x = -0.85;
      midMesh.rotation.z = mult * 0.45;
      midMesh.position.set(mult * 0.48, 0.72, -0.45);
      hornGroup.add(midMesh);

      // Tip horn
      const tipGeo = new THREE.BoxGeometry(0.09, 0.45, 0.09);
      const tipMesh = new THREE.Mesh(tipGeo, crestMat);
      tipMesh.rotation.x = -1.1;
      tipMesh.rotation.z = mult * 0.55;
      tipMesh.position.set(mult * 0.68, 0.95, -0.8);
      hornGroup.add(tipMesh);

      return hornGroup;
    }

    headGroup.add(createHorn(true));
    headGroup.add(createHorn(false));

    // Dragon Whisker Nodes (Long undulating whiskers)
    const whiskerPointsL: THREE.Vector3[] = [];
    const whiskerPointsR: THREE.Vector3[] = [];
    const whiskerNodesCount = 6;
    for (let i = 0; i < whiskerNodesCount; i++) {
      whiskerPointsL.push(new THREE.Vector3(0.35 + i * 0.15, -0.1 - i * 0.08, 0.9 + i * 0.25));
      whiskerPointsR.push(new THREE.Vector3(-0.35 - i * 0.15, -0.1 - i * 0.08, 0.9 + i * 0.25));
    }
    const whiskerCurveL = new THREE.CatmullRomCurve3(whiskerPointsL);
    const whiskerCurveR = new THREE.CatmullRomCurve3(whiskerPointsR);
    const whiskerGeoL = new THREE.TubeGeometry(whiskerCurveL, 20, 0.035, 6, false);
    const whiskerGeoR = new THREE.TubeGeometry(whiskerCurveR, 20, 0.035, 6, false);
    const whiskerMeshL = new THREE.Mesh(whiskerGeoL, crestMat);
    const whiskerMeshR = new THREE.Mesh(whiskerGeoR, crestMat);
    headGroup.add(whiskerMeshL);
    headGroup.add(whiskerMeshR);

    // Mouth Breath Particle Emitter Node
    const breathEmitterNode = new THREE.Group();
    breathEmitterNode.position.set(0, -0.05, 1.25);
    headGroup.add(breathEmitterNode);

    // Breath Particles System
    const particleCount = 180;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pVel: THREE.Vector3[] = [];
    const pLife: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = 0;
      pPos[i * 3 + 1] = 0;
      pPos[i * 3 + 2] = 0;
      pVel.push(new THREE.Vector3(0, 0, 0));
      pLife.push(0);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    // Canvas particle texture for glowing soft celestial flame/frost
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d")!;
    const radGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    radGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    radGrad.addColorStop(0.3, "rgba(56, 189, 248, 0.85)");
    radGrad.addColorStop(0.7, "rgba(14, 165, 233, 0.25)");
    radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    pCtx.fillStyle = radGrad;
    pCtx.fillRect(0, 0, 64, 64);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const pMat = new THREE.PointsMaterial({
      size: 0.35,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const breathParticles = new THREE.Points(pGeo, pMat);
    scene.add(breathParticles);

    // ARTICULATED SERPENTINE BODY (14 segments)
    const segmentCount = 14;
    const bodySegments: THREE.Group[] = [];

    for (let i = 0; i < segmentCount; i++) {
      const segGroup = new THREE.Group();
      dragonGroup.add(segGroup);
      bodySegments.push(segGroup);

      // Gradual taper from thick torso to sleek tail
      const taper = 1.0 - (i / segmentCount) * 0.58;
      const w = 0.65 * taper;
      const h = 0.62 * taper;
      const d = 0.55;

      // Main White Scale Segment Block
      const segGeo = new THREE.BoxGeometry(w, h, d);
      const segMesh = new THREE.Mesh(segGeo, scaleMat);
      segGroup.add(segMesh);

      // Ribbed Ivory Underbelly
      const bellyPlateGeo = new THREE.BoxGeometry(w * 0.85, 0.12 * taper, d * 0.95);
      const bellyPlateMesh = new THREE.Mesh(bellyPlateGeo, bellyMat);
      bellyPlateMesh.position.set(0, -h * 0.48, 0);
      segGroup.add(bellyPlateMesh);

      // Crystalline Dorsal Spine Fin (Stands up on the back of each segment)
      const spineGeo = new THREE.BoxGeometry(0.08, 0.35 * taper, d * 0.65);
      const spineMesh = new THREE.Mesh(spineGeo, crestMat);
      spineMesh.position.set(0, h * 0.55, 0);
      spineMesh.rotation.x = -0.25;
      segGroup.add(spineMesh);

      // DRACONIC LIMBS & TALONS (Attached at Segment 2 and Segment 8)
      if (i === 2 || i === 8) {
        [-1, 1].forEach((side) => {
          const limbGroup = new THREE.Group();
          limbGroup.position.set(side * (w * 0.6), -h * 0.3, 0);

          // Upper arm
          const upperArmGeo = new THREE.BoxGeometry(0.18, 0.48, 0.2);
          const upperArmMesh = new THREE.Mesh(upperArmGeo, scaleMat);
          upperArmMesh.position.set(side * 0.15, -0.2, 0);
          upperArmMesh.rotation.z = side * 0.4;
          limbGroup.add(upperArmMesh);

          // Claws / Talons
          const clawGeo = new THREE.BoxGeometry(0.24, 0.12, 0.32);
          const clawMesh = new THREE.Mesh(clawGeo, hornMat);
          clawMesh.position.set(side * 0.28, -0.48, 0.12);
          limbGroup.add(clawMesh);

          segGroup.add(limbGroup);
        });
      }

      // ETHEREAL CELESTIAL WINGS (Attached at Segment 1)
      if (i === 1) {
        [-1, 1].forEach((side) => {
          const wingGroup = new THREE.Group();
          wingGroup.name = `wing_${side}`;
          wingGroup.position.set(side * (w * 0.5), h * 0.3, 0);

          // Wing Rib / Bone
          const wingBoneGeo = new THREE.BoxGeometry(0.12, 1.4, 0.12);
          const wingBoneMesh = new THREE.Mesh(wingBoneGeo, hornMat);
          wingBoneMesh.rotation.z = side * 1.1;
          wingBoneMesh.position.set(side * 0.6, 0.5, 0);
          wingGroup.add(wingBoneMesh);

          // Translucent Wing Fin Membrane
          const wingPlaneGeo = new THREE.PlaneGeometry(1.4, 1.1);
          const wingPlaneMesh = new THREE.Mesh(wingPlaneGeo, wingMat);
          wingPlaneMesh.position.set(side * 0.65, 0.45, 0);
          wingPlaneMesh.rotation.y = side * 0.2;
          wingGroup.add(wingPlaneMesh);

          segGroup.add(wingGroup);
        });
      }

      // TAIL FAN PLUME (Attached to the very last segment)
      if (i === segmentCount - 1) {
        const tailFanGroup = new THREE.Group();
        tailFanGroup.position.set(0, 0, -d * 0.5);

        for (let f = -2; f <= 2; f++) {
          const featherGeo = new THREE.BoxGeometry(0.06, 0.3, 0.7);
          const featherMesh = new THREE.Mesh(featherGeo, crestMat);
          featherMesh.position.set(f * 0.08, f * 0.03, -0.35);
          featherMesh.rotation.y = f * 0.15;
          tailFanGroup.add(featherMesh);
        }
        segGroup.add(tailFanGroup);
      }
    }

    // CELESTIAL DRAGON PEARL (THE LIFE CORE)
    const pearlGroup = new THREE.Group();
    pearlGroup.position.set(0, 1.7, 1.6);
    worldGroup.add(pearlGroup);

    // Inner Glowing Core Sphere
    const coreSphereGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x38bdf8,
      emissiveIntensity: 3.2,
      roughness: 0.1,
      metalness: 0.2,
    });
    const coreSphereMesh = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    pearlGroup.add(coreSphereMesh);

    // Outer Translucent Pearlescent Shell
    const shellGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.55,
      wireframe: false,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    pearlGroup.add(shellMesh);

    // Orbiting Luminous Ring 1
    const ring1Geo = new THREE.TorusGeometry(0.55, 0.02, 16, 64);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 2.5,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    pearlGroup.add(ring1Mesh);

    // Orbiting Dark Gold Celestial Ring 2
    const ring2Geo = new THREE.TorusGeometry(0.68, 0.025, 16, 64);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.8,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 2.5;
    pearlGroup.add(ring2Mesh);

    // FLOATING SKY EMBERS / CELESTIAL STARDUST FIELD
    const emberCount = 70;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 14;
      emberPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    const emberMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const emberParticles = new THREE.Points(emberGeo, emberMat);
    scene.add(emberParticles);

    // SHADOW / CELESTIAL ENERGY GROUND DISC
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext("2d")!;
    const grad = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(56, 189, 248, 0.25)");
    grad.addColorStop(0.3, "rgba(255, 255, 255, 0.12)");
    grad.addColorStop(0.7, "rgba(10, 15, 30, 0.5)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8.5, 8.5),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.2;
    worldGroup.add(shadowPlane);

    setLoaded(true);

    // MOUSE / TOUCH INTERACTION CONTROLS
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isMouseDown = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      animStateRef.current.targetOrbitRot.y += deltaX * 0.007;
      animStateRef.current.targetOrbitRot.x = Math.max(
        -0.6,
        Math.min(0.8, animStateRef.current.targetOrbitRot.x + deltaY * 0.005)
      );

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerUp = () => {
      isMouseDown = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.0015;
      animStateRef.current.targetZoom = Math.max(0.65, Math.min(2.2, animStateRef.current.targetZoom + delta));
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    dom.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);
    dom.addEventListener("wheel", handleWheel, { passive: false });

    // VIEWPORT VISIBILITY OPTIMIZATION
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // ANIMATION & KINEMATICS LOOP
    let reqId: number;
    const clock = new THREE.Clock();
    const tempWorldPos = new THREE.Vector3();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const state = animStateRef.current;

      // Smooth Orbit rotation lerp
      if (state.autoRotate && !isMouseDown) {
        state.targetOrbitRot.y += delta * 0.25;
      }
      state.orbitRot.x += (state.targetOrbitRot.x - state.orbitRot.x) * 0.08;
      state.orbitRot.y += (state.targetOrbitRot.y - state.orbitRot.y) * 0.08;
      state.zoom += (state.targetZoom - state.zoom) * 0.08;

      // Apply root rotation from orbit
      worldGroup.rotation.x = state.orbitRot.x;
      worldGroup.rotation.y = state.orbitRot.y;

      // Camera smooth target transition
      state.cameraPos.lerp(state.targetCameraPos, 0.06);
      state.cameraTarget.lerp(state.targetCameraLookAt, 0.06);
      camera.position.copy(state.cameraPos).multiplyScalar(1 / state.zoom);
      camera.lookAt(state.cameraTarget);

      // SERPENTINE S-CURVE KINEMATICS
      // Head position: leading the serpentine curve
      const headX = 1.6 + Math.sin(elapsed * 1.1) * 0.25;
      const headY = 1.0 + Math.cos(elapsed * 0.8) * 0.18;
      const headZ = 0.3 + Math.sin(elapsed * 0.6) * 0.15;
      headGroup.position.set(headX, headY, headZ);

      // Head tilting & looking motion
      headGroup.rotation.y = Math.sin(elapsed * 0.7) * 0.25 + 0.1;
      headGroup.rotation.x = Math.cos(elapsed * 0.9) * 0.12;
      headGroup.rotation.z = Math.sin(elapsed * 0.5) * 0.08;

      // Handle Roar and Breath Jaw Action
      if (state.action === "roar") {
        jawGroup.rotation.x = THREE.MathUtils.lerp(jawGroup.rotation.x, 0.65, 0.15);
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -0.35, 0.1);
      } else if (state.action === "breath") {
        jawGroup.rotation.x = THREE.MathUtils.lerp(jawGroup.rotation.x, 0.55, 0.15);
        headGroup.rotation.y = Math.sin(elapsed * 2.5) * 0.35;
      } else {
        // Idle gentle breathing jaw movement
        jawGroup.rotation.x = THREE.MathUtils.lerp(
          jawGroup.rotation.x,
          Math.sin(elapsed * 1.5) * 0.08,
          0.1
        );
      }

      // Sinuous S-Wave calculation for each body segment
      for (let i = 0; i < segmentCount; i++) {
        const seg = bodySegments[i];
        const segProgress = (i + 1) / (segmentCount + 2);

        // Parametric wave formula (Serpentine coiling through 3D space)
        const waveFrequency = 0.45;
        const waveSpeed = 1.8;
        const phase = elapsed * waveSpeed - i * waveFrequency;

        // Position coordinates along serpentine spine
        const segX = headX - (i + 1) * 0.35 - Math.sin(phase) * (0.45 + segProgress * 0.4);
        const segY = headY - segProgress * 1.2 + Math.cos(phase * 0.9) * 0.32;
        const segZ = headZ - (i + 1) * 0.15 + Math.sin(phase * 0.7) * (0.6 + segProgress * 0.5);

        seg.position.set(segX, segY, segZ);

        // Calculate tangent rotation so each segment aligns gracefully with body flow
        const nextX = headX - (i + 2) * 0.35 - Math.sin(phase - waveFrequency) * (0.45 + segProgress * 0.4);
        const nextZ = headZ - (i + 2) * 0.15 + Math.sin(phase - waveFrequency * 0.7) * (0.6 + segProgress * 0.5);
        const angleY = Math.atan2(segX - nextX, segZ - nextZ);

        seg.rotation.y = angleY;
        seg.rotation.x = Math.sin(phase * 0.8) * 0.15;
        seg.rotation.z = Math.cos(phase * 0.6) * 0.1;

        // Animate wings at Segment 1
        if (i === 1) {
          const wingL = seg.getObjectByName("wing_-1");
          const wingR = seg.getObjectByName("wing_1");
          const flap = Math.sin(elapsed * 3.2) * 0.35;
          if (wingL) wingL.rotation.z = -flap;
          if (wingR) wingR.rotation.z = flap;
        }
      }

      // DRAGON PEARL ORBITING ANIMATION
      const pearlAngle = elapsed * 1.2;
      const pearlRadius = 1.7;
      const pearlX = Math.cos(pearlAngle) * pearlRadius;
      const pearlZ = Math.sin(pearlAngle) * pearlRadius + 0.5;
      const pearlY = 1.3 + Math.sin(elapsed * 2.2) * 0.3;
      pearlGroup.position.set(pearlX, pearlY, pearlZ);

      // Rings spin around pearl
      ring1Mesh.rotation.z += delta * 2.0;
      ring2Mesh.rotation.x += delta * 1.5;
      shellMesh.rotation.y += delta * 0.8;

      // Update Pearl PointLight position
      pearlLight.position.set(pearlX, pearlY, pearlZ);

      // BREATH PARTICLES UPDATE
      breathEmitterNode.getWorldPosition(tempWorldPos);
      const positions = breathParticles.geometry.attributes.position.array as Float32Array;
      const isBreathing = state.action === "breath" || (state.action === "roar" && Math.sin(elapsed * 10) > 0);

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        if (pLife[i] <= 0) {
          if (isBreathing) {
            // Spawn new particle at mouth emitter
            positions[idx] = tempWorldPos.x;
            positions[idx + 1] = tempWorldPos.y;
            positions[idx + 2] = tempWorldPos.z;

            // Directed cone velocity matching head facing
            const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(headGroup.quaternion);
            const spread = 0.35;
            pVel[i].set(
              (forward.x + (Math.random() - 0.5) * spread) * (4.5 + Math.random() * 2.5),
              (forward.y + (Math.random() - 0.5) * spread) * (4.5 + Math.random() * 2.5),
              (forward.z + (Math.random() - 0.5) * spread) * (4.5 + Math.random() * 2.5)
            );
            pLife[i] = 1.0;
          } else {
            // Hide inactive particles
            positions[idx] = 999;
            positions[idx + 1] = 999;
            positions[idx + 2] = 999;
          }
        } else {
          // Advance active particle
          positions[idx] += pVel[i].x * delta;
          positions[idx + 1] += pVel[i].y * delta;
          positions[idx + 2] += pVel[i].z * delta;
          pLife[i] -= delta * 1.4;
          if (pLife[i] <= 0) {
            positions[idx] = 999;
          }
        }
      }
      breathParticles.geometry.attributes.position.needsUpdate = true;

      // Ambient Embers subtle float
      const emberArray = emberParticles.geometry.attributes.position.array as Float32Array;
      for (let e = 0; e < emberCount; e++) {
        emberArray[e * 3 + 1] += Math.sin(elapsed + e) * 0.003;
      }
      emberParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
      dom.removeEventListener("mousedown", handlePointerDown);
      dom.removeEventListener("touchstart", handlePointerDown);
      dom.removeEventListener("wheel", handleWheel);
      observer.disconnect();
      cancelAnimationFrame(reqId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-[#050508]/95 backdrop-blur-2xl h-screen"
          : "h-[500px] sm:h-[600px] lg:h-[720px] rounded-2xl sm:rounded-3xl border border-sky-500/20 bg-gradient-to-b from-[#0a0f1d]/80 via-[#050508]/90 to-[#040406]"
      } overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.15)] flex items-center justify-center select-none group`}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
      />

      {/* Loading Spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#050508]">
          <div className="w-14 h-14 rounded-full border-2 border-sky-500/20 border-t-sky-400 animate-spin" />
          <span className="text-xs font-mono text-sky-400 tracking-wider animate-pulse">
            AWAKENING SHENRON 3D MODEL...
          </span>
        </div>
      )}

      {/* TOP BAR: Boss Badge & Quick Status */}
      <div className="absolute top-4 left-4 sm:left-6 flex flex-wrap items-center gap-2 pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-sky-500/40 backdrop-blur-md text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span className="text-white font-extrabold tracking-wide">SHENRON</span>
          <span className="text-sky-400">•</span>
          <span className="text-sky-300 font-bold uppercase">COMMON DRAGON</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 border border-zinc-800 backdrop-blur-md text-xs font-mono text-zinc-300">
          <span className="text-zinc-500">HP:</span>
          <span className="text-emerald-400 font-bold">1,500</span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-500">COLOR:</span>
          <span className="text-white font-bold">PEARL WHITE</span>
        </div>
      </div>

      {/* TOP RIGHT CONTROLS: Auto-Rotate, Fullscreen */}
      <div className="absolute top-4 right-4 sm:right-6 flex items-center gap-2 z-10">
        <button
          onClick={() => {
            sound.playClick();
            setAutoRotate(!autoRotate);
          }}
          title={autoRotate ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            autoRotate
              ? "bg-sky-500/20 border-sky-500/50 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              : "bg-black/60 border-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setIsFullscreen(!isFullscreen);
          }}
          title={isFullscreen ? "Exit Fullscreen" : "Expand 3D View"}
          className="p-2 rounded-xl bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white backdrop-blur-md transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* FLOATING ACTION DOCK (BOTTOM CENTER): Roar, Frost Breath, Camera Presets */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 z-10 max-w-[95%]">
        {/* Action: Celestial Roar */}
        <button
          onClick={triggerRoar}
          disabled={activeAction !== "idle"}
          className={`px-3.5 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
            activeAction === "roar"
              ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] scale-105"
              : "bg-black/80 hover:bg-sky-950/50 border border-sky-500/30 text-sky-200 hover:border-sky-400"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
          <span>CELESTIAL ROAR</span>
        </button>

        {/* Action: Pearl Breath */}
        <button
          onClick={triggerBreath}
          disabled={activeAction !== "idle"}
          className={`px-3.5 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
            activeAction === "breath"
              ? "bg-gradient-to-r from-cyan-400 to-sky-600 text-white shadow-[0_0_25px_rgba(56,189,248,0.7)] scale-105"
              : "bg-black/80 hover:bg-cyan-950/50 border border-cyan-500/30 text-cyan-200 hover:border-cyan-400"
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-cyan-300 animate-bounce" />
          <span>PEARL BREATH</span>
        </button>

        {/* Camera Preset Dropdown / Toggles */}
        <div className="flex items-center gap-1 bg-black/80 border border-zinc-800/90 rounded-xl p-1 backdrop-blur-md">
          {(
            [
              { id: "overview", label: "Orbit", icon: Camera },
              { id: "head", label: "Head", icon: Eye },
              { id: "pearl", label: "Pearl", icon: Sparkles },
              { id: "tail", label: "Tail", icon: Compass },
            ] as const
          ).map((preset) => {
            const Icon = preset.icon;
            const isSel = cameraView === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => changeCameraView(preset.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1 transition-all ${
                  isSel
                    ? "bg-sky-500 text-black font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden md:inline">{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LEFT SIDE: Interactive Hotspots Bar */}
      <div className="absolute left-4 sm:left-6 top-20 flex flex-col gap-2 z-10 max-w-[200px] sm:max-w-[260px]">
        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-1">
          <Info className="w-3 h-3 text-sky-400" />
          <span>INSPECT HITBOXES</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {HOTSPOTS.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => {
                  sound.playClick();
                  setActiveHotspot(isSelected ? null : spot);
                  if (!isSelected) {
                    if (spot.id === "head") changeCameraView("head");
                    else if (spot.id === "pearl") changeCameraView("pearl");
                    else if (spot.id === "tail") changeCameraView("tail");
                  }
                }}
                className={`text-left px-3 py-2 rounded-xl text-xs font-mono transition-all backdrop-blur-md border ${
                  isSelected
                    ? "bg-sky-950/80 border-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                    : "bg-black/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-black/80"
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span className="truncate">{spot.title}</span>
                  <span className="text-sky-400 text-[10px]">
                    {isSelected ? "✕" : "→"}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 truncate">{spot.subtitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* HOTSPOT DETAIL MODAL / DRAWER */}
      {activeHotspot && (
        <div className="absolute right-4 sm:right-6 top-20 max-w-sm p-4 rounded-2xl bg-[#090d18]/90 border border-sky-500/40 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] text-xs font-mono space-y-2.5 z-20 animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="flex items-center justify-between border-b border-sky-500/20 pb-2">
            <div>
              <span className="text-sky-400 font-bold uppercase tracking-wider">HITBOX INSPECTION</span>
              <h4 className="text-white font-extrabold text-sm">{activeHotspot.title}</h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="p-1 text-zinc-400 hover:text-white rounded-lg"
            >
              ✕
            </button>
          </div>
          <p className="text-zinc-300 leading-relaxed">{activeHotspot.desc}</p>
          <div className="p-2 rounded-lg bg-sky-950/40 border border-sky-500/20 text-sky-200">
            <span className="text-zinc-400 font-semibold">Tactic: </span>
            {activeHotspot.weakness}
          </div>
          <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200">
            <span className="text-amber-400 font-semibold">Rare Loot: </span>
            {activeHotspot.loot}
          </div>
        </div>
      )}

      {/* DRAG HINT IN BOTTOM CORNER */}
      <div className="absolute bottom-4 right-4 sm:right-6 hidden lg:flex items-center gap-2 text-[10px] font-mono text-zinc-500 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        <span>DRAG TO ROTATE • SCROLL TO ZOOM</span>
      </div>
    </div>
  );
}
