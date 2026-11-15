import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboards",
  description: "Top BrutalMC players by kills, balance, shards and level.",
  alternates: { canonical: "/leaderboards/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
