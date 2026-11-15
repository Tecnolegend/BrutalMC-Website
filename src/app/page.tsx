"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import HeroBackground from "@/components/HeroBackground";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import PlayModal from "@/components/PlayModal";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";

import MinecraftItem, { MinecraftItemName } from "@/components/MinecraftItem";
import { SERVER_IP } from "@/lib/site";

interface PortalCard {
  title: string;
  badge: string;
  badgeColor: string;
  accentBorder: string;
  accentGlow: string;
  iconBg: string;
  iconColor: string;
  item: MinecraftItemName;
  glow: "purple" | "gold" | "red" | "cyan" | "emerald";
  description: string;
  stat: string;
  href: string;
}

const PORTALS: PortalCard[] = [
  {
    title: "Dragon Bestiary & Shenron 3D",
    badge: "NEW BOSS SYSTEM",
    badgeColor: "bg-sky-500/15 border-sky-500/30 text-sky-400",
    accentBorder: "group-hover:border-sky-500/50",
    accentGlow: "group-hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]",
    iconBg: "bg-sky-950/40 border-sky-500/30 text-sky-400",
    iconColor: "text-sky-400",
    item: "ender_eye",
    glow: "purple",
    description:
      "Confront 4 elemental dragons with 16 signature abilities, summon mechanics, and craftable dragon armors.",
    stat: "4 Dragons • 16 Custom Spells",
    href: "/dragons",
  },
  {
    title: "Survival SMP & Custom World",
    badge: "FLAGSHIP MODE",
    badgeColor: "bg-red-500/15 border-red-500/30 text-red-400",
    accentBorder: "group-hover:border-red-500/50",
    accentGlow: "group-hover:shadow-[0_0_35px_rgba(255,0,51,0.25)]",
    iconBg: "bg-red-950/40 border-red-500/30 text-red-400",
    iconColor: "text-red-400",
    item: "netherite_sword",
    glow: "red",
    description:
      "Explore handcrafted custom biomes, earn blood shards, forge clan alliances, and enjoy low-latency BDIX connectivity.",
    stat: "100% Custom Biomes • Sub-15ms BDIX",
    href: "/survival",
  },
  {
    title: "Gladiator Leaderboards",
    badge: "HALL OF FAME",
    badgeColor: "bg-amber-500/15 border-amber-500/30 text-amber-400",
    accentBorder: "group-hover:border-amber-500/50",
    accentGlow: "group-hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
    iconBg: "bg-amber-950/40 border-amber-500/30 text-amber-400",
    iconColor: "text-amber-400",
    item: "nether_star",
    glow: "gold",
    description:
      "Real-time kill leaderboards, K/D ratios, coin balances, and top competitive players across Bangladesh.",
    stat: "Top 100 Players • Live KD Tracking",
    href: "/leaderboards",
  },
  {
    title: "Server Ranks & VIP Perks",
    badge: "VIP PRIVILEGES",
    badgeColor: "bg-yellow-500/15 border-yellow-500/30 text-yellow-400",
    accentBorder: "group-hover:border-yellow-500/50",
    accentGlow: "group-hover:shadow-[0_0_35px_rgba(234,179,8,0.25)]",
    iconBg: "bg-yellow-950/40 border-yellow-500/30 text-yellow-400",
    iconColor: "text-yellow-400",
    item: "netherite_helmet",
    glow: "gold",
    description:
      "Elevate your experience with Elite, King, Hero, Legend & Overlord tiers. Unlocks /fly, private vaults & daily kits.",
    stat: "5 VIP Tiers • Exclusive Kits",
    href: "/ranks",
  },
  {
    title: "Official Server Store",
    badge: "BKASH / NAGAD",
    badgeColor: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    accentBorder: "group-hover:border-emerald-500/50",
    accentGlow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
    iconBg: "bg-emerald-950/40 border-emerald-500/30 text-emerald-400",
    iconColor: "text-emerald-400",
    item: "golden_apple",
    glow: "gold",
    description:
      "Buy ranks, crate keys and bundles with bKash or Nagad. Staff activate your purchase after checking your payment.",
    stat: "bKash • Nagad • Staff Verified",
    href: "/store",
  },
  {
    title: "Esports Tournaments",
    badge: "CASH PRIZES",
    badgeColor: "bg-purple-500/15 border-purple-500/30 text-purple-400",
    accentBorder: "group-hover:border-purple-500/50",
    accentGlow: "group-hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
    iconBg: "bg-purple-950/40 border-purple-500/30 text-purple-400",
    iconColor: "text-purple-400",
    item: "dragon_breath",
    glow: "purple",
    description:
      "Participate in weekly mega-build battles, survival tournaments, and PvP clash events with ৳10,000+ prize pools.",
    stat: "৳10,000 BDT Prize Pool • Weekly Events",
    href: "/events",
  },
  {
    title: "Discord Guild & Community",
    badge: "3,400+ MEMBERS",
    badgeColor: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
    accentBorder: "group-hover:border-indigo-500/50",
    accentGlow: "group-hover:shadow-[0_0_35px_rgba(99,102,241,0.25)]",
    iconBg: "bg-indigo-950/40 border-indigo-500/30 text-indigo-400",
    iconColor: "text-indigo-400",
    item: "totem_of_undying",
    glow: "emerald",
    description:
      "Join active voice squads, trade items, participate in nitro giveaways, and receive 24/7 staff ticket support.",
    stat: "Active Voice Channels • 24/7 Support",
    href: "/community",
  },
  {
    title: "FAQ & Player Setup Guides",
    badge: "HELP & CONNECTIVITY",
    badgeColor: "bg-rose-500/15 border-rose-500/30 text-rose-400",
    accentBorder: "group-hover:border-rose-500/50",
    accentGlow: "group-hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]",
    iconBg: "bg-rose-950/40 border-rose-500/30 text-rose-400",
    iconColor: "text-rose-400",
    item: "enchanted_book",
    glow: "purple",
    description:
      "Detailed guides for BDIX domestic routing, PojavLauncher/Bedrock mobile cross-play, rules, and anticheat.",
    stat: "Bedrock & Java Support • BDIX Low Ping",
    href: "/faq",
  },
];

export default function Home() {
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const serverIP = SERVER_IP;

  const handleOpenPlay = () => {
    setIsPlayModalOpen(true);
  };

  const handleClosePlay = () => {
    setIsPlayModalOpen(false);
  };

  const handleCopyIP = () => {
    sound.playSuccess();
    navigator.clipboard?.writeText(serverIP).catch(() => {});
    setCopied(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#ff0033", "#e11d48", "#ffffff", "#f59e0b"],
      });
    } catch {}

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="relative min-h-screen bg-[#050508] text-white selection:bg-red-600/30 selection:text-white overflow-x-hidden">
      {/* Background Ambience & Rising Ember Particles */}
      <HeroBackground />

      {/* Global Esports Navigation Bar */}
      <Navbar onPlayClick={handleOpenPlay} />

      {/* Main Content Sections */}
      <div className="relative z-10 flex flex-col">
        {/* Hero Section with 3D TecnoLegend & Live Server Status */}
        <Hero onPlayClick={handleOpenPlay} />

        {/* Next-Gen Architecture & Features */}
        <Features />

        {/* Dedicated Portals & Realms Navigation Hub */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-minecraft text-red-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPLORE DEDICATED REALMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-minecraft font-bold tracking-tight uppercase mc-shadow">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Destination</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Every system on BrutalMC is engineered into high-performance dedicated portals. Select a realm below to explore boss mechanics, custom progression, leaderboards, and store items.
            </p>
          </div>

          {/* Portals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTALS.map((portal) => {
              return (
                <Link
                  key={portal.href}
                  href={portal.href}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className={`group relative rounded-2xl p-[1px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:from-zinc-700 transition-all duration-300 flex flex-col justify-between overflow-hidden transform-gpu will-change-transform ${portal.accentGlow}`}
                >
                  <div className="relative h-full w-full rounded-2xl bg-[#08080d]/95 backdrop-blur-xl p-6 flex flex-col justify-between border border-zinc-800/80 group-hover:border-zinc-700 transition-colors">
                    {/* Header: Icon & Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${portal.iconBg}`}>
                          <MinecraftItem name={portal.item} size={28} glow={portal.glow} />
                        </div>
                        <span className={`text-[9px] font-minecraft font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${portal.badgeColor}`}>
                          {portal.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                        {portal.title}
                      </h3>

                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                        {portal.description}
                      </p>
                    </div>

                    {/* Bottom Stat & Action */}
                    <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400 text-[11px] truncate max-w-[170px]">
                        {portal.stat}
                      </span>
                      <div className="flex items-center gap-1 text-red-400 group-hover:text-red-300 font-bold transition-all group-hover:translate-x-0.5">
                        <span>OPEN</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Server Rank Pricing & Feature Comparison Matrix */}
        <PricingSection />

        {/* Global Quick Action & Community Callout */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-red-600/40 via-zinc-800 to-amber-600/40 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="relative rounded-3xl bg-[#090912] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-xs font-mono text-red-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>BANGLADESH DOMESTIC FIBER • BDIX PEERED</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-minecraft font-bold uppercase tracking-tight mc-shadow">
                  Ready to Enter the Arena?
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Join hundreds of daily players. Connect with Java Edition, Bedrock, or PojavLauncher. No cracked license restrictions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={handleCopyIP}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-500/50 text-white font-minecraft text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg group mc-shadow"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">IP COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                      <span>{serverIP}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    sound.playPower();
                    handleOpenPlay();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-minecraft font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,51,0.5)] transition-all flex items-center justify-center gap-2 mc-shadow"
                >
                  <MinecraftItem name="netherite_sword" size={18} glow="red" />
                  <span>PLAY NOW</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </div>

      {/* Interactive Join / How to Connect Modal */}
      <PlayModal isOpen={isPlayModalOpen} onClose={handleClosePlay} />
    </main>
  );
}
