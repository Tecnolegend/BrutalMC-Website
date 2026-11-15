"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { DISCORD_URL } from "@/lib/site";
import { Calendar, Clock, Trophy, Users, Bell, Swords, ArrowRight } from "lucide-react";

interface EventItem {
  id: string;
  name: string;
  type: string;
  // Weekly schedule in Bangladesh time (UTC+6). weekday: 0 = Sunday ... 6 = Saturday
  weekday: number;
  hour: number;
  minute: number;
  prize: string;
  participants: string;
  desc: string;
  badgeColor: string;
}

const EVENTS: EventItem[] = [
  {
    id: "town-build-contest",
    name: "COMMUNITY MEGA-BUILD & TOWN SHOWCASE",
    type: "SURVIVAL BUILDING",
    weekday: 6,
    hour: 20,
    minute: 0,
    prize: "৳ 10,000 BDT + Overlord Rank",
    participants: "Town Guilds & Solo Builders",
    desc: "Guilds and players showcase their custom world mega-bases and towns. Judged live on stream for aesthetics, architecture, and lore.",
    badgeColor: "bg-emerald-600/30 border-emerald-500/50 text-emerald-400",
  },
  {
    id: "voidrax-raid",
    name: "WORLD BOSS RAID: VOIDRAX",
    type: "COMMUNITY RAID",
    weekday: 0,
    hour: 21,
    minute: 30,
    prize: "Guaranteed Mythic Relics + 5,000 Shards",
    participants: "Server-Wide (Unlimited)",
    desc: "Assemble your town allies to conquer the 10,000,000 HP Void Titan in the custom dungeon arena. Epic siege weapons and mythic loot drops.",
    badgeColor: "bg-purple-600/30 border-purple-500/50 text-purple-400",
  },
  {
    id: "dungeon-expedition",
    name: "ANCIENT RUINS DUNGEON MARATHON",
    type: "DUNGEON EXPEDITION",
    weekday: 5,
    hour: 22,
    minute: 0,
    prize: "Legendary Socket Gems + Ancient Artifacts",
    participants: "4-Player Squads",
    desc: "Navigate through procedural labyrinth chambers, disarm poison dart traps, and slay the Nether Warden boss in record time.",
    badgeColor: "bg-red-600/30 border-red-500/50 text-red-400",
  },
  {
    id: "dragon-hunt",
    name: "ENDER DRAGON RESPAWN & ELYTRA HUNT",
    type: "SERVER-WIDE EVENT",
    weekday: 0,
    hour: 19,
    minute: 0,
    prize: "৳ 3,000 BDT + Hero Rank",
    participants: "Open to All Players",
    desc: "Custom parkour obstacle gauntlet with moving magma blocks, slime launchers, and laser tripwires. Fastest timestamp wins.",
    badgeColor: "bg-emerald-600/30 border-emerald-500/50 text-emerald-400",
  },
];

const BD_OFFSET_MS = 6 * 60 * 60 * 1000; // Bangladesh Standard Time, UTC+6

// Next start time (ms since epoch) of a weekly event, from Bangladesh-time schedule.
function nextOccurrence(ev: EventItem, now: number): number {
  const bdNow = new Date(now + BD_OFFSET_MS); // shifted so UTC getters read BD time
  const target = new Date(bdNow);
  target.setUTCHours(ev.hour, ev.minute, 0, 0);
  let addDays = (ev.weekday - bdNow.getUTCDay() + 7) % 7;
  if (addDays === 0 && target.getTime() <= bdNow.getTime()) addDays = 7;
  target.setUTCDate(target.getUTCDate() + addDays);
  return target.getTime() - BD_OFFSET_MS;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-GB", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(ev: EventItem): string {
  const h12 = ev.hour % 12 === 0 ? 12 : ev.hour % 12;
  const ampm = ev.hour < 12 ? "AM" : "PM";
  return `${h12}:${String(ev.minute).padStart(2, "0")} ${ampm} BST (UTC+6) · Weekly`;
}

export default function Events() {
  const [nextStart, setNextStart] = useState<Record<string, number>>({});


  // Countdown timer hook for each event
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: { d: number; h: number; m: number; s: number } }>({});

  useEffect(() => {
    const updateCountdowns = () => {
      const now = Date.now();
      const updated: { [key: string]: { d: number; h: number; m: number; s: number } } = {};

      const starts: Record<string, number> = {};

      EVENTS.forEach((ev) => {
        const start = nextOccurrence(ev, now);
        starts[ev.id] = start;
        const diff = Math.max(0, start - now);
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        updated[ev.id] = { d, h, m, s };
      });

      setTimeLeft(updated);
      setNextStart(starts);
    };

    const first = setTimeout(updateCountdowns, 0);
    const interval = setInterval(updateCountdowns, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="events" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] overflow-hidden">
      {/* Red ambient lighting */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-radial from-red-600/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Swords className="w-3.5 h-3.5" />
            COMPETITIVE CALENDAR
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans">
            BRUTALMC <span className="text-red-500">EVENTS.</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg">
            Compete in weekly scheduled server tournaments with live commentators,
            cash prizes in Bangladeshi Taka (৳ BDT), and eternal prestige.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EVENTS.map((ev) => {
            const time = timeLeft[ev.id] || { d: 0, h: 0, m: 0, s: 0 };
            return (
              <div
                key={ev.id}
                onMouseEnter={() => sound.playHover()}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-zinc-700 via-zinc-900 to-black hover:from-red-500 hover:via-rose-600 hover:to-red-950 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(255,0,51,0.3)]"
              >
                <div className="relative h-full w-full rounded-3xl bg-[#09090f] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Top Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${ev.badgeColor}`}
                      >
                        {ev.type}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <Users className="w-3.5 h-3.5 text-red-500" />
                        <span>{ev.participants}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black uppercase tracking-wide text-white group-hover:text-red-400 transition-colors font-sans mb-3">
                      {ev.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                      {ev.desc}
                    </p>

                    {/* Prize Banner */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/60 via-zinc-900 to-black border border-red-500/30 flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-400 animate-pulse" />
                        <div>
                          <div className="text-[10px] font-mono text-zinc-400 uppercase">PRIZE POOL</div>
                          <div className="text-sm font-bold text-amber-300 font-mono">
                            {ev.prize}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Countdown Display */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-red-400" />
                          <span>STARTS IN:</span>
                        </span>
                        <span className="text-zinc-500">{formatTime(ev)}</span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center font-mono">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                          <div className="text-base sm:text-xl font-extrabold text-white">
                            {String(time.d).padStart(2, "0")}
                          </div>
                          <div className="text-[9px] text-zinc-500 uppercase">DAYS</div>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                          <div className="text-base sm:text-xl font-extrabold text-white">
                            {String(time.h).padStart(2, "0")}
                          </div>
                          <div className="text-[9px] text-zinc-500 uppercase">HOURS</div>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                          <div className="text-base sm:text-xl font-extrabold text-white">
                            {String(time.m).padStart(2, "0")}
                          </div>
                          <div className="text-[9px] text-zinc-500 uppercase">MINS</div>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                          <div className="text-base sm:text-xl font-extrabold text-red-400">
                            {String(time.s).padStart(2, "0")}
                          </div>
                          <div className="text-[9px] text-zinc-500 uppercase">SECS</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Calendar className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{nextStart[ev.id] ? formatDate(nextStart[ev.id]) : "Loading date..."}</span>
                    </div>

                    <a
                      href={DISCORD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playPower()}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,0,51,0.3)] bg-red-600 hover:bg-red-500 text-white"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>REGISTER ON DISCORD</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
