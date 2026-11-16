import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SITE_URL, SERVER_IP, DISCORD_URL, YOUTUBE_URL, INSTAGRAM_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

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
    default: "BrutalMC – Best Minecraft Server in Bangladesh (Java & Bedrock SMP)",
    template: "%s | BrutalMC",
  },
  description:
    "BrutalMC is the best Minecraft server in Bangladesh for Java & Bedrock: custom world survival SMP, dragon boss raids, clans, BDT events and low-ping BDIX. Join free at play.brutalmc.xyz",
  applicationName: "BrutalMC",
  category: "games",
  keywords: [
    "BrutalMC",
    "Brutal MC",
    "best Minecraft server in Bangladesh",
    "best Minecraft server Bangladesh",
    "#1 Minecraft server in Bangladesh",
    "top Minecraft server Bangladesh",
    "best BD Minecraft server",
    "Minecraft server Bangladesh",
    "Bangladesh Minecraft server",
    "BD Minecraft server",
    "Bangladeshi Minecraft server",
    "Minecraft server BD IP",
    "Minecraft server Dhaka",
    "Minecraft Bangladesh",
    "Bangla Minecraft server",
    "free Minecraft server Bangladesh",
    "Minecraft SMP Bangladesh",
    "Survival SMP Bangladesh",
    "Minecraft BDIX server",
    "low ping Minecraft server Bangladesh",
    "Minecraft Bedrock server Bangladesh",
    "Minecraft PE server Bangladesh",
    "Minecraft Java server Bangladesh",
    "cracked Minecraft server Bangladesh",
    "TLauncher server Bangladesh",
    "Pojav Launcher server Bangladesh",
    "Minecraft server South Asia",
    "বাংলাদেশের সেরা মাইনক্রাফট সার্ভার",
    "মাইনক্রাফট সার্ভার বাংলাদেশ",
    "Custom World Survival",
    "play.brutalmc.xyz",
  ],
  authors: [{ name: "Tecnolegend", url: "https://github.com/Tecnolegend" }],
  creator: "Tecnolegend",
  publisher: "BrutalMC",
  openGraph: {
    title: "BrutalMC – Best Minecraft Server in Bangladesh",
    description:
      "Custom world survival SMP for Java & Bedrock with dragon bosses, dungeons, clans and low-ping BDIX. Join play.brutalmc.xyz",
    url: "/",
    siteName: "BrutalMC",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "BrutalMC Minecraft server custom world hub",
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
    title: "BrutalMC – Best Minecraft Server in Bangladesh",
    description:
      "Custom world survival SMP for Java & Bedrock. Join play.brutalmc.xyz",
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

import SmoothScroll from "@/components/SmoothScroll";

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "BrutalMC",
      alternateName: ["BrutalMC Network", "Brutal MC"],
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/images/og.jpg`,
      slogan: "The best Minecraft server in Bangladesh",
      areaServed: { "@type": "Country", name: "Bangladesh" },
      description:
        "BrutalMC is a custom world survival SMP Minecraft server in Bangladesh for Java and Bedrock players.",
      sameAs: [DISCORD_URL, YOUTUBE_URL, INSTAGRAM_URL, "https://github.com/Tecnolegend/BrutalMC-Website"],
      founder: { "@id": `${SITE_URL}/#founder` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Tecnolegend",
      alternateName: "TecnoLegend",
      jobTitle: "Founder of BrutalMC",
      url: "https://github.com/Tecnolegend",
      sameAs: ["https://github.com/Tecnolegend", YOUTUBE_URL, INSTAGRAM_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "BrutalMC",
      alternateName: ["Brutal MC", "BrutalMC Minecraft Server"],
      url: `${SITE_URL}/`,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "VideoGame",
      name: "BrutalMC Minecraft Server",
      url: `${SITE_URL}/`,
      description: `Custom world survival SMP Minecraft server in Bangladesh. Join at ${SERVER_IP} (Java & Bedrock).`,
      genre: ["Survival", "Sandbox", "Multiplayer"],
      gamePlatform: ["PC", "Android", "iOS", "Xbox", "PlayStation", "Nintendo Switch"],
      playMode: "MultiPlayer",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

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
        <JsonLd data={siteJsonLd} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
