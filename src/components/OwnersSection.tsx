"use client";

import React from "react";
import { sound } from "@/lib/sound";
import MinecraftPlayer3D from "@/components/MinecraftPlayer3D";
import MinecraftEmoji from "@/components/MinecraftEmoji";
import { Crown, ExternalLink } from "lucide-react";

export default function OwnersSection() {
  return (
    <section id="owners" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#060609] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-radial from-red-600/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff0033_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-minecraft tracking-widest uppercase">
            <MinecraftEmoji name="totem_of_undying" size={16} glow="gold" />
            <span>EXECUTIVE LEADERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-minecraft font-bold uppercase tracking-tight text-white mc-shadow">
            SERVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">FOUNDER & OWNER</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            The visionary founder and server owner delivering Bangladesh&apos;s most competitive Custom World Survival SMP network.
          </p>
        </div>

        {/* 3D DUAL-OWNER SPOTLIGHT (FOUNDER & OWNER ONLY) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. FOUNDER: TecnoLegend */}
          <div className="relative rounded-3xl p-[2px] bg-gradient-to-b from-red-600 via-rose-700 to-zinc-900 shadow-[0_0_50px_rgba(255,0,51,0.35)] flex flex-col justify-between overflow-hidden group">
            {/* Header Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white font-minecraft text-[10px] uppercase font-bold tracking-wider shadow-[0_0_15px_rgba(255,0,51,0.8)] flex items-center gap-1.5 mc-shadow">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                FOUNDER & ARCHITECT
              </span>
            </div>

            {/* NameMC Link Button (Top Right) */}
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
              {/* Radial glow */}
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

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/50 border border-red-500/30 text-[11px] font-mono text-emerald-400 self-start sm:self-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ONLINE ON SERVER</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Founder and visionary behind BrutalMC Network. Engineers core server infrastructure, low-latency BDIX domestic fiber routing, custom world terrain generation, and proprietary anti-cheat defenses.
                </p>

                {/* Specialties Pill Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                  <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
                    <div className="text-[10px] font-minecraft text-zinc-400 uppercase">EXPERIENCE</div>
                    <div className="text-xs font-minecraft font-bold text-white mt-0.5">EST. 2023</div>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
                    <div className="text-[10px] font-minecraft text-zinc-400 uppercase">SERVER ELO</div>
                    <div className="text-xs font-minecraft font-bold text-amber-400 mt-0.5">#1 GLADIATOR</div>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-minecraft text-zinc-400 uppercase">ROLE</div>
                    <div className="text-xs font-minecraft font-bold text-red-400 mt-0.5">SYS ARCHITECT</div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <a
                    href="https://namemc.com/profile/TecnoLegend"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-2 text-xs font-minecraft text-red-400 hover:text-red-300 font-bold transition-colors group/link"
                  >
                    <span>VERIFIED NAMEMC SKIN & HISTORY</span>
                    <ExternalLink className="w-3.5 h-3.5 group-link/hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. OWNER: Not_Strategy */}
          <div className="relative rounded-3xl p-[2px] bg-gradient-to-b from-amber-500 via-amber-700 to-zinc-900 shadow-[0_0_50px_rgba(245,158,11,0.3)] flex flex-col justify-between overflow-hidden group">
            {/* Header Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-minecraft text-[10px] uppercase font-bold tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.8)] flex items-center gap-1.5 mc-shadow">
                <Crown className="w-3.5 h-3.5 text-yellow-200" />
                SERVER OWNER
              </span>
            </div>

            {/* NameMC Link Button (Top Right) */}
            <div className="absolute top-4 right-4 z-20">
              <a
                href="https://namemc.com/profile/Not_Strategy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/75 hover:bg-black border border-zinc-700 hover:border-amber-500 text-zinc-300 hover:text-white font-minecraft text-[10px] transition-all backdrop-blur-md group/btn"
                title="View Not_Strategy Skin on NameMC"
              >
                <span>NameMC</span>
                <ExternalLink className="w-3 h-3 text-amber-400 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Inner Card Container */}
            <div className="relative h-full w-full rounded-3xl bg-[#090910] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              {/* Radial glow */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* 3D Model Viewport */}
              <div className="relative w-full flex items-center justify-center pt-8 pb-4">
                <MinecraftPlayer3D
                  skinUrl="/images/not_strategy_skin.png"
                  username="Not_Strategy"
                  roleBadge="OWNER"
                  badgeColor="amber"
                  height={380}
                  interactive={true}
                />
              </div>

              {/* Bio & Details */}
              <div className="pt-4 border-t border-amber-500/20 space-y-4 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-minecraft font-bold text-white uppercase mc-shadow">
                        Not_Strategy
                      </h3>
                      <MinecraftEmoji name="nether_star" size={20} glow="gold" />
                    </div>
                    <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                      Server Owner & Operations Executive
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/50 border border-amber-500/30 text-[11px] font-mono text-amber-300 self-start sm:self-center">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>ACTIVE DIRECTING</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Co-Owner and executive director of BrutalMC. Leads overall gameplay balance, blood-shard progression meta, community tournament prize pools, and financial operations.
                </p>

                {/* Specialties Pill Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                  <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
                    <div className="text-[10px] font-minecraft text-zinc-400 uppercase">DIRECTOR</div>
                    <div className="text-xs font-minecraft font-bold text-white mt-0.5">OPERATIONS</div>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
                    <div className="text-[10px] font-minecraft text-zinc-400 uppercase">COMMUNITY</div>
                    <div className="text-xs font-minecraft font-bold text-amber-400 mt-0.5">TOURNAMENTS</div>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-minecraft text-zinc-400 uppercase">BALANCE</div>
                    <div className="text-xs font-minecraft font-bold text-yellow-400 mt-0.5">ECONOMY META</div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <a
                    href="https://namemc.com/profile/Not_Strategy"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-2 text-xs font-minecraft text-amber-400 hover:text-amber-300 font-bold transition-colors group/link"
                  >
                    <span>VERIFIED NAMEMC SKIN & HISTORY</span>
                    <ExternalLink className="w-3.5 h-3.5 group-link/hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
