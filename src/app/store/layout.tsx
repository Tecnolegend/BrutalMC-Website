import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Buy BrutalMC ranks, crate keys and bundles with bKash or Nagad.",
  alternates: { canonical: "/store/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
