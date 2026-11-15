import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Team",
  description: "Meet the BrutalMC staff team and learn how to apply.",
  alternates: { canonical: "/staff/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
