"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import dynamic from "next/dynamic";
import ServerStatus from "./ServerStatus";
import { Copy, Check, Swords, MessageSquare, ChevronDown, Sparkles } from "lucide-react";
import { DISCORD_URL, SERVER_IP } from "@/lib/site";

const TecnoLegend3D = dynamic(() => import("./TecnoLegend3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] sm:h-[480px] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin" />
    </div>
  ),
});

interface HeroProps {
  onPlayClick: () => void;
}

export default function Hero({ onPlayClick }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const serverIP = SERVER_IP;

  const handleCopyIP = () => {
    sound.playSuccess();
    navigator.clipboard?.writeText(serverIP).catch(() => {});
    setCopied(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#ff0033", "#e11d48", "#ffffff", "#f59e0b"],
      });
    } catch {}

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 my-auto">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Esports Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-red-950/70 via-black to-red-950/40 border border-red-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,0,51,0.2)] animate-pulse">
            <span className="flex h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-200 uppercase">
              #1 CUSTOM WORLD SURVIVAL SMP IN BANGLADESH
            </span>
          </div>

          {/* Main Title */}
          <div className="relative">
            <h1 className="text-5xl sm:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter uppercase font-sans select-none leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                BRUTAL
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-red-500 drop-shadow-[0_0_35px_rgba(255,0,51,0.8)]">
                MC
              </span>
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-red-600 to-transparent mt-2 rounded-full hidden lg:block" />
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl font-semibold text-zinc-200 tracking-wide font-sans">
            Bangladesh&apos;s Premier Custom World Survival SMP
          </p>

          {/* Description */}
          <p className="text-xs sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Explore a handcrafted, custom-generated Minecraft world packed with mythical
            dungeons, custom dragon boss fights, clan warfare & fortresses, dynamic player economy,
            and active community events. 100% custom survival experience.
          </p>

          {/* Server Connection Bar with 1-Click Copy */}
          <div className="w-full max-w-md p-1.5 sm:p-2 rounded-xl bg-black/60 border border-red-500/30 backdrop-blur-xl flex items-center justify-between shadow-[0_0_25px_rgba(255,0,51,0.15)] group hover:border-red-500/60 transition-all duration-300">
            <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <div className="flex flex-col text-left min-w-0">
                <span className="text-[10px] font-minecraft text-zinc-400 uppercase tracking-wider">
                  SERVER IP ADDRESS
                </span>
                <span className="font-minecraft font-bold text-xs sm:text-base text-white tracking-wide truncate mc-shadow">
                  {serverIP}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyIP}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shrink-0 ${
                copied
                  ? "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  : "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(255,0,51,0.4)]"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy IP</span>
                </>
              )}
            </button>
          </div>

          {/* Primary & Secondary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={() => {
                sound.playPower();
                onPlayClick();
              }}
              className="relative group w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,0,51,0.45)] hover:shadow-[0_0_45px_rgba(255,0,51,0.8)] active:scale-95 overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 transition-all duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                <Swords className="w-4 h-4 text-amber-300" />
                PLAY NOW
              </span>
            </button>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest text-zinc-200 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-red-500/40 backdrop-blur-md transition-all duration-300 hover:text-white flex items-center justify-center gap-2 group"
            >
              <MessageSquare className="w-4 h-4 text-[#5865F2] group-hover:scale-110 transition-transform" />
              JOIN DISCORD
            </a>
          </div>

          {/* Features highlight micro-badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-400" /> Custom Ender Dragon
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-400" /> Handcrafted World Gen
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-400" /> Low Latency BDIX
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-400" /> Java + Bedrock
            </span>
          </div>
        </div>

        {/* Right Column: 3D TecnoLegend Centerpiece */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          {/* Radial Aura Behind Character */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-radial from-red-600/30 via-red-950/20 to-transparent blur-3xl pointer-events-none" />

          {/* 3D TecnoLegend Interactive Model */}
          <div className="w-full relative z-10">
            <TecnoLegend3D />
          </div>
        </div>
      </div>

      {/* Floating Live Server Status Widget below hero */}
      <div className="max-w-7xl mx-auto w-full z-10 pt-10">
        <ServerStatus onJoinClick={onPlayClick} />
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors pointer-events-auto">
        <span className="text-[10px] font-mono tracking-widest uppercase">
          SCROLL TO EXPLORE
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-red-500" />
      </div>
    </section>
  );
}
