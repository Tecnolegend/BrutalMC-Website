import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the BrutalMC Discord community: voice chats, trading, giveaways and support.",
  alternates: { canonical: "/community/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
