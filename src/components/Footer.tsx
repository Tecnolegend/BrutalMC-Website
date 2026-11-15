"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sound } from "@/lib/sound";
import { ShieldAlert, MessageSquare, ArrowUp, ShoppingBag, CreditCard, Flame } from "lucide-react";
import { BkashIcon, NagadIcon } from "@/components/PaymentIcons";
import { DISCORD_URL, INSTAGRAM_URL, SERVER_IP, YOUTUBE_URL } from "@/lib/site";

export default function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#040406] text-zinc-400 border-t border-red-500/20 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-radial from-red-950/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand & Mission Statement (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-red-500/40 p-1 bg-gradient-to-br from-red-950/60 to-black">
                <Image
                  src="/images/logo.png"
                  alt="BrutalMC Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-minecraft text-xl tracking-wider text-white uppercase mc-shadow">
                    Brutal<span className="text-red-500">MC</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[8px] font-minecraft font-bold bg-red-600/30 border border-red-500/40 text-red-400 rounded">
                    BD
                  </span>
                </div>
                <span className="text-[9px] font-minecraft text-zinc-400 tracking-wider">
                  #1 BANGLADESH COMPETITIVE NETWORK
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Engineered from the ground up for high-octane competitive Minecraft.
              Low-latency domestic BDIX peering, proprietary anticheat systems, custom
              world survival mechanics, and community events.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-minecraft text-[10px]">SERVER IP:</span>
              <span className="font-minecraft text-white font-bold bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 text-[11px] mc-shadow">
                {SERVER_IP}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dragons"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="text-sky-300 hover:text-sky-200 transition-colors flex items-center gap-1 font-semibold"
                >
                  <Flame className="w-3.5 h-3.5 text-sky-400" />
                  <span>Dragon Bestiary & Shenron</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono">BOSS</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/survival"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 transition-colors"
                >
                  Survival SMP & Custom World
                </Link>
              </li>
              <li>
                <Link
                  href="/ranks"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 transition-colors"
                >
                  Ranks & Permissions
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 transition-colors"
                >
                  Rank Pricing & Matrix
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>VIP Store & Payments</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">BKASH</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/staff"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Staff Team & Leadership</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-red-600/20 text-red-400 font-mono">NEW</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 transition-colors"
                >
                  FAQ & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Competitive & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200">
              COMPETITIVE
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dragons"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="text-sky-300 hover:text-sky-200 transition-colors flex items-center gap-1 font-medium"
                >
                  <span>World Dragon Raids (/warp dragon)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboards"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 transition-colors"
                >
                  Leaderboards & Top K/D
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 transition-colors"
                >
                  BDT Cash Tournaments
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-amber-300 text-zinc-300 transition-colors flex items-center gap-1"
                >
                  <span>Store Ranks & Bundles</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-red-600/30 text-red-300 font-mono">bKash</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 transition-colors"
                >
                  Discord Community Guild
                </Link>
              </li>
              <li>
                <Link
                  href="/staff#apply"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:text-red-400 text-zinc-300 transition-colors flex items-center gap-1"
                >
                  <span>Staff Recruitment & Apply</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-600/30 text-emerald-300 font-mono">OPEN</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Community Links & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200">
              CONNECT
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#5865F2]" />
                <span>Discord Guild</span>
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube Channel</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-pink-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5 text-red-400" />
              <span>BACK TO TOP</span>
            </button>
          </div>
        </div>

        {/* Accepted Payment Methods Banner */}
        <div className="my-10 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <BkashIcon className="w-9 h-9 rounded-xl shadow-md ring-1 ring-white/10" />
              <NagadIcon className="w-9 h-9 rounded-xl shadow-md ring-1 ring-white/10" />
            </div>
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 justify-center sm:justify-start">
                <span>Official Supported Payments</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                  STAFF VERIFIED
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                bKash and Nagad Send Money — activated by staff after your TrxID is checked.
              </p>
            </div>
          </div>

          <Link
            href="/store"
            onClick={() => sound.playPower()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,51,0.4)] hover:shadow-[0_0_30px_rgba(255,0,51,0.6)] hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <CreditCard className="w-4 h-4" />
            <span>OPEN STORE & PAY</span>
          </Link>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <p className="text-zinc-400">
              © {new Date().getFullYear()} BrutalMC Network. All rights reserved. Crafted for Bangladeshi Gamers.
            </p>
            <p className="text-[11px] text-zinc-400 flex items-center justify-center md:justify-start gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>
                Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/faq" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <span className="text-zinc-400">•</span>
            <Link href="/faq" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-zinc-400">•</span>
            <Link href="/faq" className="hover:text-zinc-300 transition-colors">
              Server Rules
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
