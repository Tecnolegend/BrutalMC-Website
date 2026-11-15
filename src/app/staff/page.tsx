"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayModal from "@/components/PlayModal";
import MinecraftPlayer3D from "@/components/MinecraftPlayer3D";
import MinecraftEmoji from "@/components/MinecraftEmoji";
import {
  Crown,
  Shield,
  ShieldCheck,
  Terminal,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  HeartHandshake,
  Scale,
  FileText,
  Eye,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import { DISCORD_URL } from "@/lib/site";


const ROLE_PERMISSIONS = [
  {
    role: "OWNER",
    title: "Executive Owner",
    color: "from-red-600 to-rose-600",
    border: "border-red-500/40",
    bg: "bg-red-950/20",
    textColor: "text-red-400",
    icon: Crown,
    privileges: [
      "Full server console, database & VPS root access",
      "Network infrastructure & BDIX domestic routing",
      "Store billing, payouts & partnership agreements",
      "Final authority on rule changes & staff hiring",
    ],
  },
  {
    role: "DEVELOPER",
    title: "Lead Developer",
    color: "from-cyan-600 to-blue-600",
    border: "border-cyan-500/40",
    bg: "bg-cyan-950/20",
    textColor: "text-cyan-400",
    icon: Terminal,
    privileges: [
      "Custom plugin development & code deployments",
      "Boss AI scripting, custom items & combat mechanics",
      "Database schema management & performance profiling",
      "Anti-cheat heuristics tuning & exploit patching",
    ],
  },
  {
    role: "ADMINISTRATOR",
    title: "Senior Admin",
    color: "from-amber-600 to-yellow-600",
    border: "border-amber-500/40",
    bg: "bg-amber-950/20",
    textColor: "text-amber-400",
    icon: ShieldCheck,
    privileges: [
      "Staff team management & training oversight",
      "High-level ban appeals & false-positive audits",
      "Tournament organization & official broadcast hosting",
      "Emergency world backup & rollback deployment",
    ],
  },
  {
    role: "MODERATOR",
    title: "Server Moderator",
    color: "from-emerald-600 to-teal-600",
    border: "border-emerald-500/40",
    bg: "bg-emerald-950/20",
    textColor: "text-emerald-400",
    icon: Shield,
    privileges: [
      "Live gameplay surveillance & anti-cheat inspections",
      "CoreProtect grief rollbacks & land boundary dispute fixes",
      "Chat filter enforcement, mute & temporary sanctions",
      "Discord ticket resolutions for player concerns",
    ],
  },
  {
    role: "HELPER",
    title: "Community Helper",
    color: "from-purple-600 to-pink-600",
    border: "border-purple-500/40",
    bg: "bg-purple-950/20",
    textColor: "text-purple-400",
    icon: HeartHandshake,
    privileges: [
      "New player onboarding & command guidance (/help, /claim)",
      "Bedrock / PojavLauncher connectivity troubleshooting",
      "General chat assistance in Bengali and English",
      "Discord ticket queue triage & basic problem solving",
    ],
  },
];

const CODE_OF_CONDUCT = [
  {
    title: "Zero-Tolerance Item Spawning",
    description:
      "All staff members play Survival SMP legitimately. Commands like /give, /gamemode creative, or /god are strictly forbidden and hard-locked by permission audits. We do not tolerate item abuse.",
    icon: Scale,
  },
  {
    title: "Strict Impartiality & Anti-Favoritism",
    description:
      "Staff are forbidden from favoring friends, clan members, or donors in PvP or land disputes. Every sanction requires logged proof (video or anticheat records).",
    icon: Shield,
  },
  {
    title: "Transparent Audit Logs",
    description:
      "Every administrative action (ban, kick, mute, rollback, inventory inspection) is transmitted via encrypted webhook to our private Discord audit archive for executive review.",
    icon: Eye,
  },
  {
    title: "Friendly & Professional Service",
    description:
      "Staff represent BrutalMC across Bangladesh. We communicate respectfully with all players, regardless of age, rank, or playstyle, in both Bangla and English.",
    icon: HeartHandshake,
  },
];

const APPLICATION_TEMPLATE = `[BRUTALMC STAFF APPLICATION]
1. In-Game Name (IGN): [Your Minecraft Username]
2. Discord Tag: [e.g. yourname#0000]
3. Age: [Must be 16+]
4. Location / Timezone: [e.g. Dhaka, Bangladesh (BST / UTC+6)]
5. Playtime on BrutalMC: [Minimum 50 hours required]
6. Which role are you applying for? [Helper / Builder / Moderator]
7. Have you had any past bans or warnings on BrutalMC? [Yes/No - explain]
8. Describe your past Minecraft moderation or technical experience:
   [Detailed response]
9. How would you handle a player accusing a donor of hacking?
   [Detailed scenario response]
10. Why should we choose you over other applicants?
    [What unique skill or dedication do you bring?]`;

export default function StaffPage() {
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [templateCopied, setTemplateCopied] = useState(false);

  const handleCopyDiscord = (discordTag: string, id: string) => {
    sound.playSuccess();
    navigator.clipboard?.writeText(discordTag).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleCopyTemplate = () => {
    sound.playSuccess();
    navigator.clipboard?.writeText(APPLICATION_TEMPLATE).catch(() => {});
    setTemplateCopied(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#ff0033", "#06b6d4", "#f59e0b", "#10b981"],
      });
    } catch {}

    setTimeout(() => setTemplateCopied(false), 2500);
  };

  return (
    <main className="relative min-h-screen bg-[#050508] text-white selection:bg-red-600/30 selection:text-white overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-radial from-red-950/20 via-amber-950/10 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-15 bg-[radial-gradient(#ff0033_1px,transparent_1px)] [background-size:32px_32px]"
          aria-hidden="true"
        />
      </div>

      {/* Global Navigation Bar */}
      <Navbar onPlayClick={() => setIsPlayModalOpen(true)} />

      {/* Hero & Breadcrumbs */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Link
              href="/"
              onClick={() => sound.playClick()}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-red-500 font-bold">STAFF TEAM</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-200">LEADERSHIP & GUARDIANS</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#apply"
              onClick={() => sound.playClick()}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-500/40 font-mono font-bold text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-red-400" />
              <span>APPLY FOR STAFF</span>
            </a>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playPower()}
              className="px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] font-mono font-bold text-xs uppercase tracking-wider text-white shadow-[0_0_15px_rgba(88,101,242,0.4)] transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>DISCORD TICKET</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Hero Banner Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-minecraft tracking-widest uppercase">
            <MinecraftEmoji name="totem_of_undying" size={16} glow="gold" />
            <span>OFFICIAL BRUTALMC TEAM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-minecraft font-bold uppercase tracking-tight text-white mc-shadow">
            GUARDIANS OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">THE REALM</span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            Meet TecnoLegend, the founder of BrutalMC. The staff team is growing: if you want to help keep the server fair and fun, apply below.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-2xl mx-auto">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">COVERAGE</div>
              <div className="text-sm font-minecraft font-bold text-white mt-0.5">24/7 TICKETS</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">BDIX ROUTING</div>
              <div className="text-sm font-minecraft font-bold text-emerald-400 mt-0.5">&lt;15MS PING</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">INTEGRITY</div>
              <div className="text-sm font-minecraft font-bold text-amber-400 mt-0.5">ZERO ABUSE</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">TIMEZONE</div>
              <div className="text-sm font-minecraft font-bold text-sky-400 mt-0.5">BST (UTC+6)</div>
            </div>
          </div>
        </div>

        {/* 1. FOUNDER SPOTLIGHT */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,0,51,0.5)]">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-minecraft font-bold uppercase text-white mc-shadow">
                THE <span className="text-red-500">FOUNDER</span>
              </h2>
              <p className="text-xs text-zinc-400">
                BrutalMC was built and is run by TecnoLegend.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* FOUNDER: TecnoLegend */}
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-b from-red-600 via-rose-700 to-zinc-900 shadow-[0_0_50px_rgba(255,0,51,0.35)] flex flex-col justify-between overflow-hidden group">
              {/* Header Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-minecraft text-[10px] uppercase font-bold tracking-wider shadow-[0_0_15px_rgba(255,0,51,0.8)] flex items-center gap-1.5 mc-shadow">
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  FOUNDER & ARCHITECT
                </span>
              </div>

              {/* NameMC Link Button */}
              <div className="absolute top-4 right-4 z-20">
                <a
                  href="https://namemc.com/profile/TecnoLegend"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/75 hover:bg-black border border-zinc-700 hover:border-red-500 text-zinc-300 hover:text-white font-minecraft text-[10px] transition-all backdrop-blur-md group/btn"
                  title="View TecnoLegend Skin on NameMC"
                >
                  <span>NameMC</span>
                  <ExternalLink className="w-3 h-3 text-red-400 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Inner Card Container */}
              <div className="relative h-full w-full rounded-3xl bg-[#090910] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

                {/* 3D Model Viewport */}
                <div className="relative w-full flex items-center justify-center pt-8 pb-4">
                  <MinecraftPlayer3D
                    skinUrl="/images/tecnolegend_skin.png"
                    username="TecnoLegend"
                    roleBadge="FOUNDER"
                    badgeColor="red"
                    height={380}
                    interactive={true}
                  />
                </div>

                {/* Bio & Details */}
                <div className="pt-4 border-t border-red-500/20 space-y-4 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-minecraft font-bold text-white uppercase mc-shadow">
                          TecnoLegend
                        </h3>
                        <MinecraftEmoji name="netherite_sword" size={20} glow="red" />
                      </div>
                      <span className="text-xs font-mono text-red-400 font-semibold tracking-wider">
                        Network Founder & Lead Systems Architect
                      </span>
                    </div>

                    <a
                      href="https://github.com/Tecnolegend"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/50 border border-red-500/30 text-[11px] font-mono text-red-300 hover:text-white self-start sm:self-center"
                    >
                      <span>GITHUB: TECNOLEGEND</span>
                    </a>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Founder and visionary behind BrutalMC Network. Engineers core server infrastructure, low-latency BDIX domestic fiber routing, custom world terrain generation, and proprietary anti-cheat defenses.
                  </p>

                  {/* Specialties Pill Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
                      <div className="text-[10px] font-minecraft text-zinc-400 uppercase">EXPERIENCE</div>
                      <div className="text-xs font-minecraft font-bold text-white mt-0.5">EST. 2023</div>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
                      <div className="text-[10px] font-minecraft text-zinc-400 uppercase">SERVER ELO</div>
                      <div className="text-xs font-minecraft font-bold text-amber-400 mt-0.5">#1 GLADIATOR</div>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
                      <div className="text-[10px] font-minecraft text-zinc-400 uppercase">ROLE</div>
                      <div className="text-xs font-minecraft font-bold text-red-400 mt-0.5">SYS ARCHITECT</div>
                    </div>
                  </div>

                  {/* Discord Action */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => handleCopyDiscord("tecnolegend103", "tecnolegend")}
                      className="inline-flex items-center gap-2 text-xs font-minecraft text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#5865F2]" />
                      <span>{copiedId === "tecnolegend" ? "COPIED DISCORD!" : "Discord: tecnolegend103"}</span>
                      {copiedId === "tecnolegend" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                    </button>

                    <a
                      href="https://namemc.com/profile/TecnoLegend"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-1.5 text-xs font-minecraft text-red-400 hover:text-red-300 font-bold transition-colors"
                    >
                      <span>VIEW NAMEMC</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. STAFF HIERARCHY & PRIVILEGES MATRIX */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-xs font-minecraft text-red-400 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>COMMAND & AUTHORITY MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-minecraft font-bold uppercase tracking-tight text-white mc-shadow">
              STAFF <span className="text-red-500">HIERARCHY & RESPONSIBILITIES</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Clear divisions of responsibility ensure no single staff member can abuse permissions, guaranteeing competitive fairness for all clans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROLE_PERMISSIONS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.role}
                  className={`rounded-2xl p-6 bg-[#080811] border ${tier.border} relative overflow-hidden flex flex-col justify-between`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tier.color} opacity-10 rounded-full blur-2xl pointer-events-none`} />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-xl ${tier.bg} border ${tier.border} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${tier.textColor}`} />
                        </div>
                        <div>
                          <h3 className="font-minecraft text-base font-bold text-white uppercase">
                            {tier.title}
                          </h3>
                          <span className={`text-[10px] font-mono font-bold ${tier.textColor}`}>
                            ROLE: [{tier.role}]
                          </span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2.5 pt-2 border-t border-zinc-900 text-xs text-zinc-300">
                      {tier.privileges.map((privilege, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.textColor}`} />
                          <span className="leading-snug">{privilege}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>SECURITY CLEARANCE</span>
                    <span className="font-bold text-zinc-300">TIER {tier.role === "OWNER" ? "1 (ROOT)" : tier.role === "DEVELOPER" ? "2 (SYS)" : tier.role === "ADMINISTRATOR" ? "3 (ADMIN)" : tier.role === "MODERATOR" ? "4 (MOD)" : "5 (TRIAL)"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. STAFF CODE OF CONDUCT & INTEGRITY PLEDGE */}
        <section className="mb-24">
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-red-600/40 via-zinc-800 to-amber-600/40 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="relative rounded-3xl bg-[#090912] p-8 sm:p-12">
              <div className="max-w-3xl mb-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-xs font-mono text-red-400 uppercase">
                  <Scale className="w-3.5 h-3.5" />
                  <span>TRANSPARENT ACCOUNTABILITY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-minecraft font-bold uppercase tracking-tight text-white mc-shadow">
                  STAFF CODE OF CONDUCT & <span className="text-red-500">FAIR PLAY CHARTER</span>
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  BrutalMC operates under strict zero-tolerance policies. Staff members are sworn to uphold fair competition for all players without bias or abuse of administrative tools.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CODE_OF_CONDUCT.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-4 hover:border-red-500/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Report staff callout */}
              <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-zinc-400 text-center sm:text-left">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Suspect staff abuse or unfair sanctions? Open an executive appeal directly to Server Owners.
                  </span>
                </div>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playPower()}
                  className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 text-red-300 hover:text-white font-mono font-bold text-xs uppercase transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>REPORT TO OWNERS</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. RECRUITMENT & APPLICATION PORTAL */}
        <section id="apply" className="mb-20 scroll-mt-28">
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 shadow-[0_0_50px_rgba(255,0,51,0.3)] overflow-hidden">
            <div className="relative rounded-3xl bg-[#090914] p-8 sm:p-12 lg:p-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Requirements & Steps */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>NOW RECRUITING HELPERS & MODERATORS</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-minecraft font-bold uppercase tracking-tight text-white mc-shadow">
                    JOIN THE <span className="text-red-500">STAFF TEAM</span>
                  </h2>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    Passionate about competitive Minecraft? Dedicated to creating a helpful, cheat-free environment for Bangladeshi players? We are actively seeking mature, bilingual helpers and trial moderators to join our squad.
                  </p>

                  {/* Requirements List */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200">
                      MINIMUM QUALIFICATIONS
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block font-semibold">16+ Years of Age</strong>
                          <span className="text-zinc-400 text-[11px]">Maturity and emotional composure during disputes.</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block font-semibold">Working Microphone & Discord</strong>
                          <span className="text-zinc-400 text-[11px]">Regular participation in staff voice syncs.</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block font-semibold">50+ Hours Survival Playtime</strong>
                          <span className="text-zinc-400 text-[11px]">Familiar with Blood Shards, dragons, and claims.</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block font-semibold">Bangla & English Fluency</strong>
                          <span className="text-zinc-400 text-[11px]">Effective communication across all community chats.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Application Process Steps */}
                  <div className="pt-4 border-t border-zinc-800 space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200">
                      APPLICATION WORKFLOW
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold">1. Copy Template</span>
                      <span>→</span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold">2. Open Discord Ticket</span>
                      <span>→</span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold">3. Voice Interview</span>
                      <span>→</span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold">4. Trial Onboarding</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Copyable Application Template */}
                <div className="lg:col-span-5 w-full rounded-2xl bg-zinc-950/90 border border-zinc-800 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-zinc-800 mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-400" />
                      <span className="font-minecraft text-xs font-bold uppercase text-white">
                        APPLICATION TEMPLATE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">#staff-apply</span>
                  </div>

                  {/* Code snippet display */}
                  <pre className="p-4 rounded-xl bg-black/80 border border-zinc-900 text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-[320px] whitespace-pre leading-relaxed select-all">
                    {APPLICATION_TEMPLATE}
                  </pre>

                  {/* Buttons */}
                  <div className="pt-4 flex flex-col gap-3">
                    <button
                      onClick={handleCopyTemplate}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 font-minecraft font-bold text-xs uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,51,0.5)] transition-all flex items-center justify-center gap-2 mc-shadow active:scale-98"
                    >
                      {templateCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" />
                          <span>COPIED TO CLIPBOARD!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-amber-300" />
                          <span>COPY APPLICATION TEMPLATE</span>
                        </>
                      )}
                    </button>

                    <a
                      href={DISCORD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playPower()}
                      className="w-full py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] font-mono font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5865F2]/20"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>SUBMIT ON OFFICIAL DISCORD</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* How to Join Play Modal */}
      <PlayModal isOpen={isPlayModalOpen} onClose={() => setIsPlayModalOpen(false)} />
    </main>
  );
}
