import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Team & Applications",
  description: "Meet the BrutalMC staff team, see who runs the server, and learn how to apply to become a helper or moderator.",
  alternates: { canonical: "/staff/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
