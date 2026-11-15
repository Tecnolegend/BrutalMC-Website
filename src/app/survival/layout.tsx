import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Survival SMP",
  description: "Custom world survival on BrutalMC: handcrafted biomes, blood shards, clans and low-ping BDIX servers.",
  alternates: { canonical: "/survival/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
