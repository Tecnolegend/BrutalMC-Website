"use client";

import React from "react";
import MinecraftEmoji, { MinecraftEmojiName } from "@/components/MinecraftEmoji";

export type MinecraftItemName = MinecraftEmojiName;

export interface MinecraftItemProps {
  name: MinecraftItemName;
  size?: number;
  className?: string;
  alt?: string;
  glow?: "purple" | "gold" | "red" | "cyan" | "emerald" | "none";
}

export default function MinecraftItem({
  name,
  size = 32,
  className = "",
  glow = "none",
}: MinecraftItemProps) {
  return (
    <MinecraftEmoji
      name={name}
      size={size}
      className={className}
      glow={glow}
    />
  );
}

export { MinecraftEmoji };
