"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Coins, Gem, Sparkles, Trophy, Zap } from "lucide-react";

export default function Progression() {
  const [activeTier, setActiveTier] = useState<number>(0);

  const tiers = [
    {
      title: "COINS (CURRENCY)",
      badge: "BASE ECONOMY",
      icon: <Coins className="w-8 h-8 text-amber-400" />,
      color: "from-amber-500/20 to-amber-950/40 border-amber-500/40",
      description:
        "The standard trading token across all BrutalMC realms. Earned through mob grinding, daily quests, player trade shops, and selling minerals at /ah.",
      useCases: ["Auction House trading", "Shop plot purchases", "Basic gear repair", "Player chest shops"],
      stat: "100% Player Driven",
    },
    {
      title: "BLOOD SHARDS",
      badge: "ELITE PROGRESSION",
      icon: <Gem className="w-8 h-8 text-red-500" />,
      color: "from-red-600/25 to-red-950/50 border-red-500/50",
      description:
        "The most coveted dark currency in Bangladesh. Dropped only on player PvP executions, ender dragon defeats, and dungeon boss clears.",
      useCases: ["Forging custom gear", "Unlocking mythical enchantments", "Summoning raid bosses", "Purchasing Black Market armor"],
      stat: "Extremely Rare",
    },
    {
      title: "SOUL GEMS & RELICS",
      badge: "MYTHIC ARTIFACTS",
      icon: <Sparkles className="w-8 h-8 text-rose-400" />,
      color: "from-rose-500/20 to-purple-950/40 border-rose-500/40",
      description:
        "Ancient elemental crystals discovered deep within BrutalMC's custom Nether and End structures. Socket them into custom gear for passive abilities.",
      useCases: ["Vampiric health leech", "Knockback resistance +20%", "Critical strike lightning proc", "Double loot drop chance"],
      stat: "Tier IV Sockets",
    },
    {
      title: "PRESTIGE & TITLES",
      badge: "SEASONAL RANKS",
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      color: "from-yellow-500/20 to-red-950/40 border-yellow-500/40",
      description:
        "Reset your level at maximum threshold to earn eternal prestige stars, custom kill banners in chat, and permanent stat boosts across all resets.",
      useCases: ["Custom kill messages", "Priority queue slot", "Discord role synchronization", "Exclusive lobby particle wings"],
      stat: "10 Prestige Tiers",
    },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] overflow-hidden">
      {/* Red ambient background fog */}
      <div className="absolute -top-24 left-1/3 w-[600px] h-[600px] bg-radial from-red-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5" />
            ECONOMIC ENGINE
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans">
            PROGRESSION & <span className="text-red-500">ECONOMY.</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg">
            No inflation. No pay-to-win shortcuts. Pure merit-based progression
            calibrated for competitive survival and fierce warfare.
          </p>
        </div>

        {/* Interactive Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={tier.title}
              onMouseEnter={() => {
                sound.playHover();
                setActiveTier(idx);
              }}
              className={`group relative rounded-3xl p-[1px] bg-gradient-to-b ${tier.color} transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(255,0,51,0.3)] hover:-translate-y-2 cursor-pointer`}
            >
              <div className="relative h-full w-full rounded-3xl bg-[#09090f]/95 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-red-500/40 transition-transform">
                      {tier.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-wide text-white group-hover:text-red-400 transition-colors font-sans mb-3">
                    {tier.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Bullet Applications */}
                  <div className="space-y-2 border-t border-zinc-900 pt-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      PRIMARY USES:
                    </span>
                    {tier.useCases.map((use) => (
                      <div
                        key={use}
                        className="flex items-center gap-2 text-xs text-zinc-300 font-mono"
                      >
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                        <span className="truncate">{use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Stat */}
                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">RARITY</span>
                  <span className="text-amber-400 font-bold">{tier.stat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
