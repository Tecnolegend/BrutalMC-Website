"use client";

import React from "react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import { MessageSquare, Users, Radio, Shield, ArrowUpRight } from "lucide-react";
import { DISCORD_URL } from "@/lib/site";

export default function Community() {
  const communityStats = [
    { label: "DISCORD COMMUNITY", value: "Verified", sub: "Active Support & Announcements" },
    { label: "CUSTOM WORLD", value: "100%", sub: "Handcrafted Biomes & Terrain" },
    { label: "BDIX ROUTING", value: "<15ms", sub: "Domestic Low-Latency in BD" },
    { label: "VOICE CHANNELS", value: "Active", sub: "Daily Player Voice Squads" },
  ];

  return (
    <section id="community" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07070a] overflow-hidden">
      {/* Subtle Red & Indigo Glow for Discord integration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-red-600/10 via-[#5865F2]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Banner Card */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-red-600/50 via-zinc-800 to-[#5865F2]/50 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <div className="relative rounded-3xl bg-[#0a0a14] p-5 sm:p-10 lg:p-16 overflow-hidden">
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading & Call to Action */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
                  <Users className="w-3.5 h-3.5" />
                  BANGLADESH&apos;S PREMIER SURVIVAL GUILD
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                  JOIN THE <span className="text-red-500">COMMUNITY.</span>
                </h1>

                <p className="text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Connect with fellow adventurers, recruit allies for your Survival SMP town,
                  trade rare artifacts, report bugs, and chat with the founder Tecnolegend
                  directly in our official Discord.
                </p>

                {/* Discord Button */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playPower()}
                    className="relative group w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#5865F2] hover:bg-[#4752C4] shadow-[0_0_30px_rgba(88,101,242,0.45)] hover:shadow-[0_0_40px_rgba(88,101,242,0.7)] transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                    <span>JOIN OUR DISCORD</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right Column: Authentic Discord Server Card */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="w-full max-w-md rounded-2xl bg-zinc-950/80 border border-zinc-800/80 p-5 sm:p-6 backdrop-blur-xl shadow-2xl relative flex flex-col gap-4">
                  {/* Card Header */}
                  <div className="flex items-center gap-3.5 border-b border-zinc-800/80 pb-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-red-500/40 p-0.5 bg-gradient-to-br from-red-950 to-black shrink-0">
                      <Image
                        src="/images/logo.webp"
                        alt="BrutalMC dragon logo"
                        width={48}
                        height={48}
                        className="object-contain w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-white text-base truncate">
                          BrutalMC Network
                        </h4>
                        <Shield className="w-4 h-4 text-[#5865F2] fill-[#5865F2] shrink-0" />
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-0.5">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                          <span className="text-zinc-300">840 Online</span>
                        </span>
                        <span>•</span>
                        <span>3,420 Members</span>
                      </div>
                    </div>
                  </div>

                  {/* Server Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Official Discord community for Bangladesh&apos;s #1 Custom World Survival SMP. Form towns, trade blood shards, view announcements, and connect with staff.
                  </p>

                  {/* Live Voice Status */}
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Radio className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                      <span>Active Voice Squads</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                      12 Rooms Active
                    </span>
                  </div>

                  {/* Join Link */}
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playPower()}
                    className="w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] font-mono font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5865F2]/20"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>ACCEPT DISCORD INVITE</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Community Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-zinc-800/80">
              {communityStats.map((item) => (
                <div key={item.label} className="text-left p-2.5 sm:p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase block truncate">
                    {item.label}
                  </span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black font-sans text-white tracking-tight mt-0.5 block">
                    {item.value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 block line-clamp-1">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
