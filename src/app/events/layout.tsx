import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Weekly BrutalMC events: build contests, boss raids, dungeon runs and dragon hunts with prizes.",
  alternates: { canonical: "/events/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
