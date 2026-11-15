"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import {
  Flame,
  ArrowUpRight,
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  stats: string;
}

function FeatureCard({ title, description, icon, tag, stats }: FeatureCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => sound.playHover()}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: "transform 0.15s ease-out",
        willChange: "transform",
      }}
      className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:from-red-600 hover:via-rose-600 hover:to-red-950 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(255,0,51,0.35)] cursor-default"
    >
      {/* Glassmorphic Dark Body */}
      <div className="relative h-full w-full rounded-2xl bg-[#0a0a10]/95 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
        {/* Subtle Ambient Radial Glow on Hover */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-radial from-red-600/25 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Meta: Icon + Tag */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-zinc-800 group-hover:border-red-500/50 group-hover:bg-red-950/40 flex items-center justify-center text-zinc-300 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300 shadow-inner">
              {icon}
            </div>
            <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 group-hover:border-red-500/30 transition-colors">
              {tag}
            </span>
          </div>

          <h3 className="text-xl font-extrabold uppercase tracking-wide text-white group-hover:text-red-400 transition-colors font-sans mb-3 flex items-center gap-2">
            <span>{title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-red-500" />
          </h3>

          <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
            {description}
          </p>
        </div>

        {/* Bottom Stat Badge */}
        <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500">OPTIMIZATION</span>
          <span className="text-red-400 font-bold">{stats}</span>
        </div>
      </div>
    </div>
  );
}

import MinecraftItem from "@/components/MinecraftItem";

export default function Features() {
  const features = [
    {
      title: "CUSTOM WORLD",
      description:
        "Explore a handcrafted world designed specifically for BrutalMC with custom dungeons, unique landmarks, dangerous biomes, and epic lore.",
      icon: <MinecraftItem name="recovery_compass_00" size={28} glow="cyan" />,
      tag: "HANDCRAFTED",
      stats: "100% EXCLUSIVE",
    },
    {
      title: "ADVANCED ECONOMY",
      description:
        "A next-generation player-driven economy built around inflation control, dynamic auction houses, player markets, and seasonal resets.",
      icon: <MinecraftItem name="diamond" size={28} glow="cyan" />,
      tag: "FINANCE",
      stats: "BALANCED META",
    },
    {
      title: "CUSTOM SHARD SYSTEM",
      description:
        "A proprietary blood-shard progression mechanic. Collect rare shards from player kills and world bosses to forge mythical artifacts.",
      icon: <MinecraftItem name="netherite_ingot" size={28} glow="purple" />,
      tag: "PROGRESSION",
      stats: "TIER 1 ARTIFACTS",
    },
    {
      title: "CUSTOM LEADERBOARDS",
      description:
        "Compete against top Bangladeshi gladiators on real-time leaderboards tracking Kills, K/D, Shards, Balances, and Tournament titles.",
      icon: <MinecraftItem name="nether_star" size={28} glow="gold" />,
      tag: "COMPETITIVE",
      stats: "REAL-TIME ELO",
    },
    {
      title: "CUSTOM DRAGON BOSS",
      description:
        "Battle our empowered Custom Ender Dragon featuring multi-phase AI, homing void orbs, crystal energy shields, and exclusive Dragon Scale armor & Elytra drops.",
      icon: <MinecraftItem name="dragon_breath" size={28} glow="purple" />,
      tag: "MYTHIC BOSS",
      stats: "MULTI-PHASE RAID",
    },
    {
      title: "ACTIVE COMMUNITY",
      description:
        "A vibrant community of thousands of Minecraft enthusiasts with weekend tournaments, bKash prize giveaways, and friendly staff support.",
      icon: <MinecraftItem name="totem_of_undying" size={28} glow="emerald" />,
      tag: "COMMUNITY",
      stats: "15,000+ MEMBERS",
    },
  ];

  return (
    <section id="features" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508]">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-red-950/20 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Flame className="w-3.5 h-3.5" />
            NEXT-GEN ARCHITECTURE
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans">
            BUILT <span className="text-red-500">DIFFERENT.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-medium">
            BrutalMC isn&apos;t another ordinary Minecraft server. We rebuilt core
            mechanics from the ground up for speed, competition, and lasting excitement.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <FeatureCard key={feat.title} {...feat} />
          ))}
        </div>
      </div>
    </section>
  );
}
