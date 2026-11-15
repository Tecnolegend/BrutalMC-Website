"use client";

import React from "react";
import Image from "next/image";

export type MinecraftEmojiName =
  | "netherite_sword"
  | "diamond_sword"
  | "iron_sword"
  | "nether_star"
  | "totem_of_undying"
  | "golden_apple"
  | "enchanted_book"
  | "ender_eye"
  | "ender_pearl"
  | "emerald"
  | "diamond"
  | "gold_ingot"
  | "netherite_ingot"
  | "netherite_helmet"
  | "diamond_helmet"
  | "golden_helmet"
  | "dragon_breath"
  | "experience_bottle"
  | "fire_charge"
  | "elytra"
  | "heart_of_the_sea"
  | "recovery_compass_00"
  | "echo_shard"
  | "golden_shovel"
  | "creeper_face"
  | "creeper"
  | "hardcore_heart"
  | "survival_heart"
  | "heart"
  | "tnt"
  | "wither_skull"
  | "blood_shard"
  | "gold_coin"
  | "fire";

export interface MinecraftEmojiProps {
  name: MinecraftEmojiName | string;
  size?: number;
  className?: string;
  glow?: "purple" | "gold" | "red" | "cyan" | "emerald" | "none";
}

const GLOW_FILTERS: Record<string, string> = {
  purple: "drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]",
  gold: "drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]",
  red: "drop-shadow-[0_0_8px_rgba(255,0,51,0.7)]",
  cyan: "drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]",
  emerald: "drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]",
  none: "",
};

// Aliases mapping to available 16x16 PNG sprites in /public/images/minecraft/
const EMOJI_SPRITE_MAP: Record<string, string> = {
  // Combat & Weapons
  netherite_sword: "netherite_sword",
  diamond_sword: "diamond_sword",
  iron_sword: "iron_sword",
  nether_star: "nether_star",
  totem_of_undying: "totem_of_undying",
  golden_apple: "golden_apple",
  enchanted_book: "enchanted_book",
  ender_eye: "ender_eye",
  ender_pearl: "ender_pearl",
  emerald: "emerald",
  diamond: "diamond",
  gold_ingot: "gold_ingot",
  netherite_ingot: "netherite_ingot",
  netherite_helmet: "netherite_helmet",
  diamond_helmet: "diamond_helmet",
  golden_helmet: "golden_helmet",
  dragon_breath: "dragon_breath",
  experience_bottle: "experience_bottle",
  fire_charge: "fire_charge",
  elytra: "elytra",
  heart_of_the_sea: "heart_of_the_sea",
  recovery_compass_00: "recovery_compass_00",
  echo_shard: "echo_shard",
  golden_shovel: "golden_shovel",

  // Custom Minecraft Pixel Sprites
  creeper: "creeper_face",
  creeper_face: "creeper_face",
  heart: "survival_heart",
  survival_heart: "survival_heart",
  hardcore_heart: "hardcore_heart",
  tnt: "tnt",
  wither_skull: "wither_skull",
  blood_shard: "blood_shard",
  gold_coin: "gold_coin",
  coin: "gold_coin",
  fire: "fire",
  flame: "fire",
};

export default function MinecraftEmoji({
  name,
  size = 24,
  className = "",
  glow = "none",
}: MinecraftEmojiProps) {
  const spriteFile = EMOJI_SPRITE_MAP[name] || (name in EMOJI_SPRITE_MAP ? EMOJI_SPRITE_MAP[name] : "nether_star");
  const glowClass = GLOW_FILTERS[glow] || "";

  return (
    <span
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
      className={`relative inline-flex items-center justify-center shrink-0 select-none align-middle pixelated transition-transform duration-150 hover:scale-110 ${glowClass} ${className}`}
      title={name.replace(/_/g, " ")}
      data-pixelated="true"
    >
      <Image
        src={`/images/minecraft/${spriteFile}.png`}
        alt={name}
        width={size}
        height={size}
        unoptimized
        className="w-full h-full object-contain pixelated pointer-events-none"
        style={{
          imageRendering: "pixelated",
        }}
      />
    </span>
  );
}
