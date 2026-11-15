import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dragon Bosses",
  description: "Fight Shenron and the elemental dragons of BrutalMC: abilities, summoning, loot and dragon armour.",
  alternates: { canonical: "/dragons/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
