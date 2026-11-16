import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const PAGES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/best-minecraft-server-bangladesh/", priority: 0.95, changeFrequency: "weekly" },
  { path: "/store/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ranks/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/survival/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/dragons/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/events/", priority: 0.8, changeFrequency: "daily" },
  { path: "/faq/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/leaderboards/", priority: 0.6, changeFrequency: "daily" },
  { path: "/community/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/staff/", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
