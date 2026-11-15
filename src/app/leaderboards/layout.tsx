import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboards – Top Players",
  description: "See the top BrutalMC players by kills, balance, blood shards and level on Bangladesh's custom survival Minecraft server.",
  alternates: { canonical: "/leaderboards/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
