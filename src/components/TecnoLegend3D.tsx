"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function TecnoLegend3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkMobile = window.innerWidth < 768;
    setIsMobile(checkMobile);

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.5, 5.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, checkMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Root Group for the character
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // Head Group (rotates with mouse)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.2, 0);
    characterGroup.add(headGroup);

    // Lighting
    // 1. Ambient
    const ambientLight = new THREE.AmbientLight(0x2d1522, 1.8);
    scene.add(ambientLight);

    // 2. Key light (cool neutral white)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    // 3. Fill light (soft charcoal)
    const fillLight = new THREE.DirectionalLight(0x6b7280, 0.8);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    // 4. Crimson Esports Rim Light (Rear-Right)
    const crimsonRim = new THREE.PointLight(0xff0044, 18, 12);
    crimsonRim.position.set(2.8, 1.5, -2);
    scene.add(crimsonRim);

    // 5. Blood Red Accent Light (Rear-Left)
    const rubyRim = new THREE.PointLight(0xe11d48, 12, 10);
    rubyRim.position.set(-2.8, 1.0, -1.8);
    scene.add(rubyRim);

    // 6. Under-glow pedestal light
    const underGlow = new THREE.PointLight(0xff0033, 8, 5);
    underGlow.position.set(0, -1.5, 1);
    scene.add(underGlow);

    // Helper to generate custom UVs for Minecraft cubes
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
        // 4 vertices per face: [u1, vTop], [u2, vTop], [u1, vBottom], [u2, vBottom]
        uvAttr.setXY(offset / 2, u1, vTop);
        uvAttr.setXY(offset / 2 + 1, u2, vTop);
        uvAttr.setXY(offset / 2 + 2, u1, vBottom);
        uvAttr.setXY(offset / 2 + 3, u2, vBottom);
      }
      uvAttr.needsUpdate = true;
    }

    // Load authentic TecnoLegend Minecraft Skin Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/images/tecnolegend_skin.png",
      (skinTexture) => {
        skinTexture.magFilter = THREE.NearestFilter;
        skinTexture.minFilter = THREE.NearestFilter;
        skinTexture.colorSpace = THREE.SRGBColorSpace;

        // Base Head Mesh (8x8x8 pixels)
        const headSize = 1.4;
        const headGeo = new THREE.BoxGeometry(headSize, headSize, headSize);
        applyMinecraftUVs(headGeo, {
          right: [0, 8, 8, 16],
          left: [16, 8, 24, 16],
          top: [8, 0, 16, 8],
          bottom: [16, 0, 24, 8],
          front: [8, 8, 16, 16],
          back: [24, 8, 32, 16],
        });

        const headMat = new THREE.MeshStandardMaterial({
          map: skinTexture,
          roughness: 0.65,
          metalness: 0.15,
        });
        const headMesh = new THREE.Mesh(headGeo, headMat);
        headGroup.add(headMesh);

        // Outer Hat / Hair Layer Mesh (Extruded by 0.08 units for authentic 3D depth)
        const hatSize = headSize + 0.12;
        const hatGeo = new THREE.BoxGeometry(hatSize, hatSize, hatSize);
        applyMinecraftUVs(hatGeo, {
          right: [32, 8, 40, 16],
          left: [48, 8, 56, 16],
          top: [40, 0, 48, 8],
          bottom: [48, 0, 56, 8],
          front: [40, 8, 48, 16],
          back: [56, 8, 64, 16],
        });

        const hatMat = new THREE.MeshStandardMaterial({
          map: skinTexture,
          transparent: true,
          alphaTest: 0.1,
          side: THREE.DoubleSide,
          roughness: 0.5,
          metalness: 0.2,
        });
        const hatMesh = new THREE.Mesh(hatGeo, hatMat);
        headGroup.add(hatMesh);

        // Upper Torso / Collar (Cyberpunk Esports Pedestal)
        const bodyGeo = new THREE.BoxGeometry(1.4, 0.7, 0.7);
        applyMinecraftUVs(bodyGeo, {
          right: [16, 20, 20, 24],
          left: [28, 20, 32, 24],
          top: [20, 16, 28, 20],
          bottom: [28, 16, 36, 20],
          front: [20, 20, 28, 24],
          back: [32, 20, 40, 24],
        });
        const bodyMesh = new THREE.Mesh(bodyGeo, headMat);
        bodyMesh.position.set(0, -1.05, 0);
        characterGroup.add(bodyMesh);

        // Futuristic Floating Pedestal Rings (Obsidian & Crimson Glow)
        const ringGeo = new THREE.TorusGeometry(1.2, 0.025, 16, 64);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xff0033,
          emissive: 0xff0033,
          emissiveIntensity: 2.0,
          roughness: 0.2,
          metalness: 0.8,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.2;
        ring.position.set(0, -1.5, 0);
        characterGroup.add(ring);

        // Outer Dark Steel Tech Ring
        const outerRingGeo = new THREE.TorusGeometry(1.5, 0.03, 16, 64);
        const outerRingMat = new THREE.MeshStandardMaterial({
          color: 0x1f1f2e,
          roughness: 0.4,
          metalness: 0.9,
        });
        const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
        outerRing.rotation.x = Math.PI / 2.1;
        outerRing.position.set(0, -1.6, 0);
        characterGroup.add(outerRing);

        // Soft Circular Shadow Plane Beneath Character
        const shadowCanvas = document.createElement("canvas");
        shadowCanvas.width = 128;
        shadowCanvas.height = 128;
        const sctx = shadowCanvas.getContext("2d")!;
        const grad = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, "rgba(255, 0, 51, 0.45)");
        grad.addColorStop(0.3, "rgba(20, 0, 10, 0.7)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        sctx.fillStyle = grad;
        sctx.fillRect(0, 0, 128, 128);

        const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
        const shadowPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(3.2, 3.2),
          new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            depthWrite: false,
          })
        );
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = -1.75;
        characterGroup.add(shadowPlane);

        setLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Error loading TecnoLegend skin:", err);
      }
    );

    // Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = ((clientX / rect.width) * 2 - 1) * 0.65;
      mouse.targetY = -((clientY / rect.height) * 2 - 1) * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Viewport Visibility Optimization via IntersectionObserver
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation Loop
    let reqId: number;
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Head lookAt + subtle idle breathing
      headGroup.rotation.y = mouse.x + Math.sin(elapsed * 0.8) * 0.08;
      headGroup.rotation.x = -mouse.y + Math.cos(elapsed * 0.7) * 0.04;

      // Subtle float animation for character
      characterGroup.position.y = Math.sin(elapsed * 1.6) * 0.08;
      characterGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(reqId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* 3D Canvas Mount Point */}
      <div
        ref={containerRef}
        className="w-full h-[340px] sm:h-[440px] lg:h-[560px] xl:h-[620px] pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* Loading Glow State */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin" />
        </div>
      )}

      {/* Futuristic Holographic Identity Tag */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/85 border border-red-500/40 backdrop-blur-md shadow-[0_0_25px_rgba(255,0,51,0.35)] text-xs font-mono tracking-wider">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="text-white font-extrabold tracking-wide">Tecnolegend</span>
        <span className="text-red-500 font-bold">•</span>
        <span className="text-red-400 font-bold uppercase">Founder</span>
      </div>
    </div>
  );
}
