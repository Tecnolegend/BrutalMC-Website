import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ranks & Perks – Elite, King, Hero, Legend, Brutal",
  description: "Compare BrutalMC ranks: Elite, King, Hero, Legend and Brutal, with perks, kits and vaults.",
  alternates: { canonical: "/ranks/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
