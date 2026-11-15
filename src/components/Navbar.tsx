"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX, Menu, X, Shield, Sparkles, ShoppingBag, Flame } from "lucide-react";
import MinecraftEmoji from "@/components/MinecraftEmoji";
import { DISCORD_URL } from "@/lib/site";

interface NavbarProps {
  onPlayClick: () => void;
}

interface NavLinkItem {
  name: string;
  href: string;
  isPage?: boolean;
  badge?: string;
  badgeType?: "amber" | "sky";
  icon?: React.ComponentType<{ className?: string }>;
}

export default function Navbar({ onPlayClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Read the saved mute setting after mount (avoids a server/client mismatch)
  useEffect(() => {
    const t = setTimeout(() => setIsMuted(sound.getMuted()), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const navLinks: NavLinkItem[] = [
    { name: "Home", href: "/" },
    {
      name: "Dragons",
      href: "/dragons",
      isPage: true,
      badge: "BOSS",
      badgeType: "sky",
      icon: Flame,
    },
    { name: "Survival SMP", href: "/survival" },
    { name: "Leaderboards", href: "/leaderboards" },
    { name: "Ranks", href: "/ranks" },
    {
      name: "Store",
      href: "/store",
      isPage: true,
      badge: "BKASH/NAGAD",
      badgeType: "amber",
      icon: ShoppingBag,
    },
    { name: "Events", href: "/events" },
    { name: "Staff", href: "/staff" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Community", href: "/community" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070709]/85 backdrop-blur-xl border-b border-red-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-red-500/40 p-1 bg-gradient-to-br from-red-950/60 to-black group-hover:border-red-500 group-hover:shadow-[0_0_15px_rgba(255,0,51,0.5)] transition-all duration-300">
              <Image
                src="/images/logo.webp"
                alt="BrutalMC dragon logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-minecraft text-base sm:text-xl tracking-wider text-white uppercase mc-shadow">
                  Brutal<span className="text-red-500">MC</span>
                </span>
                <span className="px-1.5 py-0.5 text-[8px] font-minecraft font-bold bg-red-600/30 border border-red-500/40 text-red-400 rounded">
                  BD
                </span>
              </div>
              <span className="text-[9px] font-minecraft text-zinc-400 tracking-wider hidden sm:inline">
                CUSTOM SURVIVAL SMP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((link) => {
              if (link.isPage) {
                const Icon = link.icon;
                const isSky = link.badgeType === "sky";
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => sound.playHover()}
                    onClick={() => sound.playClick()}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors relative group flex items-center gap-1.5 rounded-lg ${
                      isSky
                        ? "text-sky-300 hover:text-sky-200 bg-sky-950/30 border border-sky-500/30"
                        : "text-amber-300 hover:text-amber-200 bg-amber-950/30 border border-amber-500/30"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isSky ? "text-sky-400 animate-pulse" : "text-amber-400"
                        }`}
                      />
                    )}
                    <span>{link.name}</span>
                    <span
                      className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold ${
                        isSky
                          ? "bg-sky-500/20 text-sky-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {link.badge}
                    </span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Audio + Play Now */}
          <div className="hidden xl:flex items-center gap-3">
            <button
              onClick={toggleAudio}
              title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500/40 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-red-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => {
                sound.playPower();
                onPlayClick();
              }}
              className="relative group overflow-hidden px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,0,51,0.35)] hover:shadow-[0_0_30px_rgba(255,0,51,0.7)] active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-1.5 font-minecraft text-[11px] mc-shadow">
                <MinecraftEmoji name="netherite_sword" size={16} glow="gold" />
                PLAY NOW
              </span>
            </button>
          </div>

          {/* Tablet & Mobile Controls (visible < xl) */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={toggleAudio}
              title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-400" />}
            </button>

            {/* Quick Play button on tablet / medium mobile */}
            <button
              onClick={() => {
                sound.playPower();
                onPlayClick();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,51,0.4)] transition-all"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>PLAY</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg bg-zinc-900/90 border border-red-500/30 text-zinc-200 hover:border-red-500/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (visible on mobile and tablet) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden bg-black/95 backdrop-blur-2xl flex flex-col pt-24 px-5 pb-8 overflow-y-auto max-h-screen border-b border-red-500/20 animate-in fade-in slide-in-from-top-4 duration-200">
          {/* Quick Action Tiles */}
          <div className="grid grid-cols-2 gap-2.5 mb-5 shrink-0">
            <Link
              href="/dragons"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-gradient-to-br from-sky-950/60 to-black border border-sky-500/40 text-left group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider block">
                  BOSS RAID
                </span>
                <span className="font-extrabold text-white text-sm flex items-center gap-1 mt-0.5">
                  <Flame className="w-4 h-4 text-sky-400" />
                  DRAGONS
                </span>
              </div>
              <span className="text-sky-400 text-xs group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>

            <Link
              href="/store"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-gradient-to-br from-amber-950/60 to-black border border-amber-500/40 text-left group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  BKASH / NAGAD
                </span>
                <span className="font-extrabold text-white text-sm flex items-center gap-1 mt-0.5">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  STORE
                </span>
              </div>
              <span className="text-amber-400 text-xs group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              sound.playPower();
              setMobileMenuOpen(false);
              onPlayClick();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,51,0.5)] flex items-center justify-center gap-2 mb-4 shrink-0 active:scale-98"
          >
            <Shield className="w-4 h-4" />
            PLAY NOW — play.brutalmc.xyz
          </button>

          {/* Discord CTA in Mobile Menu */}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playPower()}
            className="w-full py-2.5 px-4 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/40 hover:bg-[#5865F2]/30 text-white text-xs font-mono font-bold flex items-center justify-between mb-4 shrink-0 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              JOIN OFFICIAL DISCORD
            </span>
            <span className="text-sky-300">discord.gg/ajWpM274GG →</span>
          </a>

          {/* Nav Links List */}
          <div className="flex flex-col divide-y divide-zinc-900/80 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-base font-semibold text-zinc-200 hover:text-red-400 py-2.5 flex items-center justify-between transition-colors"
              >
                <span>{link.name}</span>
                <span className="text-zinc-600 text-xs font-mono">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

