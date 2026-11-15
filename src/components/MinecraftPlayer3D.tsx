"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface MinecraftPlayer3DProps {
  skinUrl: string;
  username: string;
  roleBadge: string;
  badgeColor?: "red" | "amber" | "cyan" | "purple";
  height?: number;
  interactive?: boolean;
}

export default function MinecraftPlayer3D({
  skinUrl,
  username,
  roleBadge,
  badgeColor = "red",
  height = 460,
  interactive = true,
}: MinecraftPlayer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean any prior canvas
    container.innerHTML = "";

    const checkMobile = window.innerWidth < 768;
    const width = container.clientWidth || 340;
    const sceneHeight = height;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / sceneHeight, 0.1, 100);
    camera.position.set(0, 0.3, 6.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, checkMobile ? 1.5 : 2));
    renderer.setSize(width, sceneHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Head Group for rotational tracking
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.7, 0);
    rootGroup.add(headGroup);

    // Color theme logic
    const primaryHex =
      badgeColor === "red"
        ? 0xff0033
        : badgeColor === "amber"
        ? 0xf59e0b
        : badgeColor === "cyan"
        ? 0x06b6d4
        : 0xa855f7;

    const secondaryHex =
      badgeColor === "red"
        ? 0x881337
        : badgeColor === "amber"
        ? 0x78350f
        : badgeColor === "cyan"
        ? 0x164e63
        : 0x581c87;

    // 3. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x2a1b24, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x71717a, 0.9);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    const rimLight1 = new THREE.PointLight(primaryHex, 16, 10);
    rimLight1.position.set(2.5, 1.5, -2);
    scene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(secondaryHex, 10, 8);
    rimLight2.position.set(-2.5, 0.8, -2);
    scene.add(rimLight2);

    const underGlow = new THREE.PointLight(primaryHex, 6, 5);
    underGlow.position.set(0, -2.0, 1);
    scene.add(underGlow);

    // UV Mapper for standard Minecraft 64x64 skin
    function applyMinecraftUVs(
      geometry: THREE.BoxGeometry,
      faces: {
        right: [number, number, number, number];
        left: [number, number, number, number];
        top: [number, number, number, number];
        bottom: [number, number, number, number];
        front: [number, number, number, number];
        back: [number, number, number, number];
      },
      texW = 64,
      texH = 64
    ) {
      const uvAttr = geometry.attributes.uv;
      const order = [
        faces.right,
        faces.left,
        faces.top,
        faces.bottom,
        faces.front,
        faces.back,
      ];

      for (let i = 0; i < 6; i++) {
        const [x1, y1, x2, y2] = order[i];
        const u1 = x1 / texW;
        const u2 = x2 / texW;
        const vTop = 1 - y1 / texH;
        const vBottom = 1 - y2 / texH;

        const offset = i * 8;
        uvAttr.setXY(offset / 2, u1, vTop);
        uvAttr.setXY(offset / 2 + 1, u2, vTop);
        uvAttr.setXY(offset / 2 + 2, u1, vBottom);
        uvAttr.setXY(offset / 2 + 3, u2, vBottom);
      }
      uvAttr.needsUpdate = true;
    }

    // Arm references for idle swaying
    let rightArmMesh: THREE.Mesh | null = null;
    let leftArmMesh: THREE.Mesh | null = null;

    // Load Skin Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      skinUrl,
      (skinTexture) => {
        skinTexture.magFilter = THREE.NearestFilter;
        skinTexture.minFilter = THREE.NearestFilter;
        skinTexture.colorSpace = THREE.SRGBColorSpace;

        const opaqueMat = new THREE.MeshStandardMaterial({
          map: skinTexture,
          roughness: 0.65,
          metalness: 0.1,
        });

        const translucentMat = new THREE.MeshStandardMaterial({
          map: skinTexture,
          transparent: true,
          alphaTest: 0.1,
          side: THREE.DoubleSide,
          roughness: 0.5,
          metalness: 0.15,
        });

        // 1. Head (8x8x8 px) -> 1.25 units
        const headSize = 1.25;
        const headGeo = new THREE.BoxGeometry(headSize, headSize, headSize);
        applyMinecraftUVs(headGeo, {
          right: [0, 8, 8, 16],
          left: [16, 8, 24, 16],
          top: [8, 0, 16, 8],
          bottom: [16, 0, 24, 8],
          front: [8, 8, 16, 16],
          back: [24, 8, 32, 16],
        });
        const headMesh = new THREE.Mesh(headGeo, opaqueMat);
        headGroup.add(headMesh);

        // Hat Layer (Outer 3D extruded hair / accessories)
        const hatSize = headSize + 0.1;
        const hatGeo = new THREE.BoxGeometry(hatSize, hatSize, hatSize);
        applyMinecraftUVs(hatGeo, {
          right: [32, 8, 40, 16],
          left: [48, 8, 56, 16],
          top: [40, 0, 48, 8],
          bottom: [48, 0, 56, 8],
          front: [40, 8, 48, 16],
          back: [56, 8, 64, 16],
        });
        const hatMesh = new THREE.Mesh(hatGeo, translucentMat);
        headGroup.add(hatMesh);

        // 2. Torso (8x12x4 px) -> 1.25 x 1.85 x 0.65 units
        const bodyW = 1.25;
        const bodyH = 1.85;
        const bodyD = 0.65;
        const bodyGeo = new THREE.BoxGeometry(bodyW, bodyH, bodyD);
        applyMinecraftUVs(bodyGeo, {
          right: [16, 20, 20, 32],
          left: [28, 20, 32, 32],
          top: [20, 16, 28, 20],
          bottom: [28, 16, 36, 20],
          front: [20, 20, 28, 32],
          back: [32, 20, 40, 32],
        });
        const bodyMesh = new THREE.Mesh(bodyGeo, opaqueMat);
        bodyMesh.position.set(0, -0.85, 0);
        rootGroup.add(bodyMesh);

        // Jacket Layer
        const jacketGeo = new THREE.BoxGeometry(bodyW + 0.08, bodyH + 0.08, bodyD + 0.08);
        applyMinecraftUVs(jacketGeo, {
          right: [16, 36, 20, 48],
          left: [28, 36, 32, 48],
          top: [20, 32, 28, 36],
          bottom: [28, 32, 36, 36],
          front: [20, 36, 28, 48],
          back: [32, 36, 40, 48],
        });
        const jacketMesh = new THREE.Mesh(jacketGeo, translucentMat);
        jacketMesh.position.copy(bodyMesh.position);
        rootGroup.add(jacketMesh);

        // 3. Right Arm (4x12x4 px)
        const armW = 0.6;
        const armH = 1.85;
        const armD = 0.65;
        const rArmGeo = new THREE.BoxGeometry(armW, armH, armD);
        applyMinecraftUVs(rArmGeo, {
          right: [40, 20, 44, 32],
          left: [48, 20, 52, 32],
          top: [44, 16, 48, 20],
          bottom: [48, 16, 52, 20],
          front: [44, 20, 48, 32],
          back: [52, 20, 56, 32],
        });
        rightArmMesh = new THREE.Mesh(rArmGeo, opaqueMat);
        rightArmMesh.position.set(-0.95, -0.85, 0);
        rootGroup.add(rightArmMesh);

        // Right Sleeve Layer
        const rSleeveGeo = new THREE.BoxGeometry(armW + 0.08, armH + 0.08, armD + 0.08);
        applyMinecraftUVs(rSleeveGeo, {
          right: [40, 36, 44, 48],
          left: [48, 36, 52, 48],
          top: [44, 32, 48, 36],
          bottom: [48, 32, 52, 36],
          front: [44, 36, 48, 48],
          back: [52, 36, 56, 48],
        });
        const rSleeveMesh = new THREE.Mesh(rSleeveGeo, translucentMat);
        rSleeveMesh.position.copy(rightArmMesh.position);
        rootGroup.add(rSleeveMesh);

        // 4. Left Arm (4x12x4 px)
        const lArmGeo = new THREE.BoxGeometry(armW, armH, armD);
        applyMinecraftUVs(lArmGeo, {
          right: [32, 52, 36, 64],
          left: [40, 52, 44, 64],
          top: [36, 48, 40, 52],
          bottom: [40, 48, 44, 52],
          front: [36, 52, 40, 64],
          back: [44, 52, 48, 64],
        });
        leftArmMesh = new THREE.Mesh(lArmGeo, opaqueMat);
        leftArmMesh.position.set(0.95, -0.85, 0);
        rootGroup.add(leftArmMesh);

        // Left Sleeve Layer
        const lSleeveGeo = new THREE.BoxGeometry(armW + 0.08, armH + 0.08, armD + 0.08);
        applyMinecraftUVs(lSleeveGeo, {
          right: [48, 52, 52, 64],
          left: [56, 52, 60, 64],
          top: [52, 48, 56, 52],
          bottom: [56, 48, 60, 52],
          front: [52, 52, 56, 64],
          back: [60, 52, 64, 64],
        });
        const lSleeveMesh = new THREE.Mesh(lSleeveGeo, translucentMat);
        lSleeveMesh.position.copy(leftArmMesh.position);
        rootGroup.add(lSleeveMesh);

        // 5. Cybernetic Hologram Pedestal Base
        const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.25, 32);
        const pedestalMat = new THREE.MeshStandardMaterial({
          color: 0x090912,
          roughness: 0.3,
          metalness: 0.9,
        });
        const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
        pedestal.position.set(0, -2.0, 0);
        rootGroup.add(pedestal);

        // Glowing Rune Ring on Pedestal
        const ringGeo = new THREE.TorusGeometry(1.4, 0.03, 16, 48);
        const ringMat = new THREE.MeshStandardMaterial({
          color: primaryHex,
          emissive: primaryHex,
          emissiveIntensity: 3.0,
          roughness: 0.1,
          metalness: 0.9,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(0, -1.86, 0);
        rootGroup.add(ring);

        setLoaded(true);
      },
      undefined,
      (err) => {
        console.error(`Error loading skin ${skinUrl}:`, err);
      }
    );

    // Animation Loop
    let reqId: number;
    let lastTime = performance.now();
    const startTime = performance.now();
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Head remains firmly fixed facing forward (not rotatable)
      headGroup.rotation.set(0, 0, 0);

      // Gentle subtle floating animation for character
      rootGroup.position.y = Math.sin(elapsed * 1.5) * 0.05;

      // Subtle arm breathing sway
      if (rightArmMesh && leftArmMesh) {
        rightArmMesh.rotation.x = Math.sin(elapsed * 1.2) * 0.05;
        leftArmMesh.rotation.x = -Math.sin(elapsed * 1.2) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / sceneHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, sceneHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = "";
      }
    };
  }, [skinUrl, badgeColor, height, interactive]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full select-none">
      {/* 3D Floating Nameplate above Head */}
      <div className="absolute top-2 z-20 flex flex-col items-center gap-1 pointer-events-none animate-bounce">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/80 border border-zinc-700/80 shadow-[0_4px_15px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <span
            className={`text-[9px] font-minecraft font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
              badgeColor === "red"
                ? "bg-red-950/80 border border-red-500/50 text-red-400"
                : badgeColor === "amber"
                ? "bg-amber-950/80 border border-amber-500/50 text-amber-400"
                : "bg-cyan-950/80 border border-cyan-500/50 text-cyan-400"
            }`}
          >
            {roleBadge}
          </span>
          <span className="font-minecraft text-xs font-bold text-white tracking-wider mc-shadow">
            {username}
          </span>
        </div>
      </div>

      {/* Loading Skeleton Indicator */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin" />
        </div>
      )}

      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        style={{ height }}
        className="w-full relative z-10 pointer-events-none"
      />
    </div>
  );
}
