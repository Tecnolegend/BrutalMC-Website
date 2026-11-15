"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Zap, CheckCircle2, Terminal } from "lucide-react";

export default function ServerExperience() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "SERVER UPTIME", value: "24/7", sub: "99.98% High Availability" },
    { label: "CUSTOM EXPERIENCE", value: "100%", sub: "Exclusive Plugins & Systems" },
    { label: "AVERAGE TPS", value: "20.0", sub: "Lag-Free BDIX Fiber" },
    { label: "POSSIBILITIES", value: "∞", sub: "Dynamic Seasonal Updates" },
  ];

  const highlights = [
    {
      title: "CUSTOM SYSTEMS",
      desc: "Proprietary plugins engineered from scratch — no generic leaked public plugins or lag-inducing bloat.",
    },
    {
      title: "CUSTOM WORLD",
      desc: "Handcrafted terrain with colossal dungeons, custom structures, and secret boss arenas waiting to be conquered.",
    },
    {
      title: "COMPETITIVE GAMEPLAY",
      desc: "Fair, balanced PvP meta with calibrated hitboxes, custom knockback profiles, and anti-cheat enforcement.",
    },
    {
      title: "POWERFUL PERFORMANCE",
      desc: "Hosted on dedicated enterprise Ryzen 9 7950X hardware with local BDIX routing for single-digit ping across Bangladesh.",
    },
    {
      title: "ACTIVE DEVELOPMENT",
      desc: "Weekly content drops, community-driven balance patches, and direct developer communication in Discord.",
    },
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] overflow-hidden"
    >
      {/* Background Cyber Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Cinematic Visual Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-br from-red-600/40 via-zinc-800 to-zinc-900 shadow-[0_0_50px_rgba(255,0,51,0.25)] group">
              <div className="relative rounded-3xl bg-[#0a0a12] overflow-hidden">
                {/* Visual */}
                <div className="relative h-[380px] sm:h-[480px] w-full">
                  <Image
                    src="/images/spawn_cathedral.jpg"
                    alt="BrutalMC Architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/40 to-transparent" />

                  {/* High Tech Overlay Badges */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-red-500/30 text-xs font-mono text-zinc-300">
                      <Terminal className="w-3.5 h-3.5 text-red-500" />
                      <span>BDIX HIGH-SPEED CORE</span>
                    </div>
                  </div>

                  {/* Bottom Stats floating panel */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3.5 sm:p-4 rounded-2xl bg-black/85 backdrop-blur-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">SERVER REGION</div>
                      <div className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                        Dhaka, BD (Equinix Core)
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">LOCAL LATENCY</div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">10-18ms BDIX</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Highlights & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5" />
              THE BRUTALMC STANDARD
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-sans leading-tight">
              NOT YOUR AVERAGE <span className="text-red-500">MINECRAFT SERVER</span>
            </h2>

            <p className="text-zinc-400 text-base leading-relaxed">
              We started BrutalMC because we were tired of pay-to-win servers,
              laggy overseas hosting, and copy-paste gameplay. BrutalMC was designed
              from day one to challenge the status quo with unmatched performance and
              hardcore competitive depth.
            </p>

            {/* Highlights List */}
            <div className="space-y-3.5 pt-2">
              {highlights.map((hl) => (
                <div
                  key={hl.title}
                  className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-red-500/40 hover:bg-zinc-900/70 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-sm font-bold text-zinc-200 group-hover:text-white font-mono uppercase tracking-wide">
                        {hl.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {hl.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Animated Statistics Counter Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-zinc-900">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-[#09090f] border border-zinc-800/80 hover:border-red-500/30 transition-all duration-300 text-center flex flex-col items-center justify-center group"
            >
              <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-red-400 font-mono tracking-tight group-hover:scale-105 transition-transform">
                {inView ? stat.value : "..."}
              </span>
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mt-2">
                {stat.label}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
