"use client";

import React from "react";
import Image from "next/image";

interface BrutalLogoProps {
  size?: number;
  className?: string;
}

export default function BrutalLogo({ size = 40, className = "" }: BrutalLogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-xl overflow-hidden border border-red-500/40 p-0.5 bg-gradient-to-br from-red-950/60 to-black group-hover:border-red-500 group-hover:shadow-[0_0_15px_rgba(255,0,51,0.5)] transition-all duration-300 shrink-0 ${className}`}
    >
      <Image
        src="/images/logo.png"
        alt="BrutalMC Emblem"
        width={size}
        height={size}
        className="w-full h-full object-contain rounded-lg"
        priority
      />
    </div>
  );
}
