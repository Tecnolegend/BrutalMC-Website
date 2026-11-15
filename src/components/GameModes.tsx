"use client";

import React, { useState } from "react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import {
  Globe2,
  Sparkles,
  Play,
  CheckCircle2,
} from "lucide-react";

interface GameModesProps {
  onPlayClick: () => void;
}

export default function GameModes({ onPlayClick }: GameModesProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const survivalPillars = [
    {
      id: "worldgen",
      name: "HANDCRAFTED WORLD GENERATION",
      tag: "CUSTOM WORLD",
      badgeColor: "bg-emerald-600/30 border-emerald-500/50 text-emerald-400",
      description:
        "Explore an awe-inspiring, custom-generated terrain crafted specifically for BrutalMC. Venture through towering alpine peaks, dense redwood canopies, realistic winding river valleys, and bioluminescent subterranean crystal caverns.",
      image: "/images/survival_world.jpg",
      badge: "Custom Biomes & Terrain",
      version: "1.20.x - 1.21.x",
      category: "world",
      features: [
        "100+ Unique Custom Biomes",
        "Majestic Mountain Ranges & Canyons",
        "Deep Subterranean Crystal Caves",
        "Zero Generic Vanilla Terrain",
      ],
    },
    {
      id: "custom-dragon",
      name: "THE CUSTOM ENDER DRAGON",
      tag: "MYTHIC BOSS FIGHT",
      badgeColor: "bg-purple-600/30 border-purple-500/50 text-purple-400",
      description:
        "The End dimension is dominated by our custom-engineered Ender Dragon boss. Featuring multi-phase aerial combat, shockwave ground slams, homing void orbs, crystal shield phases, and exclusive Dragon Scale armor & Elytra drops.",
      image: "/images/ender_dragon_boss.jpg",
      badge: "Multi-Phase Raid Boss",
      version: "Server-Wide Respawn Altar",
      category: "dragon",
      features: [
        "Multi-Phase AI Combat Mechanics",
        "Homing Void Breath & Meteor Rain",
        "Empowered Ender Crystal Shields",
        "Exclusive Dragon Scale & Elytra Drops",
      ],
    },
    {
      id: "dungeons",
      name: "MYTHIC DUNGEONS & WORLD BOSSES",
      tag: "DUNGEON EXPEDITION",
      badgeColor: "bg-red-600/30 border-red-500/50 text-red-400",
      description:
        "Hidden across the custom world are procedural dungeon labyrinths guarded by elite mob variants, puzzle traps, and colossal world bosses like Voidrax. Slay them to forge mythical weapons and socketable artifacts.",
      image: "/images/dungeon_ruins.jpg",
      badge: "Challenging Boss Raids",
      version: "Weekly Server Events",
      category: "dungeons",
      features: [
        "Procedural Ancient Ruins & Catacombs",
        "Colossal World Boss Battles",
        "Exclusive Mythic Loot & Relics",
        "Puzzle Chambers & Secret Vaults",
      ],
    },
    {
      id: "clans",
      name: "CLAN WARFARE & WILDERNESS FORTS",
      tag: "WARFARE & BASES",
      badgeColor: "bg-red-600/30 border-red-500/50 text-red-400",
      description:
        "Construct fortified underground bunkers, automated redstone outposts, and clan fortresses across the brutal wilderness. Team up with your clan, defend your treasures, and conquer the open landscape without artificial restrictions.",
      image: "/images/spawn_cathedral.jpg",
      badge: "Unrestricted Sandbox",
      version: "Clan Wars & Raids",
      category: "clans",
      features: [
        "Form Powerful Clan Alliances",
        "Hidden Underground Bunkers & Vaults",
        "Tactical Traps & Base Defenses",
        "Pure Unrestricted Survival Freedom",
      ],
    },
    {
      id: "economy",
      name: "PLAYER ECONOMY & AUCTION HOUSE",
      tag: "COMMERCE",
      badgeColor: "bg-amber-600/30 border-amber-500/50 text-amber-400",
      description:
        "Trade freely in an open player-run economy. Set up chest shops at your town base, trade minerals with friends, and list rare treasures and gear on the global Auction House (/ah).",
      image: "/images/player_market.jpg",
      badge: "Fair & Zero Pay-to-Win",
      version: "Player-Driven Market",
      category: "economy",
      features: [
        "Global Auction House (/ah)",
        "Player Base Chest Shops",
        "Fair Diamond & Coin Trade",
        "Zero Pay-to-Win Advantage",
      ],
    },
  ];

  const filteredPillars =
    activeTab === "all"
      ? survivalPillars
      : survivalPillars.filter((p) => p.category === activeTab);

  return (
    <section
      id="survival"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07070a] overflow-hidden"
    >
      {/* Anchor alias so #modes still works seamlessly */}
      <span id="modes" className="absolute -top-28" />

      {/* Red ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-radial from-red-600/15 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-radial from-rose-600/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
              <Globe2 className="w-3.5 h-3.5" />
              FLAGSHIP SURVIVAL REALM
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans">
              CUSTOM WORLD <span className="text-red-500">SURVIVAL.</span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg">
              BrutalMC is built exclusively as a premium Custom World Survival SMP.
              Featuring an empowered Custom Ender Dragon, handcrafted terrain,
              dungeon raids, and clan wilderness fortresses.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 self-start md:self-end">
            {[
              { id: "all", label: "All Features" },
              { id: "world", label: "World Gen" },
              { id: "dragon", label: "Custom Dragon" },
              { id: "dungeons", label: "Dungeons" },
              { id: "clans", label: "Clans & Bases" },
              { id: "economy", label: "Economy & /ah" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-[0_0_12px_rgba(255,0,51,0.5)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPillars.map((pillar) => (
            <div
              key={pillar.id}
              onMouseEnter={() => sound.playHover()}
              className="group relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-b from-zinc-800/80 via-zinc-900 to-black hover:from-red-500/50 hover:to-zinc-900 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
            >
              <div className="relative bg-[#09090f] rounded-3xl overflow-hidden flex flex-col h-full">
                {/* Image Showcase */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-[#09090f]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border backdrop-blur-md ${pillar.badgeColor}`}
                    >
                      {pillar.tag}
                    </span>

                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold text-zinc-200 bg-black/70 border border-zinc-700 backdrop-blur-md flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-red-400" />
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title over image bottom */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-xl sm:text-2xl font-black text-white font-sans uppercase tracking-tight group-hover:text-red-400 transition-colors">
                      {pillar.name}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      {pillar.version}
                    </span>
                  </div>
                </div>

                {/* Content & Feature Checklist */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-zinc-800/80">
                    {pillar.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 text-xs font-medium text-zinc-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => {
                      sound.playPower();
                      onPlayClick();
                    }}
                    className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-red-600 border border-zinc-800 hover:border-red-500 text-zinc-200 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,0,51,0.4)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-red-500 group-hover/btn:text-white" />
                    <span>Join Custom Survival (play.brutalmc.xyz)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
