"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import { Crown, ShieldCheck, Check, ArrowRight, X, CreditCard } from "lucide-react";
import { BkashIcon, NagadIcon } from "@/components/PaymentIcons";
import MinecraftEmoji, { MinecraftEmojiName } from "@/components/MinecraftEmoji";

interface RankItem {
  id: string;
  name: string;
  badge: string;
  emoji: MinecraftEmojiName;
  priceBDT: number;
  priceUSD: number;
  featured?: boolean;
  color: string;
  glow: string;
  perks: string[];
  kits: string;
  vaults: number;
  multiplier: string;
}

export default function Ranks() {
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [selectedRank, setSelectedRank] = useState<RankItem | null>(null);

  const ranks: RankItem[] = [
    {
      id: "elite",
      name: "ELITE",
      badge: "ENTRY TIER",
      emoji: "iron_sword",
      priceBDT: 350,
      priceUSD: 4.99,
      color: "border-zinc-700 bg-zinc-900/40 text-zinc-300",
      glow: "hover:border-zinc-500",
      perks: [
        "/fly in Lobby & Hubs",
        "Exclusive [ELITE] Bronze Chat Tag",
        "Access to /workbench & /craft",
        "Keep 50% XP upon PvP death",
        "1x Private Player Vault (/pv 1)",
        "Discord VIP Role & Channel access",
      ],
      kits: "Kit Elite (Every 24h)",
      vaults: 1,
      multiplier: "1.2x Coins",
    },
    {
      id: "king",
      name: "KING",
      badge: "POPULAR",
      emoji: "gold_ingot",
      priceBDT: 750,
      priceUSD: 8.99,
      color: "border-amber-500/40 bg-amber-950/20 text-amber-400",
      glow: "hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]",
      perks: [
        "All ELITE perks included",
        "Keep 100% XP on Death (KeepXP)",
        "Access to /feed every 10 minutes",
        "Custom Death Messages broadcast",
        "2x Private Player Vaults (/pv 1-2)",
        "Priority Server Queue bypass",
      ],
      kits: "Kit King (Every 24h)",
      vaults: 2,
      multiplier: "1.5x Coins",
    },
    {
      id: "hero",
      name: "HERO",
      badge: "VETERAN",
      emoji: "diamond_sword",
      priceBDT: 1400,
      priceUSD: 14.99,
      color: "border-purple-500/40 bg-purple-950/20 text-purple-400",
      glow: "hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
      perks: [
        "All KING perks included",
        "Access to /condense & /trash",
        "Instant Heart Restore 1x per week",
        "3x Private Player Vaults (/pv 1-3)",
        "Exclusive Purple Weapon Particles",
        "Custom Nickname in /nick",
      ],
      kits: "Kit Hero (Every 18h)",
      vaults: 3,
      multiplier: "2.0x Coins",
    },
    {
      id: "legend",
      name: "LEGEND",
      badge: "ELITE WARRIOR",
      emoji: "nether_star",
      priceBDT: 2500,
      priceUSD: 24.99,
      color: "border-rose-500/50 bg-rose-950/20 text-rose-400",
      glow: "hover:border-rose-400 hover:shadow-[0_0_35px_rgba(244,63,94,0.4)]",
      perks: [
        "All HERO perks included",
        "Access to /repair all command",
        "5x Private Player Vaults (/pv 1-5)",
        "Exclusive Flame Aura Cape in-game",
        "Summon Blood Shard Boss Beacon",
        "Permanent 10% Shop Discount",
      ],
      kits: "Kit Legend (Every 12h)",
      vaults: 5,
      multiplier: "2.5x Coins & Shards",
    },
    {
      id: "brutal",
      name: "BRUTAL",
      badge: "SUPREME APEX",
      emoji: "netherite_sword",
      priceBDT: 4500,
      priceUSD: 44.99,
      featured: true,
      color: "border-red-500 bg-red-950/40 text-white",
      glow: "border-red-500 shadow-[0_0_40px_rgba(255,0,51,0.5)]",
      perks: [
        "ALL SERVER PERKS UNLOCKED",
        "/fly in ALL Survival SMP worlds",
        "Keep 100% Items & XP upon Death",
        "Instant Heart Restore 3x per week",
        "Unlimited Private Vaults (/pv 1-10)",
        "Unique Rainbow Chat & Glowing Nick",
        "Spawn Custom Boss Dragon Event",
        "Direct Discord Voice with Founders",
      ],
      kits: "Kit Brutal (Every 8h)",
      vaults: 10,
      multiplier: "3.5x Coins & Shards",
    },
  ];

  return (
    <section id="ranks" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07070a] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-radial from-red-600/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-minecraft tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5" />
            SERVER STORE & RANKS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-minecraft font-bold uppercase tracking-tight text-white mc-shadow">
            UNLEASH YOUR <span className="text-red-500">POWER.</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg">
            Support the server and unlock exclusive perks, custom kill effects,
            and permanent quality of life enhancements.
          </p>

          {/* Currency Switcher */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 mt-4">
            <button
              onClick={() => {
                sound.playClick();
                setCurrency("BDT");
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                currency === "BDT"
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ৳ BDT (bKash/Nagad)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setCurrency("USD");
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                currency === "USD"
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              $ USD (Card/Crypto)
            </button>
          </div>

          {/* Dedicated Payment Page Banner */}
          <div className="pt-2">
            <Link
              href="/store"
              onClick={() => sound.playPower()}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-950/60 via-zinc-900 to-amber-950/40 border border-amber-500/30 hover:border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.15)] group transition-all"
            >
              <div className="flex items-center -space-x-1.5">
                <BkashIcon className="w-6 h-6 rounded-lg ring-1 ring-black" />
                <NagadIcon className="w-6 h-6 rounded-lg ring-1 ring-black" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-amber-300 group-hover:text-amber-200 flex items-center gap-1">
                  Dedicated Payment & VIP Store
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="block text-[10px] font-mono text-zinc-400">
                  bKash • Nagad • Activated by staff via Discord
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Rank Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 items-stretch">
          {ranks.map((rank) => (
            <div
              key={rank.id}
              onMouseEnter={() => sound.playHover()}
              className={`relative rounded-3xl p-[1px] transition-all duration-300 flex flex-col justify-between ${
                rank.featured
                  ? "bg-gradient-to-b from-red-500 via-rose-600 to-red-950 shadow-[0_0_40px_rgba(255,0,51,0.4)] xl:-translate-y-4"
                  : "bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-700"
              }`}
            >
              {/* Featured Apex Tag */}
              {rank.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-mono font-black uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,51,0.8)] animate-pulse flex items-center gap-1.5">
                  <MinecraftEmoji name="nether_star" size={12} />
                  <span>ULTIMATE APEX</span>
                </div>
              )}

              <div className="h-full w-full rounded-3xl bg-[#09090f] p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {rank.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {rank.multiplier}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <MinecraftEmoji
                      name={rank.emoji}
                      size={22}
                      glow={rank.featured ? "red" : rank.id === "legend" ? "gold" : "none"}
                    />
                    <h3
                      className={`text-lg font-minecraft font-bold uppercase tracking-wide mc-shadow ${
                        rank.featured ? "text-red-400" : "text-white"
                      }`}
                    >
                      {rank.name}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="mt-4 mb-6">
                    <div className="text-3xl font-black text-white font-mono flex items-baseline gap-1">
                      {currency === "BDT" ? (
                        <>
                          <span className="text-red-500 text-xl font-bold">৳</span>
                          <span>{rank.priceBDT.toLocaleString()}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-red-500 text-xl font-bold">$</span>
                          <span>{rank.priceUSD.toFixed(2)}</span>
                        </>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      One-time lifetime access
                    </span>
                  </div>

                  {/* Perks Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-zinc-800 text-xs">
                    {rank.perks.map((perk) => (
                      <div key={perk} className="flex items-start gap-2 text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purchase Action Button */}
                <div className="mt-8 pt-4 border-t border-zinc-900">
                  <button
                    onClick={() => {
                      sound.playPower();
                      setSelectedRank(rank);
                    }}
                    className={`w-full py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                      rank.featured
                        ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(255,0,51,0.5)]"
                        : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    <span>SELECT RANK</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank Checkout Preview Modal */}
      {selectedRank && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0d0d14] border border-red-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,0,51,0.4)]">
            <button
              onClick={() => setSelectedRank(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  BRUTALMC VIP STORE
                </span>
                <h3 className="text-2xl font-black text-white uppercase font-sans">
                  {selectedRank.name}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400">LIFETIME ACCESS:</span>
                <div className="text-2xl font-black text-red-400 font-mono">
                  {currency === "BDT"
                    ? `৳ ${selectedRank.priceBDT.toLocaleString()} BDT`
                    : `$ ${selectedRank.priceUSD.toFixed(2)} USD`}
                </div>
              </div>
              <div className="text-right text-xs font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Instant Activation
              </div>
            </div>

            {/* Payment Methods Info */}
            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                SUPPORTED PAYMENT METHODS:
              </span>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono font-bold">
                <div className="p-2.5 rounded-xl bg-pink-950/30 border border-pink-700/40 text-pink-300 flex items-center justify-center gap-2">
                  <BkashIcon className="w-6 h-6 rounded-lg shrink-0" />
                  <span>bKash</span>
                </div>
                <div className="p-2.5 rounded-xl bg-orange-950/30 border border-orange-700/40 text-orange-300 flex items-center justify-center gap-2">
                  <NagadIcon className="w-6 h-6 rounded-lg shrink-0" />
                  <span>Nagad</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-xs text-zinc-400 space-y-1 mb-6">
              <p>• Automatic rank delivery upon payment verification.</p>
              <p>• Connect directly to <code className="text-white font-mono font-bold">play.brutalmc.xyz</code> (Bedrock Port: 19132).</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/store?package=${selectedRank.id.toLowerCase()}`}
                onClick={() => {
                  sound.playPower();
                  setSelectedRank(null);
                }}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider text-center shadow-[0_0_25px_rgba(255,0,51,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>GO TO SECURE STORE CHECKOUT</span>
              </Link>
              <button
                onClick={() => setSelectedRank(null)}
                className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-bold uppercase hover:text-white"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
