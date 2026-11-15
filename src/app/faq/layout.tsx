import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ & Help",
  description: "How to join BrutalMC on Java, Bedrock and mobile, plus rules and common questions.",
  alternates: { canonical: "/faq/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
