"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sound } from "@/lib/sound";
import { SERVER_IP } from "@/lib/site";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayModal from "@/components/PlayModal";
import Shenron3D from "@/components/Shenron3D";
import {
  Sparkles,
  Shield,
  Flame,
  Wind,
  Zap,
  Swords,
  Crosshair,
  Copy,
  Check,
  ChevronRight,
  Award,
  AlertTriangle,
  Clock,
  MapPin,
  Layers,
} from "lucide-react";

interface Ability {
  id: string;
  name: string;
  nameBangla: string;
  type: "ACTIVE" | "PASSIVE" | "ULTIMATE";
  cooldown: string;
  damage: string;
  range: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  summary: string;
  mechanics: string[];
  counterTactic: string;
}

const ABILITIES: Ability[] = [
  {
    id: "breath",
    name: "Pearl Breath (Frostfire Torrent)",
    nameBangla: "পার্ল ব্রেথ - হিমশিখা প্রবাহ",
    type: "ACTIVE",
    cooldown: "14 Seconds",
    damage: "18 Dmg / Sec (Magic)",
    range: "25 Blocks Cone",
    icon: Flame,
    color: "from-sky-400 to-cyan-500",
    summary:
      "Shenron unleashes a torrential stream of pure white celestial frost-flame that chills targets, breaks shields, and blankets the arena in freezing mist.",
    mechanics: [
      "Inflicts Frostbite III (Slowness 40% & 4 true damage every 0.5s for 4s).",
      "Instantly disables raised player shields for 3 seconds.",
      "Extinguishes nearby fires and freezes lava sources into crying obsidian.",
    ],
    counterTactic:
      "Take cover behind Celestial Spire pillars or drink a Potion of Swiftness to sprint out of the cone trajectory.",
  },
  {
    id: "tail",
    name: "Tail Tempest (Vortex Thrash)",
    nameBangla: "টেইল টেম্পেস্ট - ঘূর্ণিঝড় চাবুক",
    type: "ACTIVE",
    cooldown: "9 Seconds",
    damage: "32 Physical Damage",
    range: "8 Blocks Radius (360°)",
    icon: Wind,
    color: "from-blue-400 to-indigo-500",
    summary:
      "A lightning-fast 360-degree serpentine tail whip that knocks back all nearby melee combatants and repels incoming arrow volleys.",
    mechanics: [
      "Launches players 15 blocks backwards with severe vertical knockback.",
      "Deflects all incoming projectile arrows during the 0.8s whip duration.",
      "Inflicts Weakness II for 6 seconds on directly struck warriors.",
    ],
    counterTactic:
      "Keep an Ender Pearl ready on your hotbar or equip Elytra to recover before plunging off the sky island edge.",
  },
  {
    id: "dive",
    name: "Stratosphere Dive (Sky Crash)",
    nameBangla: "স্ট্র্যাটোস্ফিয়ার ডাইভ - আকাশ পতন",
    type: "ULTIMATE",
    cooldown: "45 Seconds",
    damage: "55 AoE Shockwave Damage",
    range: "12 Blocks Impact Crater",
    icon: Zap,
    color: "from-amber-400 to-yellow-500",
    summary:
      "Shenron ascends high into the clouds, vanishing for 3 seconds before crashing down directly at the highest DPS warrior, generating an expanding seismic ring.",
    mechanics: [
      "A glowing cyan targeting rune appears on the ground 2 seconds prior to impact.",
      "Direct ground-zero impact causes lethal 55 damage and destroys placed cobwebs.",
      "Expanding ground shockwave ripples outward, requiring players to jump or take 20 fall damage.",
    ],
    counterTactic:
      "Time your jump with a Wind Charge or water bucket drop right as the shockwave impacts the floor.",
  },
  {
    id: "scales",
    name: "Alabaster Scales (Passive Carapace)",
    nameBangla: "অ্যালাবাস্টার স্কেলস - হীরক বর্ম",
    type: "PASSIVE",
    cooldown: "Constant Passive",
    damage: "10% Piercing Reflection",
    range: "Self Buff",
    icon: Shield,
    color: "from-slate-200 to-zinc-400",
    summary:
      "When Shenron's health falls below 50%, its alabaster scales crystallize into diamond-density plating, shielding it against incoming assaults.",
    mechanics: [
      "Grants flat 35% damage reduction against non-critical melee and standard arrows.",
      "Reflects 10% of incoming physical damage back to the attacker as piercing thorns.",
      "Immune to Poison, Wither, and standard Fire tick effects.",
    ],
    counterTactic:
      "Switch to Power V Bows with Spectral Arrows or enchanted Netherite Axes to land precision critical strikes.",
  },
  {
    id: "pearl",
    name: "Celestial Pearl Convergence (Awakening)",
    nameBangla: "ড্রাগন পার্ল কনভার্জেন্স - অমরত্ব জাগরণ",
    type: "ULTIMATE",
    cooldown: "Triggered at 25% HP",
    damage: "Massive Arena Blindness",
    range: "Whole Arena",
    icon: Sparkles,
    color: "from-cyan-300 to-sky-500",
    summary:
      "At 25% remaining health, Shenron enters a stasis shield and summons 4 floating Celestial Orbs. Adventurers must shatter all 4 orbs before the dragon heals.",
    mechanics: [
      "Shenron becomes invulnerable for 15 seconds while channeling life essence.",
      "4 Dragon Orbs spawn around the perimeter (each having 30 HP).",
      "If any orb survives the 15s timer, Shenron regenerates 20% total health and flashes the arena with Blindness V.",
    ],
    counterTactic:
      "Split your raid party: 2 ranged players snipe the outer orbs while melee players shatter the lower orbs immediately.",
  },
];

interface DragonRosterItem {
  name: string;
  rarity: string;
  rarityColor: string;
  colorName: string;
  status: "ACTIVE" | "COMING SOON";
  description: string;
  health: string;
  element: string;
  level: string;
  imageBg: string;
}

const DRAGON_ROSTER: DragonRosterItem[] = [
  {
    name: "Shenron",
    rarity: "Common Dragon",
    rarityColor: "border-sky-500/40 bg-sky-500/10 text-sky-300",
    colorName: "Alabaster White",
    status: "ACTIVE",
    description:
      "The flagship celestial serpent of BrutalMC. Glides through the clouds above the Celestial Spire with pearl frost breath.",
    health: "1,500 HP",
    element: "Celestial Frost",
    level: "Tier 1 World Boss",
    imageBg: "from-sky-950/80 via-slate-900 to-black",
  },
  {
    name: "Pyrothax the Ashborn",
    rarity: "Rare Dragon",
    rarityColor: "border-red-500/40 bg-red-500/10 text-red-300",
    colorName: "Crimson Flame",
    status: "COMING SOON",
    description:
      "A ferocious volcanic wyvern dwelling deep in the Nether Magma Caverns. Emits scorched earth lava pools.",
    health: "3,500 HP",
    element: "Infernal Magma",
    level: "Tier 2 World Boss",
    imageBg: "from-red-950/80 via-zinc-900 to-black",
  },
  {
    name: "Abyssal Leviathan",
    rarity: "Epic Dragon",
    rarityColor: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    colorName: "Void Obsidian",
    status: "COMING SOON",
    description:
      "Forged in the Endless End Void. Can manipulate gravity, teleport players, and consume surrounding light.",
    health: "6,000 HP",
    element: "Void Dark Matter",
    level: "Tier 3 World Boss",
    imageBg: "from-purple-950/80 via-slate-950 to-black",
  },
  {
    name: "Aurelion the Sovereign",
    rarity: "Mythic Dragon",
    rarityColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    colorName: "Astral Radiant Gold",
    status: "COMING SOON",
    description:
      "The ancient creator dragon of the Brutal cosmos. Channels supernovae, starfire beams, and cosmic reality distortion.",
    health: "12,000 HP",
    element: "Solar Supernova",
    level: "Tier 4 Server Apex",
    imageBg: "from-amber-950/80 via-yellow-950/40 to-black",
  },
];

interface LootItem {
  id: string;
  name: string;
  rarity: "100% Guaranteed" | "Rare (15%)" | "Legendary (5%)" | "Currency";
  rarityColor: string;
  iconBg: string;
  description: string;
  craftingUse: string;
}

const LOOT_TABLE: LootItem[] = [
  {
    id: "scale",
    name: "Shenron's White Scale (x3-6)",
    rarity: "100% Guaranteed",
    rarityColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    iconBg: "from-sky-500/20 to-blue-600/20",
    description:
      "Pristine alabaster dragon scales shimmering with pearl luster. Retains celestial wind enchantments.",
    craftingUse: "Primary component for forging Tier 1 Celestial Dragonscale Chestplate & Elytra Reinforcement.",
  },
  {
    id: "horn",
    name: "Horn of the Celestial Wyrm",
    rarity: "Rare (15%)",
    rarityColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    iconBg: "from-cyan-500/20 to-sky-600/20",
    description:
      "A razor-sharp ivory horn severed from Shenron's crown. Grants inherent resistance against fall impacts.",
    craftingUse: "Combines at the Anvil to grant Feather Falling VI & Jump Boost II helmet ornament.",
  },
  {
    id: "pearl",
    name: "Shenron's Dragon Pearl",
    rarity: "Legendary (5%)",
    rarityColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    iconBg: "from-amber-500/20 to-yellow-600/20",
    description:
      "The beating core of the white wyrm. Emits soft ambient starlight and pulses when danger is near.",
    craftingUse: "Equippable talisman granting permanent Double Jump & Celestial Slow Falling in the SMP world.",
  },
  {
    id: "shards",
    name: "Blood Shards (x120-180)",
    rarity: "Currency",
    rarityColor: "text-red-400 bg-red-500/10 border-red-500/30",
    iconBg: "from-red-500/20 to-rose-600/20",
    description:
      "Crystallized essence dropped by all BrutalMC world bosses. The premier currency of the underground black market.",
    craftingUse: "Trade at `/warp blackmarket` for Custom Enchants, God Apples, and Spawner Keys.",
  },
];

export default function DragonsPage() {
  const [selectedAbility, setSelectedAbility] = useState<Ability>(ABILITIES[0]);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [copiedIp, setCopiedIp] = useState(false);
  const [copiedWarp, setCopiedWarp] = useState(false);

  const handleCopyIp = () => {
    sound.playSuccess();
    navigator.clipboard?.writeText(SERVER_IP).catch(() => {});
    setCopiedIp(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.85 },
      colors: ["#38bdf8", "#ffffff", "#0284c7"],
    });
    setTimeout(() => setCopiedIp(false), 2500);
  };

  const handleCopyWarp = () => {
    sound.playSuccess();
    navigator.clipboard?.writeText("/warp dragon").catch(() => {});
    setCopiedWarp(true);
    setTimeout(() => setCopiedWarp(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#050508] text-white selection:bg-sky-500/30 selection:text-white overflow-x-hidden">
      {/* Background Ambient Glow & Starfield */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-radial from-sky-950/20 via-sky-900/5 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[600px] bg-radial from-cyan-950/20 via-transparent to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden="true"
        />
      </div>

      {/* Esports Navigation Bar */}
      <Navbar onPlayClick={() => setIsPlayModalOpen(true)} />

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* BREADCRUMB & FAST STATUS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Link
              href="/"
              onClick={() => sound.playClick()}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-400">BESTIARY</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-sky-400 font-bold">DRAGONS</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-bold">SHENRON</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-300">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>SPAWN STATUS: READY TO SUMMON</span>
            </div>
            <button
              onClick={handleCopyWarp}
              title="Copy /warp dragon command"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-sky-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <span>/warp dragon</span>
              {copiedWarp ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>
          </div>
        </div>

        {/* HERO INTRO & METADATA SECTION */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider bg-sky-500/20 border border-sky-500/40 text-sky-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              TIER 1 WORLD RAID BOSS
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-300">
              RARITY: COMMON DRAGON
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 border border-white/20 text-white">
              COLOR: PEARL WHITE
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase text-white font-sans">
                SHENRON <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-cyan-300">THE WHITE WYRM</span>
              </h1>
              <p className="mt-2 text-base sm:text-xl text-zinc-300 max-w-3xl leading-relaxed">
                শ্বেনরন — শ্বেত ড্রাগন। The celestial serpentine guardian of the clouds above BrutalMC’s Custom World.
                Gliding with diamond-hard alabaster scales and commanded by the ancient winds, Shenron challenges parties of warriors
                seeking passage to higher dimensions.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  sound.playPower();
                  setIsPlayModalOpen(true);
                }}
                className="relative group overflow-hidden px-6 py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white transition-all shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 transition-transform duration-300 group-hover:scale-105" />
                <span className="relative flex items-center gap-2">
                  <Swords className="w-4 h-4 text-white" />
                  CHALLENGE IN-GAME
                </span>
              </button>

              <button
                onClick={handleCopyIp}
                className="px-5 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-zinc-900/90 border border-zinc-800 hover:border-sky-500/50 text-zinc-200 hover:text-white transition-all flex items-center gap-2"
              >
                <span>{copiedIp ? "IP COPIED!" : "PLAY.BRUTALMC.XYZ"}</span>
                {copiedIp ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-400" />
                )}
              </button>
            </div>
          </div>

          {/* DRAGON KEY STATS STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {[
              { label: "HEALTH POOL", val: "1,500 HP", sub: "Shared Raid Bar", color: "text-emerald-400" },
              { label: "ATTACK POWER", val: "18 - 55 DMG", sub: "Magic & Physical", color: "text-amber-400" },
              { label: "SPAWN COORDS", val: "Y: 280 (Spire)", sub: "X: 1420 | Z: -890", color: "text-sky-400" },
              { label: "PARTY SIZE", val: "2 - 5 Players", sub: "Recommended Co-op", color: "text-purple-400" },
              { label: "RESPAWN CYCLE", val: "Every 6 Hours", sub: "Automated Announcement", color: "text-rose-400" },
              { label: "SUMMON OFFERING", val: "1x Dragon Pearl", sub: "Crafted at Spawn Altar", color: "text-cyan-400" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md flex flex-col"
              >
                <span className="text-[10px] font-mono text-zinc-400 font-medium tracking-wider">
                  {stat.label}
                </span>
                <span className={`text-base font-extrabold font-mono mt-0.5 ${stat.color}`}>
                  {stat.val}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono mt-auto">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3D INTERACTIVE MODEL SHOWCASE */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white font-mono">
                  LIVE 3D MODEL VIEWPORT
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
                Real-time WebGL interactive render of Shenron. Rotate, zoom, trigger abilities, and inspect combat hitboxes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                INTERACTIVE CONTROLS:
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-sky-400 font-bold">
                LEFT CLICK + DRAG: ROTATE
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-sky-400 font-bold hidden md:inline">
                SCROLL: ZOOM
              </span>
            </div>
          </div>

          {/* Embedded 3D Canvas */}
          <Shenron3D />
        </section>

        {/* LORE & CINEMATIC BANNER */}
        <section className="relative rounded-3xl border border-sky-500/20 overflow-hidden bg-gradient-to-r from-black via-slate-950 to-black">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="/images/celestial_dragon.jpg"
              alt="Shenron The White Celestial Dragon"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/85 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-xs font-mono text-sky-300">
              <Layers className="w-3.5 h-3.5" />
              <span>THE CHRONICLES OF BRUTALMC</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-sans leading-tight">
              The Legend of <span className="text-sky-400">Shenron</span>
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
              <p>
                When the architects forged BrutalMC’s custom world, they elevated seven sky sanctuaries above the clouds.
                At the highest summit—the <strong className="text-white">Celestial Spire (Y: 280)</strong>—sleeps Shenron,
                the First Dragon of the Realm.
              </p>
              <p>
                Unlike standard Minecraft Ender Dragons that rely solely on aerial dive-bombs, Shenron commands the
                cold currents of the upper stratosphere. Classified as a <strong className="text-sky-300">Common Dragon</strong>,
                it serves as the entry-level raid encounter for organized clans preparing for higher-tier beasts.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300 bg-black/60 px-3 py-2 rounded-xl border border-zinc-800">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Arena: /warp dragon</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300 bg-black/60 px-3 py-2 rounded-xl border border-zinc-800">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Raid Duration: 15 Min Enrage</span>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOM ABILITIES DEEP-DIVE (INTERACTIVE TABS & CARDS) */}
        <section id="abilities" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                  TACTICAL COMBAT DOSSIER
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-sans mt-1">
                SHENRON&apos;S CUSTOM ABILITIES
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 max-w-sm">
              Shenron features 5 custom scripted boss mechanics coded exclusively for BrutalMC. Learn each telegraph to survive the raid.
            </p>
          </div>

          {/* Ability Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {ABILITIES.map((ability) => {
              const Icon = ability.icon;
              const isSelected = selectedAbility.id === ability.id;
              return (
                <button
                  key={ability.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAbility(ability);
                  }}
                  className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between gap-3 ${
                    isSelected
                      ? "bg-gradient-to-b from-sky-950/60 to-black border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-[1.02]"
                      : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${ability.color} text-black font-bold`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${
                        ability.type === "ULTIMATE"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : ability.type === "PASSIVE"
                          ? "bg-slate-700/30 text-slate-300 border border-slate-600/30"
                          : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                      }`}
                    >
                      {ability.type}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white font-mono leading-snug">
                      {ability.name.split("(")[0]}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
                      CD: {ability.cooldown}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Ability Detailed Inspector Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-sky-500/30 bg-gradient-to-br from-[#0a1224]/80 via-[#050508] to-[#050508] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3.5 rounded-2xl bg-gradient-to-br ${selectedAbility.color} text-black font-bold shrink-0`}
                >
                  {React.createElement(selectedAbility.icon, { className: "w-7 h-7" })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                      {selectedAbility.type} ABILITY
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs font-mono text-zinc-400">{selectedAbility.nameBangla}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                    {selectedAbility.name}
                  </h3>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <div className="px-3 py-2 rounded-xl bg-black/60 border border-zinc-800">
                  <span className="text-zinc-500">Cooldown: </span>
                  <span className="text-white font-bold">{selectedAbility.cooldown}</span>
                </div>
                <div className="px-3 py-2 rounded-xl bg-black/60 border border-zinc-800">
                  <span className="text-zinc-500">Damage: </span>
                  <span className="text-rose-400 font-bold">{selectedAbility.damage}</span>
                </div>
                <div className="px-3 py-2 rounded-xl bg-black/60 border border-zinc-800">
                  <span className="text-zinc-500">Range: </span>
                  <span className="text-sky-300 font-bold">{selectedAbility.range}</span>
                </div>
              </div>
            </div>

            <p className="text-zinc-200 leading-relaxed font-sans text-base sm:text-lg">
              {selectedAbility.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Mechanics list */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5" />
                  MECHANICS & EFFECTS
                </h4>
                <ul className="space-y-2 text-sm text-zinc-300 font-mono">
                  {selectedAbility.mechanics.map((mech, i) => (
                    <li key={i} className="flex items-start gap-2 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60">
                      <span className="text-sky-400 font-bold">›</span>
                      <span>{mech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Counter Tactic */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  SURVIVAL STRATEGY & COUNTERS
                </h4>
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-100 text-sm font-mono leading-relaxed flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 block mb-1">Raid Leader Note:</span>
                    {selectedAbility.counterTactic}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOSS DROPS & LOOT TABLE */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  SPOILS OF WAR
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-sans mt-1">
                SHENRON&apos;S LOOT TABLE &amp; DROPS
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 max-w-sm">
              Defeating Shenron awards rare crafting materials, vanity items, and server currency shared with your party.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOOT_TABLE.map((loot) => (
              <div
                key={loot.id}
                className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 hover:border-sky-500/40 transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${loot.iconBg} border border-white/10 flex items-center justify-center`}
                    >
                      <Sparkles className="w-5 h-5 text-sky-300" />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${loot.rarityColor}`}
                    >
                      {loot.rarity}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-white font-mono mt-3">
                    {loot.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-sans">
                    {loot.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-300">
                  <span className="text-sky-400 font-semibold">Utility: </span>
                  {loot.craftingUse}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RAID PHASES & TIMELINE GUIDE */}
        <section className="p-6 sm:p-10 rounded-3xl border border-zinc-800 bg-[#080b12] space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest">
              ENCOUNTER STRATEGY GUIDE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-sans">
              THREE-PHASE BOSS PROGRESSION
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Be prepared for Shenron’s evolving combat phases as its health bar decreases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {[
              {
                phase: "PHASE 1 (100% - 75% HP)",
                title: "Aerial Superiority",
                desc: "Shenron glides through the sky, cycling between Pearl Breath sweeps and single-target sky blasts. Melee players must dodge cone attacks while archers deal steady ranged DPS.",
                focus: "Spread out across pillars • Shoot spectral arrows",
              },
              {
                phase: "PHASE 2 (75% - 25% HP)",
                title: "Vortex & Shockwaves",
                desc: "Shenron lands on the central arena altar. Tail Tempest triggers every 9s, wiping out careless melee players. Stratosphere Dives begin targeting the player with the highest DPS.",
                focus: "Keep Ender Pearls ready • Watch floor rune warnings",
              },
              {
                phase: "PHASE 3 (25% - 0% HP)",
                title: "Dragon Pearl Awakening",
                desc: "Shenron enters an invulnerable stasis bubble and summons 4 Celestial Orbs around the perimeter. Players have 15 seconds to destroy all 4 orbs before a 300 HP heal triggers.",
                focus: "Designate 2 orb shooters • Save strength potions for enrage",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-black/60 border border-zinc-800 flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {p.phase}
                  </span>
                  <h4 className="text-lg font-bold text-white font-mono mt-3">{p.title}</h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">{p.desc}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                  <span className="text-amber-400 font-bold">Priority: </span>
                  {p.focus}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DRAGON BESTIARY ROSTER (THE BRUTALMC DRAGON ECOSYSTEM) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                  BRUTALMC DRAGON BESTIARY
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-sans mt-1">
                THE DRAGON ROSTER
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 max-w-sm">
              Shenron is the first of four legendary dragons being introduced to the BrutalMC survival world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DRAGON_ROSTER.map((dragon, idx) => (
              <div
                key={dragon.name}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between gap-6 relative overflow-hidden ${
                  dragon.status === "ACTIVE"
                    ? "bg-gradient-to-b from-[#0e192e] to-black border-sky-500/40 shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                    : "bg-zinc-900/30 border-zinc-800/80 opacity-75 hover:opacity-100"
                }`}
              >
                {/* Status Watermark */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full border ${dragon.rarityColor}`}
                  >
                    {dragon.rarity}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      dragon.status === "ACTIVE"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    }`}
                  >
                    {dragon.status}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">{dragon.colorName}</span>
                  <h4 className="text-xl font-extrabold text-white font-mono mt-0.5">
                    {dragon.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                    {dragon.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 space-y-1.5 text-[11px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Tier:</span>
                    <span className="text-white font-bold">{dragon.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Health:</span>
                    <span className="text-emerald-400 font-bold">{dragon.health}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Element:</span>
                    <span className="text-sky-300 font-bold">{dragon.element}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <div className="relative rounded-3xl border border-sky-500/40 p-8 sm:p-12 bg-gradient-to-r from-sky-950/60 via-black to-[#0a1224]/80 overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.25)]">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM WORLD RAID READY</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold uppercase text-white font-sans tracking-tight">
              ASSEMBLE YOUR CLAN TO DEFEAT SHENRON
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              Connect to Bangladesh’s premier Custom Survival SMP network. Type <strong className="text-sky-300">/warp dragon</strong> in-game
              to teleport to the Celestial Spire waiting arena.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={handleCopyIp}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-400 hover:to-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all flex items-center gap-2"
              >
                <span>{copiedIp ? "IP COPIED TO CLIPBOARD!" : "COPY IP: play.brutalmc.xyz"}</span>
                {copiedIp ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  sound.playPower();
                  setIsPlayModalOpen(true);
                }}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-black/80 border border-zinc-800 hover:border-sky-500/40 text-zinc-200 hover:text-white transition-colors"
              >
                HOW TO JOIN (JAVA & BEDROCK)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />

      {/* PLAY MODAL (HOW TO CONNECT) */}
      <PlayModal isOpen={isPlayModalOpen} onClose={() => setIsPlayModalOpen(false)} />
    </main>
  );
}
