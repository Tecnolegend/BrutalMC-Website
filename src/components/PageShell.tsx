"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayModal from "@/components/PlayModal";

/** Shared page frame (navigation, footer, join pop-up) for pages whose content is rendered on the server. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  return (
    <main className="relative min-h-screen bg-[#050508] text-white selection:bg-red-600/30 selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-radial from-red-950/20 via-transparent to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-15 bg-[radial-gradient(#ff0033_1px,transparent_1px)] [background-size:32px_32px]"
          aria-hidden="true"
        />
      </div>
      <Navbar onPlayClick={() => setIsPlayModalOpen(true)} />
      <div className="relative z-10">{children}</div>
      <Footer />
      <PlayModal isOpen={isPlayModalOpen} onClose={() => setIsPlayModalOpen(false)} />
    </main>
  );
}
