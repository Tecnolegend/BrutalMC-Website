import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder & Staff Applications",
  description: "BrutalMC was founded by TecnoLegend. Learn about the founder and how to apply to join the BrutalMC staff team.",
  alternates: { canonical: "/staff/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
