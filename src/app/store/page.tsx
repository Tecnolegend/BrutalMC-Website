"use client";

import React, { useState, useEffect } from "react";
import { BKASH_NUMBER, NAGAD_NUMBER, DISCORD_URL, SERVER_IP } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  BkashIcon,
  NagadIcon,
} from "@/components/PaymentIcons";
import {
  ShieldCheck,
  Crown,
  Check,
  Copy,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  Clock,
  Zap,
} from "lucide-react";

interface PackageItem {
  id: string;
  name: string;
  badge: string;
  category: "rank" | "bundle";
  priceBDT: number;
  priceUSD: number;
  featured?: boolean;
  color: string;
  perks: string[];
}

interface OrderSummary {
  orderId: string;
  ign: string;
  edition: "java" | "bedrock";
  pkg: PackageItem;
  paymentMethod: "bkash" | "nagad";
  trxId: string;
  date: string;
}

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<"rank" | "bundle">("rank");
  const [selectedPackageId, setSelectedPackageId] = useState<string>("hero");
  const [minecraftUsername, setMinecraftUsername] = useState<string>("");
  const [edition, setEdition] = useState<"java" | "bedrock">("java");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad">("bkash");
  const [trxId, setTrxId] = useState<string>("");
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);


  // Order submission state
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<OrderSummary | null>(null);
  const [orderCopied, setOrderCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const packages: PackageItem[] = [
    {
      id: "elite",
      name: "ELITE RANK",
      badge: "ENTRY TIER",
      category: "rank",
      priceBDT: 350,
      priceUSD: 4.99,
      color: "border-zinc-700 bg-zinc-900/50 text-zinc-300",
      perks: [
        "/fly in Lobby & Hubs",
        "Exclusive [ELITE] Bronze Chat Tag",
        "Access to /workbench & /craft",
        "Keep 50% XP upon PvP death",
        "1x Private Player Vault (/pv 1)",
        "Discord VIP Role & Channel access",
      ],
    },
    {
      id: "king",
      name: "KING RANK",
      badge: "POPULAR",
      category: "rank",
      priceBDT: 750,
      priceUSD: 8.99,
      color: "border-amber-500/50 bg-amber-950/30 text-amber-400",
      perks: [
        "All ELITE perks included",
        "Keep 100% XP on Death (KeepXP)",
        "Access to /feed every 10 minutes",
        "Custom Death Messages broadcast",
        "2x Private Player Vaults (/pv 1-2)",
        "Priority Server Queue bypass",
      ],
    },
    {
      id: "hero",
      name: "HERO RANK",
      badge: "WARRIOR",
      category: "rank",
      priceBDT: 1400,
      priceUSD: 14.99,
      color: "border-purple-500/50 bg-purple-950/30 text-purple-400",
      perks: [
        "All KING perks included",
        "Keep 100% XP on Death (KeepXP)",
        "Access to /feed every 15 minutes",
        "3x Private Player Vaults (/pv 1-3)",
        "Exclusive Purple Weapon Particles",
        "Custom Nickname via /nick",
      ],
    },
    {
      id: "legend",
      name: "LEGEND RANK",
      badge: "ELITE WARRIOR",
      category: "rank",
      priceBDT: 2500,
      priceUSD: 24.99,
      color: "border-rose-500/50 bg-rose-950/30 text-rose-400",
      perks: [
        "All HERO perks included",
        "Access to /repair all command",
        "5x Private Player Vaults (/pv 1-5)",
        "Exclusive Flame Aura Cape in-game",
        "Summon Blood Shard Boss Beacon",
        "Permanent 10% Shop Discount",
      ],
    },
    {
      id: "brutal",
      name: "BRUTAL OVERLORD RANK",
      badge: "ULTIMATE TIER",
      category: "rank",
      priceBDT: 4500,
      priceUSD: 39.99,
      featured: true,
      color: "border-red-500/50 bg-red-950/30 text-red-400",
      perks: [
        "EVERY PERK & KIT UNLOCKED",
        "Permanent [BRUTAL] Radiant Red Chat Tag",
        "Keep Inventory across all dimensions",
        "10x Private Player Vaults (/pv 1-10)",
        "Red Lightning Strike Kill Effect",
        "Exclusive Dragon Wings Cosmetic",
        "Founder VIP Discord Private Lounge",
      ],
    },
    {
      id: "crate-5x",
      name: "5x MYTHIC CRATE KEYS",
      badge: "VALUE BUNDLE",
      category: "bundle",
      priceBDT: 250,
      priceUSD: 2.99,
      color: "border-cyan-500/40 bg-cyan-950/20 text-cyan-300",
      perks: [
        "5x Mythic Crates opened at Spawn Altar",
        "High chance of Tier IV Socket Gems",
        "Ancient Netherite Shards drop",
        "Cosmetic Wings and Trails",
      ],
    },
    {
      id: "dragon-bundle",
      name: "CUSTOM DRAGON SLAYER PACK",
      badge: "EXCLUSIVE",
      category: "bundle",
      priceBDT: 1200,
      priceUSD: 12.99,
      featured: true,
      color: "border-rose-500/50 bg-rose-950/30 text-rose-300",
      perks: [
        "Exclusive Animated Dragon Wings Particle",
        "2,500 Blood Shards currency",
        "3x Dragon Altar Summoning Crystals",
        "1x Mythic Elytra with Custom Trails",
        "Exclusive [SLAYER] Chat Prefix",
      ],
    },
  ];

  // Auto-detect package from URL query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pkg = params.get("package") || params.get("rank") || params.get("pkg");
      if (pkg) {
        const queryNormalized = pkg.toLowerCase();
        const found = packages.find(
          (p) =>
            p.id.toLowerCase() === queryNormalized ||
            (queryNormalized === "scout" && p.id === "elite") ||
            (queryNormalized === "titan" && p.id === "hero") ||
            (queryNormalized === "champion" && p.id === "hero") ||
            (queryNormalized === "overlord" && p.id === "brutal")
        );
        if (found) {
          // Deferred so the page renders first, then jumps to the linked package
          setTimeout(() => {
            setSelectedPackageId(found.id);
            setSelectedCategory(found.category);
          }, 0);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedPackage =
    packages.find((p) => p.id === selectedPackageId) ?? packages[2];

  const bKashNumber = BKASH_NUMBER;
  const nagadNumber = NAGAD_NUMBER;

  const handleCopyNumber = (num: string, label: string) => {
    sound.playSuccess();
    navigator.clipboard?.writeText(num.replace(/\D/g, "")).catch(() => {});
    setCopiedNumber(label);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!minecraftUsername.trim()) {
      setErrorMessage("Please enter your valid Minecraft Username.");
      sound.playClick();
      return;
    }

    if (edition === "java" && !/^[A-Za-z0-9_]{3,16}$/.test(minecraftUsername.trim())) {
      setErrorMessage("Java usernames are 3-16 characters: letters, numbers and _ only.");
      sound.playClick();
      return;
    }

    if (!trxId.trim() || trxId.trim().length < 6) {
      setErrorMessage("Please enter a valid Transaction ID (TrxID) from your SMS or App receipt.");
      sound.playClick();
      return;
    }

    setIsProcessing(true);
    sound.playPower();

    setTimeout(() => {
      setIsProcessing(false);
      sound.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ff0033", "#e2136e", "#f7941d", "#1434cb", "#ffffff"],
        });
      } catch {}

      setOrderComplete({
        orderId: `BMC-${Math.floor(100000 + Math.random() * 900000)}`,
        ign: minecraftUsername.trim(),
        edition,
        pkg: selectedPackage,
        paymentMethod,
        trxId: trxId.trim(),
        date: new Date().toLocaleString(),
      });
      setOrderCopied(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 flex flex-col overflow-x-hidden selection:bg-red-600/30 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-[#070709]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <span className="text-zinc-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-red-500/40 p-1 bg-gradient-to-br from-red-950 to-black">
                <Image
                  src="/images/logo.png"
                  alt="BrutalMC"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white uppercase">
                Brutal<span className="text-red-500">MC</span>{" "}
                <span className="text-xs font-mono font-bold text-red-400 ml-1">
                  STORE
                </span>
              </span>
            </div>
          </div>

          {/* Server IP Pill */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{SERVER_IP}</span>
            </div>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#5865F2]" />
              <span>Support</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Ambient Red Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-radial from-red-600/10 via-transparent to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-radial from-pink-600/10 via-transparent to-transparent blur-3xl pointer-events-none" />

        {/* Hero Banner on Store */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            PAY WITH BKASH OR NAGAD
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-sans">
            BRUTALMC <span className="text-red-500">PAYMENTS.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            Ranks and keys for Bangladeshi players. Pay with{" "}
            <strong className="text-pink-400">bKash</strong> or{" "}
            <strong className="text-orange-400">Nagad</strong>, then send your order to staff on Discord for activation.
          </p>

          {/* Payment Gateway Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900/80 border border-pink-500/30 text-xs font-mono text-zinc-300">
              <BkashIcon className="w-5 h-5" />
              <span>bKash Personal / App</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900/80 border border-orange-500/30 text-xs font-mono text-zinc-300">
              <NagadIcon className="w-5 h-5" />
              <span>Nagad Personal / App</span>
            </div>
          </div>
        </div>

        {/* Store Checkout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Package Catalog (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory("rank");
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === "rank"
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                VIP Server Ranks
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory("bundle");
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === "bundle"
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Crates & Dragon Bundles
              </button>
            </div>

            {/* Package Cards List */}
            <div className="space-y-3">
              {packages
                .filter((p) => p.category === selectedCategory)
                .map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedPackageId(pkg.id);
                      }}
                      className={`relative rounded-2xl p-5 border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-zinc-900/90 border-red-500 shadow-[0_0_25px_rgba(255,0,51,0.25)] ring-1 ring-red-500"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? "bg-red-600/20 border-red-500/60 text-red-400"
                                : "bg-zinc-900 border-zinc-800 text-zinc-400"
                            }`}
                          >
                            <Crown className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-black text-lg text-white font-sans uppercase">
                                {pkg.name}
                              </h3>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${pkg.color}`}
                              >
                                {pkg.badge}
                              </span>
                            </div>
                            <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                              {pkg.perks.slice(0, 3).map((perk) => (
                                <li key={perk} className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  <span>{perk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Price & Selection Indicator */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800/60 shrink-0">
                          <span className="text-xl sm:text-2xl font-black text-white font-mono">
                            ৳ {pkg.priceBDT.toLocaleString()}
                          </span>
                          <span className="text-xs font-mono text-zinc-400">
                            ${pkg.priceUSD} USD
                          </span>
                          <div
                            className={`mt-2 flex items-center gap-1 text-[11px] font-mono font-bold uppercase ${
                              isSelected ? "text-red-400" : "text-zinc-400"
                            }`}
                          >
                            {isSelected ? "Selected ✓" : "Select"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Server Rules & Delivery Guarantee */}
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400 space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>How Delivery Works:</span>
              </div>
              <p>
                After you submit, open a Discord ticket with your order details. Once
                staff confirm your TrxID, your rank or keys are added to your account on{" "}
                <strong className="text-white font-mono">{SERVER_IP}</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: Checkout & Payment Gateway Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-[1px] bg-gradient-to-b from-red-500/40 via-zinc-800 to-zinc-900 shadow-2xl lg:sticky lg:top-24">
              <div className="bg-[#09090f] rounded-3xl p-6 sm:p-7 space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      CHECKOUT SUMMARY
                    </span>
                    <h3 className="text-xl font-black text-white uppercase font-sans">
                      {selectedPackage.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-red-500 font-mono">
                      ৳ {selectedPackage.priceBDT.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 block">
                      (${selectedPackage.priceUSD} USD)
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmitOrder} className="space-y-5">
                  {/* Step A: Minecraft Username */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-zinc-300 uppercase flex items-center justify-between">
                      <span>Minecraft In-Game Name (IGN)</span>
                      <span className="text-[10px] text-red-400 font-normal">Required</span>
                    </label>

                    <div className="flex items-center gap-3">
                      {/* Avatar preview */}
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
                        {minecraftUsername.trim().length >= 3 ? (
                          <img
                            src={`https://mc-heads.net/avatar/${encodeURIComponent(minecraftUsername.trim())}/100`}
                            alt={minecraftUsername}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="text-[10px] font-mono text-zinc-600">IGN</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <input
                          type="text"
                          required
                          value={minecraftUsername}
                          onChange={(e) => setMinecraftUsername(e.target.value)}
                          placeholder="e.g. Tecnolegend or Steve"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-800 focus:border-red-500 text-sm text-white font-mono placeholder:text-zinc-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Platform Selector */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEdition("java")}
                        className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono transition-all ${
                          edition === "java"
                            ? "bg-zinc-800 text-white border border-zinc-700 font-bold"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        Java Edition
                      </button>
                      <button
                        type="button"
                        onClick={() => setEdition("bedrock")}
                        className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono transition-all ${
                          edition === "bedrock"
                            ? "bg-zinc-800 text-white border border-zinc-700 font-bold"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        Bedrock / PE
                      </button>
                    </div>
                  </div>

                  {/* Step B: Select Payment Gateway */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-mono font-bold text-zinc-300 uppercase block">
                      Select Payment Method
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      {/* bKash */}
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setPaymentMethod("bkash");
                        }}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === "bkash"
                            ? "bg-pink-950/40 border-[#E2136E] shadow-[0_0_15px_rgba(226,19,110,0.35)] ring-1 ring-[#E2136E]"
                            : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-400"
                        }`}
                      >
                        <BkashIcon className="w-7 h-7" />
                        <span className="text-[11px] font-mono font-bold text-white">bKash</span>
                      </button>

                      {/* Nagad */}
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setPaymentMethod("nagad");
                        }}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === "nagad"
                            ? "bg-orange-950/40 border-[#F7941D] shadow-[0_0_15px_rgba(247,148,29,0.35)] ring-1 ring-[#F7941D]"
                            : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-400"
                        }`}
                      >
                        <NagadIcon className="w-7 h-7" />
                        <span className="text-[11px] font-mono font-bold text-white">Nagad</span>
                      </button>

                    </div>
                  </div>

                  {/* Step C: Specific Gateway Instructions */}
                  {paymentMethod === "bkash" && (
                    <div className="p-4 rounded-2xl bg-pink-950/20 border border-pink-500/30 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BkashIcon className="w-5 h-5" />
                          <span className="text-xs font-mono font-bold text-pink-300">
                            bKash Personal (Send Money)
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">Dial *247#</span>
                      </div>

                      {/* Number with Copy */}
                      {bKashNumber ? (
                      <div className="p-2.5 rounded-xl bg-black/60 border border-pink-500/30 flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-white tracking-wider">
                          {bKashNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyNumber(bKashNumber, "bkash")}
                          className="flex items-center gap-1 text-[11px] font-mono text-pink-400 hover:text-white px-2 py-1 rounded bg-pink-950/60 border border-pink-500/40 transition-colors"
                        >
                          {copiedNumber === "bkash" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedNumber === "bkash" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-700 text-[11px] text-zinc-300">
                          Open a ticket in our{" "}
                          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">
                            Discord
                          </a>{" "}
                          to get the official bKash number from staff.
                        </div>
                      )}

                      <div className="text-[11px] text-zinc-300 space-y-1">
                        <p>1. Send <strong>৳ {selectedPackage.priceBDT}</strong> to the official bKash number.</p>
                        <p>2. Set Reference as: <strong className="text-white font-mono">{minecraftUsername || "your-IGN"}</strong></p>
                        <p>3. Enter the 8-10 digit Transaction ID (TrxID) below:</p>
                      </div>

                      <input
                        type="text"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                        placeholder="e.g. BL82X9KL9Z"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-pink-500/40 focus:border-pink-400 text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none"
                      />
                    </div>
                  )}

                  {paymentMethod === "nagad" && (
                    <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-500/30 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <NagadIcon className="w-5 h-5" />
                          <span className="text-xs font-mono font-bold text-orange-300">
                            Nagad Personal (Send Money)
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">Dial *167#</span>
                      </div>

                      {/* Number with Copy */}
                      {nagadNumber ? (
                      <div className="p-2.5 rounded-xl bg-black/60 border border-orange-500/30 flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-white tracking-wider">
                          {nagadNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyNumber(nagadNumber, "nagad")}
                          className="flex items-center gap-1 text-[11px] font-mono text-orange-400 hover:text-white px-2 py-1 rounded bg-orange-950/60 border border-orange-500/40 transition-colors"
                        >
                          {copiedNumber === "nagad" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedNumber === "nagad" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-700 text-[11px] text-zinc-300">
                          Open a ticket in our{" "}
                          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">
                            Discord
                          </a>{" "}
                          to get the official Nagad number from staff.
                        </div>
                      )}

                      <div className="text-[11px] text-zinc-300 space-y-1">
                        <p>1. Send <strong>৳ {selectedPackage.priceBDT}</strong> to the official Nagad number.</p>
                        <p>2. Set Reference as: <strong className="text-white font-mono">{minecraftUsername || "your-IGN"}</strong></p>
                        <p>3. Enter your Nagad Transaction ID (TrxID) below:</p>
                      </div>

                      <input
                        type="text"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                        placeholder="e.g. 71A9B2K4"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-orange-500/40 focus:border-orange-400 text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Error Notification if any */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-xs text-red-300 flex items-center gap-2 animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 font-mono font-bold text-sm uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,0,51,0.45)] hover:shadow-[0_0_35px_rgba(255,0,51,0.7)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current text-amber-300" />
                        <span>SUBMIT ORDER (৳ {selectedPackage.priceBDT})</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-zinc-400">
                    By confirming, you agree to BrutalMC server terms. Funds support server hosting, custom world development & anti-cheat maintenance.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Order Complete Modal */}
      {orderComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl p-[1px] bg-gradient-to-b from-emerald-500/50 via-zinc-800 to-black shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-[#09090f] rounded-3xl p-6 sm:p-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 mx-auto flex items-center justify-center text-emerald-400">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-amber-400 tracking-wider font-bold">
                  ONE LAST STEP: SEND THIS TO STAFF
                </span>
                <h3 className="text-2xl font-black uppercase text-white font-sans">
                  THANK YOU, {orderComplete.ign}!
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Order ID: <strong className="text-white">{orderComplete.orderId}</strong>
                </p>
              </div>

              {/* Receipt Box */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Package:</span>
                  <span className="text-white font-bold">{orderComplete.pkg.name}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Account:</span>
                  <span className="text-white">{orderComplete.ign} ({orderComplete.edition})</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Payment Gateway:</span>
                  <span className="text-emerald-400 font-bold uppercase">{orderComplete.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Transaction Ref:</span>
                  <span className="text-zinc-300 truncate max-w-[200px]">{orderComplete.trxId}</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 text-left space-y-1">
                <p className="font-bold">How to receive your purchase:</p>
                <p>1. Tap <strong className="text-white">Copy order details</strong> below.</p>
                <p>2. Open a ticket in our Discord and paste them. Staff check your TrxID and activate your rank.</p>
                <p>3. Then join <strong className="text-white font-mono">{SERVER_IP}</strong> and enjoy your perks.</p>
              </div>

              <button
                onClick={() => {
                  const o = orderComplete;
                  const text = [
                    `BrutalMC order ${o.orderId}`,
                    `Package: ${o.pkg.name} (৳ ${o.pkg.priceBDT})`,
                    `Player: ${o.ign} (${o.edition})`,
                    `Paid with: ${o.paymentMethod}`,
                    `TrxID: ${o.trxId}`,
                    `Date: ${o.date}`,
                  ].join("\n");
                  navigator.clipboard?.writeText(text).catch(() => {});
                  sound.playSuccess();
                  setOrderCopied(true);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-mono font-bold text-xs uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-2"
              >
                {orderCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {orderCopied ? "Copied! Now paste it in Discord" : "Copy order details"}
              </button>

              <div className="flex gap-3">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex-1 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] font-mono font-bold text-xs uppercase tracking-wider text-white transition-colors text-center"
                >
                  Open Discord Ticket
                </a>
                <button
                  onClick={() => {
                    sound.playClick();
                    setOrderComplete(null);
                  }}
                  className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-mono font-bold text-xs uppercase text-zinc-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
