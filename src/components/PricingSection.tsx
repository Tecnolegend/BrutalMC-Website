"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import MinecraftEmoji from "@/components/MinecraftEmoji";
import { BkashIcon, NagadIcon } from "@/components/PaymentIcons";
import {
  Check,
  X as Cross,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

interface PricingTier {
  id: string;
  name: string;
  badge: string;
  emoji: "iron_sword" | "gold_ingot" | "diamond_sword" | "nether_star" | "netherite_sword";
  priceBDT: number;
  priceUSD: number;
  featured?: boolean;
  colorBorder: string;
  badgeBg: string;
  highlightText: string;
  summary: string;
  perks: string[];
}

interface FeatureRow {
  category: string;
  feature: string;
  description?: string;
  elite: string | boolean;
  king: string | boolean;
  hero: string | boolean;
  legend: string | boolean;
  brutal: string | boolean;
}

export default function PricingSection() {
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [showComparison, setShowComparison] = useState(true);

  const tiers: PricingTier[] = [
    {
      id: "elite",
      name: "ELITE",
      badge: "ENTRY TIER",
      emoji: "iron_sword",
      priceBDT: 350,
      priceUSD: 4.99,
      colorBorder: "border-zinc-700 bg-zinc-900/40",
      badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
      highlightText: "text-zinc-300",
      summary: "Essential starter perks, hub flight, and safe storage vault.",
      perks: [
        "/fly in Lobby & Hubs",
        "1x Private Vault (/pv 1)",
        "Keep 50% XP upon Death",
        "[ELITE] Chat Tag",
        "Kit Elite (Every 24h)",
        "1.2x Coin Multiplier",
      ],
    },
    {
      id: "king",
      name: "KING",
      badge: "POPULAR",
      emoji: "gold_ingot",
      priceBDT: 750,
      priceUSD: 8.99,
      colorBorder: "border-amber-500/40 bg-amber-950/20",
      badgeBg: "bg-amber-950/60 text-amber-400 border-amber-500/40",
      highlightText: "text-amber-400",
      summary: "Full XP protection, feed commands, and 2x player vaults.",
      perks: [
        "All ELITE perks included",
        "Keep 100% XP on Death (KeepXP)",
        "2x Private Vaults (/pv 1-2)",
        "Access to /feed command",
        "Kit King (Every 24h)",
        "1.5x Coin Multiplier",
      ],
    },
    {
      id: "hero",
      name: "HERO",
      badge: "WARRIOR",
      emoji: "diamond_sword",
      priceBDT: 1400,
      priceUSD: 14.99,
      colorBorder: "border-purple-500/40 bg-purple-950/20",
      badgeBg: "bg-purple-950/60 text-purple-400 border-purple-500/40",
      highlightText: "text-purple-400",
      summary: "Weapon particles, nickname color, and inventory condensing.",
      perks: [
        "All KING perks included",
        "3x Private Vaults (/pv 1-3)",
        "Access to /condense & /trash",
        "Purple Weapon Particles",
        "Custom Nickname (/nick)",
        "2.0x Coin Multiplier",
      ],
    },
    {
      id: "legend",
      name: "LEGEND",
      badge: "ELITE WARRIOR",
      emoji: "nether_star",
      priceBDT: 2500,
      priceUSD: 24.99,
      colorBorder: "border-rose-500/50 bg-rose-950/20",
      badgeBg: "bg-rose-950/60 text-rose-400 border-rose-500/40",
      highlightText: "text-rose-400",
      summary: "Flame aura cape, repair all commands, and boss beacons.",
      perks: [
        "All HERO perks included",
        "5x Private Vaults (/pv 1-5)",
        "Access to /repair all command",
        "Exclusive Flame Aura Cape",
        "Summon Blood Shard Beacon",
        "2.5x Coins & Shards",
      ],
    },
    {
      id: "brutal",
      name: "BRUTAL",
      badge: "ULTIMATE APEX",
      emoji: "netherite_sword",
      priceBDT: 4500,
      priceUSD: 44.99,
      featured: true,
      colorBorder: "border-red-500 bg-red-950/40 shadow-[0_0_40px_rgba(255,0,51,0.5)]",
      badgeBg: "bg-red-600 text-white border-red-400",
      highlightText: "text-red-400",
      summary: "Supreme rank with survival /fly, keep inventory, and 10x vaults.",
      perks: [
        "/fly in ALL Survival SMP worlds",
        "Keep 100% Items & XP on Death",
        "10x Private Vaults (/pv 1-10)",
        "Animated Rainbow Chat Tag",
        "Kit Brutal + All Lower Kits",
        "3.5x Coins & Shards Multiplier",
      ],
    },
  ];

  const comparisonRows: FeatureRow[] = [
    // Permissions & Survival Mechanics
    {
      category: "SURVIVAL PERMISSIONS",
      feature: "/fly in Lobby & Hubs",
      elite: true,
      king: true,
      hero: true,
      legend: true,
      brutal: true,
    },
    {
      category: "SURVIVAL PERMISSIONS",
      feature: "/fly in Survival SMP Worlds",
      description: "Flight unrestricted across all custom survival biomes",
      elite: false,
      king: false,
      hero: false,
      legend: false,
      brutal: true,
    },
    {
      category: "SURVIVAL PERMISSIONS",
      feature: "KeepXP on Death",
      description: "Retain experience levels when dying in combat or hazards",
      elite: "50% XP",
      king: "100% XP",
      hero: "100% XP",
      legend: "100% XP",
      brutal: "100% XP",
    },
    {
      category: "SURVIVAL PERMISSIONS",
      feature: "KeepInventory on Death",
      description: "Retain all armor and hotbar gear upon death",
      elite: false,
      king: false,
      hero: false,
      legend: false,
      brutal: true,
    },

    // Storage & Vaults
    {
      category: "STORAGE & ECONOMY",
      feature: "Private Player Vaults (/pv)",
      elite: "1 Vault",
      king: "2 Vaults",
      hero: "3 Vaults",
      legend: "5 Vaults",
      brutal: "10 Vaults",
    },
    {
      category: "STORAGE & ECONOMY",
      feature: "Coin & Economy Multiplier",
      elite: "1.2x",
      king: "1.5x",
      hero: "2.0x",
      legend: "2.5x",
      brutal: "3.5x",
    },
    {
      category: "STORAGE & ECONOMY",
      feature: "Blood Shard Drop Multiplier",
      elite: "1.0x",
      king: "1.2x",
      hero: "1.5x",
      legend: "2.0x",
      brutal: "3.5x",
    },

    // In-Game Commands
    {
      category: "QUALITY OF LIFE COMMANDS",
      feature: "/workbench & /craft anywhere",
      elite: true,
      king: true,
      hero: true,
      legend: true,
      brutal: true,
    },
    {
      category: "QUALITY OF LIFE COMMANDS",
      feature: "/feed saturation command",
      elite: false,
      king: "Every 15m",
      hero: "Every 10m",
      legend: "Every 5m",
      brutal: "Instant /feed",
    },
    {
      category: "QUALITY OF LIFE COMMANDS",
      feature: "/condense & /trash commands",
      elite: false,
      king: false,
      hero: true,
      legend: true,
      brutal: true,
    },
    {
      category: "QUALITY OF LIFE COMMANDS",
      feature: "/repair all gear command",
      elite: false,
      king: false,
      hero: false,
      legend: true,
      brutal: true,
    },
    {
      category: "QUALITY OF LIFE COMMANDS",
      feature: "Custom Nickname (/nick)",
      elite: false,
      king: false,
      hero: true,
      legend: true,
      brutal: true,
    },

    // Cosmetics & Priority
    {
      category: "COSMETICS & SOCIAL",
      feature: "Chat Tag & Formatting",
      elite: "[ELITE]",
      king: "[KING]",
      hero: "[HERO] + Particles",
      legend: "[LEGEND] + Flame Cape",
      brutal: "[BRUTAL] + Rainbow Aura",
    },
    {
      category: "COSMETICS & SOCIAL",
      feature: "VIP Express Queue Priority",
      elite: false,
      king: true,
      hero: true,
      legend: true,
      brutal: "Top Priority",
    },
    {
      category: "COSMETICS & SOCIAL",
      feature: "Discord VIP Role & Voice Channels",
      elite: true,
      king: true,
      hero: true,
      legend: true,
      brutal: "Founder Voice Access",
    },
  ];

  const renderCell = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400">
          <Check className="w-3.5 h-3.5" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-600">
          <Cross className="w-3.5 h-3.5" />
        </span>
      );
    }
    return (
      <span className="font-minecraft text-xs font-bold text-zinc-200">
        {val}
      </span>
    );
  };

  return (
    <section id="pricing" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-radial from-red-600/15 via-amber-600/5 to-transparent blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff0033_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-minecraft tracking-widest uppercase">
            <MinecraftEmoji name="gold_ingot" size={16} glow="gold" />
            <span>SERVER RANKS & LIFETIME PRICING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-minecraft font-bold uppercase tracking-tight text-white mc-shadow">
            CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">POWER TIER</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            All ranks are permanent lifetime purchases with zero monthly fees. Pay with bKash or Nagad and staff activate your rank after checking your payment.
          </p>

          {/* Currency Switcher Toggle */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-md">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrency("BDT");
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-minecraft font-bold transition-all ${
                  currency === "BDT"
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.5)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                ৳ BDT (bKash / Nagad)
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setCurrency("USD");
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-minecraft font-bold transition-all ${
                  currency === "USD"
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.5)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                $ USD (Card / Global)
              </button>
            </div>

            {/* Toggle Comparison Button */}
            <button
              onClick={() => {
                sound.playClick();
                setShowComparison(!showComparison);
              }}
              className="text-xs font-minecraft text-red-400 hover:text-red-300 font-bold transition-colors underline underline-offset-4"
            >
              {showComparison ? "Hide Detailed Comparison" : "View Detailed Comparison Matrix"}
            </button>
          </div>
        </div>

        {/* 5 RANK CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 items-stretch mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              onMouseEnter={() => sound.playHover()}
              className={`relative rounded-3xl p-[1px] transition-all duration-300 flex flex-col justify-between ${
                tier.featured
                  ? "bg-gradient-to-b from-red-500 via-rose-600 to-red-950 shadow-[0_0_40px_rgba(255,0,51,0.45)] xl:-translate-y-4"
                  : "bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-700"
              }`}
            >
              {/* Featured Apex Badge */}
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-minecraft font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,51,0.8)] mc-shadow animate-pulse flex items-center gap-1.5">
                  <MinecraftEmoji name="nether_star" size={12} />
                  <span>SUPREME APEX</span>
                </div>
              )}

              <div className="h-full w-full rounded-3xl bg-[#090910] p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[9px] font-minecraft font-bold uppercase px-2 py-0.5 rounded border ${tier.badgeBg}`}>
                      {tier.badge}
                    </span>
                    <MinecraftEmoji name={tier.emoji} size={22} glow={tier.featured ? "red" : "none"} />
                  </div>

                  <h3 className={`text-xl font-minecraft font-bold uppercase tracking-wide mc-shadow mb-1 ${tier.highlightText}`}>
                    {tier.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 min-h-[36px]">
                    {tier.summary}
                  </p>

                  {/* Price */}
                  <div className="mb-6 p-3 rounded-2xl bg-black/50 border border-zinc-800/80">
                    <div className="text-2xl sm:text-3xl font-minecraft font-bold text-white flex items-baseline gap-1 mc-shadow">
                      {currency === "BDT" ? (
                        <>
                          <span className="text-red-500 text-lg">৳</span>
                          <span>{tier.priceBDT.toLocaleString()}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-red-500 text-lg">$</span>
                          <span>{tier.priceUSD.toFixed(2)}</span>
                        </>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
                      Lifetime • Instant Delivery
                    </span>
                  </div>

                  {/* Perks Checklist */}
                  <ul className="space-y-2 text-xs mb-6">
                    {tier.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Button */}
                <div>
                  <Link
                    href={`/store?package=${tier.id}`}
                    onClick={() => sound.playPower()}
                    className={`w-full py-2.5 px-4 rounded-xl font-minecraft text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                      tier.featured
                        ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(255,0,51,0.6)] mc-shadow"
                        : "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-500/50 text-white"
                    }`}
                  >
                    <span>BUY {tier.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DETAILED COMPARISON TABLE */}
        {showComparison && (
          <div className="space-y-6 pt-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-minecraft font-bold text-white uppercase mc-shadow">
                  RANK BENEFIT <span className="text-red-500">COMPARISON MATRIX</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Direct side-by-side breakdown of all permissions, multipliers, vaults, and commands.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/store"
                  onClick={() => sound.playClick()}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-minecraft text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>OPEN STORE</span>
                </Link>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#090910]/95 backdrop-blur-xl shadow-xl">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-xs font-minecraft uppercase">
                    <th className="py-4 px-5 text-zinc-300 w-2/5">Feature / Command</th>
                    <th className="py-4 px-3 text-center text-zinc-400">Elite</th>
                    <th className="py-4 px-3 text-center text-amber-400">King</th>
                    <th className="py-4 px-3 text-center text-purple-400">Hero</th>
                    <th className="py-4 px-3 text-center text-rose-400">Legend</th>
                    <th className="py-4 px-3 text-center text-red-400 bg-red-950/20 border-l border-r border-red-500/20">
                      Brutal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-xs font-mono">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 px-5">
                        <div className="font-semibold text-zinc-200">{row.feature}</div>
                        {row.description && (
                          <div className="text-[10px] text-zinc-500 font-sans mt-0.5">
                            {row.description}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">{renderCell(row.elite)}</td>
                      <td className="py-3 px-3 text-center">{renderCell(row.king)}</td>
                      <td className="py-3 px-3 text-center">{renderCell(row.hero)}</td>
                      <td className="py-3 px-3 text-center">{renderCell(row.legend)}</td>
                      <td className="py-3 px-3 text-center bg-red-950/10 border-l border-r border-red-500/20 font-bold">
                        {renderCell(row.brutal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENT METHODS & INSTANT DELIVERY CALLOUT */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900/80 to-amber-950/30 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center -space-x-2">
              <BkashIcon className="w-9 h-9 rounded-xl shadow-md ring-2 ring-black" />
              <NagadIcon className="w-9 h-9 rounded-xl shadow-md ring-2 ring-black" />
            </div>
            <div>
              <h4 className="font-minecraft text-sm sm:text-base font-bold text-white uppercase mc-shadow">
                SIMPLE BKASH & NAGAD CHECKOUT
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Send money with bKash or Nagad, then share your TrxID in a Discord ticket for activation.
              </p>
            </div>
          </div>

          <Link
            href="/store"
            onClick={() => sound.playPower()}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-minecraft text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2 mc-shadow shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>GO TO OFFICIAL STORE</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
