"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { HelpCircle, ChevronDown, Sparkles, Shield, CreditCard, Wifi, Swords, Flame } from "lucide-react";
import { DISCORD_URL } from "@/lib/site";
import { FAQS } from "@/lib/faqs";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const icons: Record<string, React.ReactNode> = {
  "CONNECTIVITY": <Wifi className="w-4 h-4 text-emerald-400" />,
  "PLATFORMS": <Sparkles className="w-4 h-4 text-cyan-400" />,
  "GAMEPLAY": <Swords className="w-4 h-4 text-red-400" />,
  "BOSS RAIDS": <Flame className="w-4 h-4 text-purple-400" />,
  "TOURNAMENTS": <Shield className="w-4 h-4 text-amber-400" />,
  "STORE & DONATIONS": <CreditCard className="w-4 h-4 text-rose-400" />,
  "SECURITY": <Shield className="w-4 h-4 text-indigo-400" />,
  };
  const faqs: FAQItem[] = FAQS.map((f) => ({ ...f, icon: icons[f.category] }));

  const toggleAccordion = (idx: number) => {
    sound.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-radial from-red-950/20 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            NEED <span className="text-red-500">ANSWERS?</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            Everything you need to know about joining BrutalMC, competitive rules, BDIX connectivity, and local payments.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-zinc-900/70 border-red-500/40 shadow-[0_4px_25px_rgba(255,0,51,0.15)]"
                    : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 flex items-center justify-between gap-4 text-left transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2 rounded-lg border transition-colors ${
                        isOpen
                          ? "bg-red-500/10 border-red-500/30"
                          : "bg-zinc-900 border-zinc-800"
                      }`}
                    >
                      {faq.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-red-400 block uppercase font-bold">
                        {faq.category}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                        {faq.question}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-red-600 text-white border-red-500" : "text-zinc-400 bg-zinc-900"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-zinc-800/60 mt-1 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900/60 to-zinc-950 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-white text-base">Have more questions or need technical support?</h4>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Our staff team and community mods are available 24/7 in our Discord tickets.
            </p>
          </div>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-xs uppercase tracking-wider text-white shadow-[0_0_15px_rgba(255,0,51,0.35)] transition-all shrink-0"
          >
            Open Discord Ticket
          </a>
        </div>
      </div>
    </section>
  );
}
