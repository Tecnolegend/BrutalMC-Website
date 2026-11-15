"use client";

import React, { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Pixel Particle System (Minecraft-inspired square embers)
    const particleCount = window.innerWidth < 768 ? 35 : 70;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.floor(Math.random() * 3) + 2, // 2px to 4px square
      speedY: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color:
        Math.random() > 0.4
          ? "255, 0, 51" // Crimson red
          : Math.random() > 0.5
          ? "225, 29, 72" // Blood ruby
          : "255, 120, 120", // Hot ember
    }));

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Render Minecraft square particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y -= p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = Math.max(0.15, Math.min(0.75, p.alpha));
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Obsidian Background */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* Cyberpunk Isometric Subdued Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 0, 51, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 0, 51, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%)",
        }}
      />

      {/* Atmospheric Red Fog & Energy Waves */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-radial from-red-600/18 via-red-950/8 to-transparent blur-3xl opacity-70" />
      <div className="absolute top-[30%] -left-[10%] w-[600px] h-[600px] bg-radial from-red-700/12 via-transparent to-transparent blur-3xl" />
      <div className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-radial from-rose-600/10 via-transparent to-transparent blur-3xl" />

      {/* Canvas for Rising Minecraft Pixel Embers */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Vignette for Cinema Depth */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-[#050508]" />
    </div>
  );
}
