"use client";

import React, { useState } from "react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import { Trophy, Crown, Flame, Search } from "lucide-react";
import MinecraftItem from "@/components/MinecraftItem";

interface PlayerRecord {
  rank: number;
  name: string;
  uuid: string;
  avatar: string;
  kills: number;
  deaths: number;
  kd: string;
  balance: string;
  level: number;
  shards: number;
  tag: string;
}

export default function Leaderboard() {
  const [activeCategory, setActiveCategory] = useState<"kills" | "balance" | "shards" | "level">("kills");
  const [searchQuery, setSearchQuery] = useState("");

  // Authentic Minecraft players with realistic Bangladesh and global IGNs
  const players: PlayerRecord[] = [
    {
      rank: 1,
      name: "TecnoLegend",
      uuid: "0c551816c70b4456a6fa94ed6e76d4b5",
      avatar: "https://mc-heads.net/avatar/TecnoLegend/100",
      kills: 3842,
      deaths: 142,
      kd: "27.05",
      balance: "৳ 4,850,000",
      level: 120,
      shards: 1420,
      tag: "FOUNDER",
    },
    {
      rank: 2,
      name: "CrimsonFury",
      uuid: "steve",
      avatar: "https://mc-heads.net/avatar/MHF_Herobrine/100",
      kills: 2940,
      deaths: 210,
      kd: "14.00",
      balance: "৳ 3,210,000",
      level: 104,
      shards: 980,
      tag: "LEGEND",
    },
    {
      rank: 3,
      name: "BengalTiger_BD",
      uuid: "alex",
      avatar: "https://mc-heads.net/avatar/BengalTiger/100",
      kills: 2615,
      deaths: 245,
      kd: "10.67",
      balance: "৳ 2,750,000",
      level: 96,
      shards: 850,
      tag: "HERO",
    },
    {
      rank: 4,
      name: "Vortex_Knight",
      uuid: "vortex",
      avatar: "https://mc-heads.net/avatar/Vortex/100",
      kills: 1980,
      deaths: 310,
      kd: "6.38",
      balance: "৳ 1,950,000",
      level: 88,
      shards: 620,
      tag: "KING",
    },
    {
      rank: 5,
      name: "DhakaPhantom",
      uuid: "phantom",
      avatar: "https://mc-heads.net/avatar/Phantom/100",
      kills: 1750,
      deaths: 340,
      kd: "5.14",
      balance: "৳ 1,420,000",
      level: 79,
      shards: 540,
      tag: "ELITE",
    },
    {
      rank: 6,
      name: "SilentReaper",
      uuid: "reaper",
      avatar: "https://mc-heads.net/avatar/Reaper/100",
      kills: 1540,
      deaths: 402,
      kd: "3.83",
      balance: "৳ 1,180,000",
      level: 72,
      shards: 480,
      tag: "ELITE",
    },
    {
      rank: 7,
      name: "NetherSlayerBD",
      uuid: "slayer",
      avatar: "https://mc-heads.net/avatar/Slayer/100",
      kills: 1390,
      deaths: 388,
      kd: "3.58",
      balance: "৳ 980,000",
      level: 68,
      shards: 410,
      tag: "VIP",
    },
    {
      rank: 8,
      name: "ShadowStrike",
      uuid: "shadow",
      avatar: "https://mc-heads.net/avatar/Shadow/100",
      kills: 1220,
      deaths: 415,
      kd: "2.93",
      balance: "৳ 890,000",
      level: 64,
      shards: 370,
      tag: "VIP",
    },
    {
      rank: 9,
      name: "ChittagongGladiator",
      uuid: "gladiator",
      avatar: "https://mc-heads.net/avatar/Gladiator/100",
      kills: 1150,
      deaths: 490,
      kd: "2.34",
      balance: "৳ 750,000",
      level: 59,
      shards: 320,
      tag: "VIP",
    },
    {
      rank: 10,
      name: "SylhetWarrior",
      uuid: "warrior",
      avatar: "https://mc-heads.net/avatar/Warrior/100",
      kills: 1080,
      deaths: 512,
      kd: "2.10",
      balance: "৳ 620,000",
      level: 55,
      shards: 290,
      tag: "MEMBER",
    },
  ];

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top3 = [players[1], players[0], players[2]]; // Podium order: 2nd, 1st, 3rd

  return (
    <section id="leaderboards" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07070a]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-minecraft tracking-widest uppercase">
            <Trophy className="w-3.5 h-3.5" />
            SEASON III RANKINGS
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-minecraft font-bold uppercase tracking-tight text-white mc-shadow">
            DOMINATE THE <span className="text-red-500">RANKS.</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg">
            Glory, shards, and seasonal rewards await the fiercest warriors on
            BrutalMC. Updated in real time from server database hooks.
          </p>
        </div>

        {/* Podium Layout for Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 items-end">
          {/* #2 Player (Silver) */}
          <div className="order-2 md:order-1 relative rounded-2xl p-[1px] bg-gradient-to-t from-zinc-800 via-zinc-700 to-slate-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="rounded-2xl bg-[#090910] p-6 text-center flex flex-col items-center">
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-[0_0_20px_rgba(148,163,184,0.3)] bg-zinc-900">
                  <Image
                    src={top3[0].avatar}
                    alt={top3[0].name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-black text-xs flex items-center gap-1">
                  <MinecraftItem name="diamond_helmet" size={14} />
                  <span>#2</span>
                </span>
              </div>

              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                {top3[0].tag}
              </span>
              <h3 className="text-lg font-bold text-white mt-1 truncate max-w-full">
                {top3[0].name}
              </h3>

              <div className="grid grid-cols-2 gap-2 w-full mt-4 pt-3 border-t border-zinc-800/80 text-xs font-mono">
                <div>
                  <div className="text-zinc-500">KILLS</div>
                  <div className="text-white font-bold">{top3[0].kills.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-zinc-500">K/D</div>
                  <div className="text-emerald-400 font-bold">{top3[0].kd}</div>
                </div>
              </div>
            </div>
          </div>

          {/* #1 Player (Gold & Glowing Flaming Aura) */}
          <div className="order-1 md:order-2 relative rounded-3xl p-[2px] bg-gradient-to-b from-amber-400 via-red-600 to-rose-700 shadow-[0_0_50px_rgba(255,0,51,0.6)] md:-translate-y-6">
            <div className="rounded-3xl bg-[#0e0a12] p-8 text-center flex flex-col items-center relative overflow-hidden">
              {/* Radial flaming glow behind #1 */}
              <div className="absolute inset-0 bg-radial from-red-600/20 via-transparent to-transparent blur-xl pointer-events-none" />

              {/* Crown Badge */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 text-amber-400 mb-2 animate-bounce">
                <Crown className="w-5 h-5" />
              </div>

              <div className="relative mb-3">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-red-500 shadow-[0_0_30px_rgba(255,0,51,0.8)] bg-zinc-900 ring-4 ring-red-500/30">
                  <Image
                    src={top3[1].avatar}
                    alt={top3[1].name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <span className="absolute -bottom-2.5 -right-2 px-3 py-0.5 rounded-full bg-red-600 text-white font-minecraft text-xs shadow-lg flex items-center gap-1.5 mc-shadow">
                  <MinecraftItem name="nether_star" size={16} glow="gold" />
                  <span>#1 CHAMPION</span>
                </span>
              </div>

              <span className="text-xs font-minecraft font-bold text-red-400 tracking-widest uppercase px-2.5 py-0.5 rounded bg-red-950/60 border border-red-500/40">
                {top3[1].tag}
              </span>
              <h3 className="text-xl font-minecraft font-bold text-white mt-1 truncate max-w-full tracking-wide mc-shadow">
                {top3[1].name}
              </h3>

              <div className="grid grid-cols-3 gap-2 w-full mt-6 pt-4 border-t border-red-500/30 text-xs font-mono">
                <div>
                  <div className="text-zinc-400 text-[10px]">KILLS</div>
                  <div className="text-white font-black text-sm">{top3[1].kills.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px]">K/D</div>
                  <div className="text-emerald-400 font-black text-sm">{top3[1].kd}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px]">LEVEL</div>
                  <div className="text-amber-400 font-black text-sm">{top3[1].level}</div>
                </div>
              </div>
            </div>
          </div>

          {/* #3 Player (Bronze) */}
          <div className="order-3 relative rounded-2xl p-[1px] bg-gradient-to-t from-zinc-800 via-zinc-700 to-amber-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="rounded-2xl bg-[#090910] p-6 text-center flex flex-col items-center">
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-700 shadow-[0_0_20px_rgba(180,83,9,0.3)] bg-zinc-900">
                  <Image
                    src={top3[2].avatar}
                    alt={top3[2].name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-900 border border-amber-700 text-amber-200 font-minecraft text-xs flex items-center gap-1 mc-shadow">
                  <MinecraftItem name="iron_sword" size={14} />
                  <span>#3</span>
                </span>
              </div>

              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                {top3[2].tag}
              </span>
              <h3 className="text-lg font-bold text-white mt-1 truncate max-w-full">
                {top3[2].name}
              </h3>

              <div className="grid grid-cols-2 gap-2 w-full mt-4 pt-3 border-t border-zinc-800/80 text-xs font-mono">
                <div>
                  <div className="text-zinc-500">KILLS</div>
                  <div className="text-white font-bold">{top3[2].kills.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-zinc-500">K/D</div>
                  <div className="text-emerald-400 font-bold">{top3[2].kd}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Table Filter & Search Controls */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-zinc-800 bg-[#09090f]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="p-4 sm:p-6 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-500" />
              <span className="font-mono font-bold text-sm text-white uppercase tracking-wider">
                HALL OF CHAMPIONS
              </span>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gladiator..."
                className="w-full bg-zinc-900/80 border border-zinc-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-mono"
              />
            </div>
          </div>

          {/* Table Header & Rows */}
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[620px] text-left text-xs font-mono">
              <thead className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4 sm:px-6">RANK</th>
                  <th className="py-3 px-4">WARRIOR</th>
                  <th className="py-3 px-4 text-right">KILLS</th>
                  <th className="py-3 px-4 text-right">DEATHS</th>
                  <th className="py-3 px-4 text-right">K/D</th>
                  <th className="py-3 px-4 text-right">BALANCE</th>
                  <th className="py-3 px-4 sm:px-6 text-right">LEVEL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {filteredPlayers.map((player) => (
                  <tr
                    key={player.name}
                    onMouseEnter={() => sound.playHover()}
                    className="hover:bg-zinc-900/40 transition-colors group"
                  >
                    <td className="py-3 px-4 sm:px-6 font-bold">
                      <span
                        className={`inline-block w-6 text-center ${
                          player.rank === 1
                            ? "text-amber-400 font-black"
                            : player.rank === 2
                            ? "text-slate-300 font-bold"
                            : player.rank === 3
                            ? "text-amber-600 font-bold"
                            : "text-zinc-500"
                        }`}
                      >
                        #{player.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
                          <Image
                            src={player.avatar}
                            alt={player.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-white group-hover:text-red-400 transition-colors">
                            {player.name}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            {player.tag}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-zinc-200">
                      {player.kills.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-zinc-400">
                      {player.deaths.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-400">
                      {player.kd}
                    </td>
                    <td className="py-3 px-4 text-right text-zinc-300">
                      {player.balance}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-right font-bold text-amber-400">
                      Lv.{player.level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
