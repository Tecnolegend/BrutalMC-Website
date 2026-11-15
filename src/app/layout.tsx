import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

// Fonts are bundled with the site (no Google Fonts request at build or page load)
const geistSans = GeistSans;
const geistMono = GeistMono;

const minecraftFont = localFont({
  src: [
    { path: "./fonts/silkscreen-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/silkscreen-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-minecraft",
  display: "swap",
});

const pixelFont = localFont({
  src: "./fonts/press-start-2p-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ff0033",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BrutalMC | Custom World Survival SMP in Bangladesh",
    template: "%s | BrutalMC",
  },
  description:
    "Join Bangladesh's premier Custom World Survival SMP server (play.brutalmc.xyz). Handcrafted custom world, custom dragon boss, mythical dungeons, clan warfare & wilderness fortresses, and low-latency BDIX connectivity.",
  keywords: [
    "Minecraft Bangladesh",
    "BrutalMC",
    "Custom World Survival",
    "Survival SMP Bangladesh",
    "Custom Dragon Minecraft",
    "BD Minecraft Server",
    "Minecraft BDIX",
    "Minecraft Bedrock Bangladesh",
    "play.brutalmc.xyz",
  ],
  authors: [{ name: "BrutalMC Network" }],
  openGraph: {
    title: "BrutalMC | Bangladesh's Premier Custom World Survival SMP",
    description:
      "Handcrafted custom world, custom dragon raid boss, procedural dungeons, clan warfare, and ultra-low ping BDIX connectivity.",
    url: SITE_URL,
    siteName: "BrutalMC",
    images: [
      {
        url: "/images/gallery_hub.jpg",
        width: 1200,
        height: 630,
        alt: "BrutalMC Custom World Hub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrutalMC | Custom World Survival SMP in Bangladesh",
    description:
      "Handcrafted custom world, custom dragon raid boss, dungeons, clan warfare, and low-ping BDIX connectivity.",
    images: ["/images/gallery_hub.jpg"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${minecraftFont.variable} ${pixelFont.variable} antialiased dark`}
    >
      <body className="min-h-screen flex flex-col bg-[#050508] text-zinc-100 font-sans selection:bg-red-600/30 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
