"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import Navbar from "@/components/Navbar";
import GameModes from "@/components/GameModes";
import ServerExperience from "@/components/ServerExperience";
import Progression from "@/components/Progression";
import Footer from "@/components/Footer";
import PlayModal from "@/components/PlayModal";
import { ChevronRight, Swords } from "lucide-react";

export default function SurvivalPage() {
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#050508] text-white selection:bg-red-600/30 selection:text-white overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-radial from-red-950/20 via-transparent to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-15 bg-[radial-gradient(#ff0033_1px,transparent_1px)] [background-size:32px_32px]"
          aria-hidden="true"
        />
      </div>

      {/* Global Navigation */}
      <Navbar onPlayClick={() => setIsPlayModalOpen(true)} />

      {/* Page Header & Breadcrumb */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-red-500 font-bold">SURVIVAL SMP</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-200">CUSTOM WORLD</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playPower();
                setIsPlayModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 font-mono font-bold text-xs uppercase tracking-wider text-white shadow-[0_0_15px_rgba(255,0,51,0.4)] transition-all flex items-center gap-1.5"
            >
              <Swords className="w-3.5 h-3.5" />
              <span>CONNECT NOW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 flex flex-col space-y-4">
        {/* Flagship Custom World Features */}
        <GameModes onPlayClick={() => setIsPlayModalOpen(true)} />

        {/* Server Performance & BDIX Low Latency Architecture */}
        <ServerExperience />

        {/* Progression, Economy & Blood Shards */}
        <Progression />
      </div>

      {/* Footer */}
      <Footer />

      {/* Play / How to Join Modal */}
      <PlayModal isOpen={isPlayModalOpen} onClose={() => setIsPlayModalOpen(false)} />
    </main>
  );
}
