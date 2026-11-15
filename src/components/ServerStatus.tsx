"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Copy, Check, Signal, Users, Layers, Sparkles, RefreshCw } from "lucide-react";
import { SERVER_IP } from "@/lib/site";

interface ServerStatusProps {
  onJoinClick?: () => void;
}

export default function ServerStatus({ onJoinClick }: ServerStatusProps) {
  const [online, setOnline] = useState<boolean | null>(null);
  const [playersOnline, setPlayersOnline] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(100);
  const [version, setVersion] = useState<string>("1.20+ Custom Survival");
  const [motd, setMotd] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const serverIP = SERVER_IP;

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.online) {
          setOnline(true);
          // Always use actual real count from the server, 0 if 0
          setPlayersOnline(typeof data.players?.online === "number" ? data.players.online : 0);
          setMaxPlayers(typeof data.players?.max === "number" ? data.players.max : 100);
          if (data.version) setVersion(data.version);
          if (data.motd?.clean && Array.isArray(data.motd.clean)) {
            setMotd(data.motd.clean.map((l: string) => l.trim()).filter(Boolean).join(" — "));
          }
        } else {
          setOnline(false);
          setPlayersOnline(0);
          setMaxPlayers(100);
        }
      } else {
        setOnline(false);
        setPlayersOnline(0);
      }
    } catch {
      setOnline(false);
      setPlayersOnline(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const first = setTimeout(fetchStatus, 0);
    // Live update every 30 seconds (skipped while the tab is in the background)
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchStatus();
    }, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    sound.playSuccess();
    navigator.clipboard?.writeText(serverIP).catch(() => {});
    setCopied(true);

    try {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.8 },
        colors: ["#ff0033", "#e11d48", "#ffffff"],
      });
    } catch {}

    setTimeout(() => setCopied(false), 2500);
  };

  const fillPercent = maxPlayers > 0 ? Math.min(100, Math.round((playersOnline / maxPlayers) * 100)) : 0;

  return (
    <div className="relative group w-full max-w-xl mx-auto rounded-2xl overflow-hidden p-[1px] bg-gradient-to-r from-red-500/30 via-zinc-800 to-red-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
      <div className="relative bg-[#09090f]/95 backdrop-blur-xl rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="relative flex h-3 w-3">
              {online === null ? (
                <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-500 animate-pulse" />
              ) : online ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
              )}
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase">
              LIVE SERVER STATUS:{" "}
              {loading ? (
                <span className="text-zinc-400 font-normal">Pinging...</span>
              ) : online ? (
                <span className="text-emerald-400 font-extrabold">ONLINE</span>
              ) : (
                <span className="text-amber-400 font-extrabold">MAINTENANCE / OFFLINE</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                sound.playClick();
                fetchStatus();
              }}
              title="Refresh live status"
              className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin text-red-400" : ""}`} />
            </button>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-zinc-400 bg-zinc-900/90 px-2 sm:px-2.5 py-1 rounded-md border border-zinc-800">
              <Signal className="w-3.5 h-3.5 text-emerald-400" />
              <span>BDIX Domestic Fiber</span>
            </div>
          </div>
        </div>

        {/* Middle Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {/* Players Online (REAL FROM API) */}
          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                <span>Real Players Online</span>
                <Users className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-white font-mono">
                  {playersOnline}
                </span>
                <span className="text-xs text-zinc-500 font-mono">/ {maxPlayers}</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${fillPercent}%` }}
              />
            </div>
          </div>

          {/* Server IP */}
          <div className="sm:col-span-2 bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium">
              <span>Server Address</span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                Java & Bedrock Crossplay
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wide truncate select-all">
                {serverIP}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 hover:text-white text-xs font-mono font-semibold transition-all duration-200 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy IP</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Live MOTD (if available) */}
        {motd && (
          <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-[11px] font-mono text-zinc-300 text-center truncate">
            <span className="text-red-400 font-bold mr-1.5">MOTD:</span>
            <span>{motd}</span>
          </div>
        )}

        {/* Footer Row: Version & Join CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <Layers className="w-4 h-4 text-red-500" />
            <span>Version: <strong className="text-zinc-200">{version}</strong></span>
          </div>

          {onJoinClick && (
            <button
              onClick={() => {
                sound.playPower();
                onJoinClick();
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-medium text-xs border border-zinc-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              How to Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
