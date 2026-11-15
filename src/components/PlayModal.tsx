"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  X,
  Copy,
  Check,
  Gamepad2,
  Smartphone,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Zap,
} from "lucide-react";
import { DISCORD_URL, SERVER_IP } from "@/lib/site";

interface PlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayModal({ isOpen, onClose }: PlayModalProps) {
  const [activeTab, setActiveTab] = useState<"java" | "bedrock" | "clients">("java");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const serverIP = SERVER_IP;
  const bedrockPort = "19132";

  const handleCopy = (text: string, fieldId: string) => {
    sound.playSuccess();
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedField(fieldId);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.5 },
        colors: ["#ff0033", "#f43f5e", "#ffffff", "#f59e0b"],
      });
    } catch {}

    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={() => {
          sound.playClick();
          onClose();
        }}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-[1px] bg-gradient-to-b from-red-500/50 via-zinc-800 to-red-900/30 shadow-[0_0_60px_rgba(255,0,51,0.35)] z-10 my-auto animate-in zoom-in-95 duration-200">
        <div className="relative bg-[#09090f] rounded-3xl p-5 sm:p-8 overflow-hidden text-zinc-100">
          {/* Subtle glowing ambient behind modal */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-white transition-all"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1 mb-6 pr-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-[10px] font-minecraft tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              JOIN BRUTALMC NETWORK
            </div>
            <h3 className="text-xl sm:text-2xl font-minecraft font-bold uppercase tracking-tight text-white mc-shadow">
              HOW TO <span className="text-red-500">CONNECT</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Low ping BDIX network serving all of Bangladesh & global players 24/7.
            </p>
          </div>

          {/* Edition Selection Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 mb-6">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("java");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeTab === "java"
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Java Edition (PC)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("bedrock");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeTab === "bedrock"
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Bedrock & Mobile</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("clients");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeTab === "clients"
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Recommended Clients</span>
            </button>
          </div>

          {/* Tab 1: Java Edition */}
          {activeTab === "java" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Server IP box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-minecraft text-zinc-400 uppercase tracking-wider block">
                    SERVER ADDRESS (IP)
                  </span>
                  <span className="text-base sm:text-lg font-minecraft font-bold text-white tracking-wider mc-shadow">
                    {serverIP}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(serverIP, "java-ip")}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-minecraft text-xs uppercase tracking-wider transition-all ${
                    copiedField === "java-ip"
                      ? "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      : "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(255,0,51,0.3)]"
                  }`}
                >
                  {copiedField === "java-ip" ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Step by step guide */}
              <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <p className="font-semibold text-zinc-200">How to join in 3 easy steps:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-zinc-400">
                  <li>
                    Launch Minecraft Java Edition (Version <strong className="text-zinc-200">1.8.9 to 1.21.x</strong>).
                  </li>
                  <li>Click <strong className="text-zinc-200">Multiplayer</strong> &rarr; <strong className="text-zinc-200">Add Server</strong>.</li>
                  <li>Enter Server Name as <strong className="text-zinc-200">BrutalMC</strong> and Server Address as <strong className="text-red-400 font-mono">play.brutalmc.xyz</strong>, then hit <strong className="text-zinc-200">Done</strong> and connect!</li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Both Premium (official Microsoft accounts) and Offline / Cracked launchers (PojavLauncher, TLauncher, Prism) are supported.
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Bedrock & Mobile */}
          {activeTab === "bedrock" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Server IP & Port */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-black/60 border border-red-500/30 flex flex-col justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-minecraft text-zinc-400 uppercase tracking-wider block">
                      SERVER ADDRESS
                    </span>
                    <span className="text-sm sm:text-base font-minecraft font-bold text-white tracking-wider mc-shadow">
                      {serverIP}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(serverIP, "bedrock-ip")}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-minecraft text-xs uppercase tracking-wider transition-all ${
                      copiedField === "bedrock-ip"
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                    }`}
                  >
                    {copiedField === "bedrock-ip" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === "bedrock-ip" ? "Copied" : "Copy IP"}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-red-500/30 flex flex-col justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-minecraft text-zinc-400 uppercase tracking-wider block">
                      PORT NUMBER
                    </span>
                    <span className="text-sm sm:text-base font-minecraft font-bold text-red-400 tracking-wider mc-shadow">
                      {bedrockPort}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(bedrockPort, "bedrock-port")}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-minecraft text-xs uppercase tracking-wider transition-all ${
                      copiedField === "bedrock-port"
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                    }`}
                  >
                    {copiedField === "bedrock-port" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === "bedrock-port" ? "Copied" : "Copy Port"}</span>
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <p className="font-semibold text-zinc-200">How to join on Bedrock / Android / iOS / Windows 10:</p>
                <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                  <li>Open Minecraft Bedrock Edition.</li>
                  <li>Click <strong className="text-zinc-200">Play</strong> &rarr; <strong className="text-zinc-200">Servers</strong> tab.</li>
                  <li>Scroll to the bottom and click <strong className="text-zinc-200">Add Server</strong>.</li>
                  <li>Set Server Name to <strong className="text-zinc-200">BrutalMC</strong>, IP to <strong className="text-red-400 font-mono">play.brutalmc.xyz</strong>, and Port to <strong className="text-red-400 font-mono">19132</strong>.</li>
                  <li>Click <strong className="text-zinc-200">Play</strong> or Save!</li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200/90">
                Tip: Console players (PS5, Xbox, Switch) can connect using BedrockTogether or MC Server Connector apps from Google Play or App Store.
              </div>
            </div>
          )}

          {/* Tab 3: Recommended Clients */}
          {activeTab === "clients" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center justify-between">
                      Lunar Client
                      <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">Best FPS</span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Highest FPS boost for PvP, 1.8.9 & 1.20+ support, built-in keystrokes and motion blur.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center justify-between">
                      Badlion Client
                      <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">Popular</span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Full custom anticheat integration, waypoint markers, ArmorHUD, and crosshair customizer.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center justify-between">
                      Feather Client
                      <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded">Modded</span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Modern launcher with Fabric and Forge support, built-in voice chat, and shaders.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center justify-between">
                      PojavLauncher (Mobile)
                      <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded">Android/iOS</span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Play real Java Edition directly on your smartphone with customized touchscreen controls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Assistance */}
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              <HelpCircle className="w-4 h-4 text-red-400" />
              <span>Need help connecting or experiencing high ping?</span>
            </div>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold transition-colors"
            >
              <span>Get 24/7 Discord Support</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
