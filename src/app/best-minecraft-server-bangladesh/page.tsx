import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SERVER_IP, BEDROCK_PORT, DISCORD_URL } from "@/lib/site";

const PATH = "/best-minecraft-server-bangladesh/";

export const metadata: Metadata = {
  title: { absolute: "Best Minecraft Server in Bangladesh (2026) – BrutalMC #1 BD SMP" },
  description:
    "Looking for the best Minecraft server in Bangladesh? BrutalMC is a #1 pick for BD players: free to join, Java & Bedrock, cracked/TLauncher friendly, low-ping BDIX, custom survival SMP and dragon bosses. IP: play.brutalmc.xyz",
  keywords: [
    "best Minecraft server in Bangladesh",
    "#1 Minecraft server Bangladesh",
    "top Minecraft server BD",
    "best BD Minecraft server 2026",
    "Minecraft server Bangladesh IP",
    "বাংলাদেশের সেরা মাইনক্রাফট সার্ভার",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "Best Minecraft Server in Bangladesh – BrutalMC",
    description: "Free Java & Bedrock survival SMP with low-ping BDIX. Join play.brutalmc.xyz",
    url: PATH,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "BrutalMC Minecraft server in Bangladesh" }],
  },
};

const REASONS = [
  {
    title: "Low ping from anywhere in Bangladesh",
    text: "BrutalMC is peered through BDIX, so players on Link3, Amber IT, Dot Internet, Carnival and mobile fiber connect inside the country instead of routing to Europe or Singapore. Less lag, fairer PvP.",
  },
  {
    title: "Java, Bedrock and mobile together",
    text: `Play from PC (Java Edition), Minecraft PE on Android or iPhone, Xbox, PlayStation or Switch. Java players join ${SERVER_IP}; Bedrock players use the same address with port ${BEDROCK_PORT}.`,
  },
  {
    title: "Free to join, cracked launchers welcome",
    text: "You don't need to buy anything. Official Microsoft accounts and offline launchers like TLauncher, Prism and PojavLauncher can all join.",
  },
  {
    title: "Custom world survival SMP",
    text: "A hand-built custom world with new biomes, dungeons, hidden fortresses, clans and a player-driven economy with an auction house.",
  },
  {
    title: "Dragon boss raids",
    text: "Team up against a custom multi-phase Ender Dragon and other world bosses for rare Dragon Scales, end-game gear and server-wide prestige.",
  },
  {
    title: "Weekly events with BDT prizes",
    text: "Build contests, boss raids, dungeon runs and dragon hunts, with prizes that can include Bangladeshi Taka, ranks and rare items.",
  },
  {
    title: "Pay with bKash or Nagad",
    text: "Ranks and crate keys are optional and paid in Taka through bKash or Nagad, no international card needed.",
  },
  {
    title: "Fair play and active staff",
    text: "Server-side anticheat with GrimAC, plus /report and Discord tickets so problems get handled quickly.",
  },
];

const QUESTIONS = [
  {
    q: "What is the best Minecraft server in Bangladesh?",
    a: `BrutalMC (${SERVER_IP}) is one of the best Minecraft servers in Bangladesh: it is free, supports Java and Bedrock, accepts cracked launchers, runs on low-ping BDIX and offers custom world survival SMP with dragon boss raids and weekly events.`,
  },
  {
    q: "What is the IP of BrutalMC?",
    a: `Java Edition: ${SERVER_IP}. Bedrock / Minecraft PE: ${SERVER_IP} with port ${BEDROCK_PORT}.`,
  },
  {
    q: "Is BrutalMC free to play?",
    a: "Yes. Joining and playing is completely free. Ranks and keys are optional extras.",
  },
  {
    q: "Can I join BrutalMC with TLauncher or on mobile?",
    a: "Yes. BrutalMC accepts offline launchers like TLauncher and PojavLauncher, and Bedrock players on Android, iPhone and consoles can join too.",
  },
  {
    q: "Which Minecraft server has the lowest ping in Bangladesh?",
    a: "Servers hosted inside Bangladesh on BDIX give the lowest ping for local players. BrutalMC is peered through BDIX, so most Bangladeshi ISPs reach it without leaving the country.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${PATH}#page`,
      url: `${SITE_URL}${PATH}`,
      name: "Best Minecraft Server in Bangladesh – BrutalMC",
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Best Minecraft Server in Bangladesh", item: `${SITE_URL}${PATH}` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: QUESTIONS.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    },
  ],
};

export default function BestServerPage() {
  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20">
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-zinc-500 mb-6">
          <Link href="/" className="hover:text-white">HOME</Link>
          <span className="mx-2">/</span>
          <span className="text-red-500">BEST MINECRAFT SERVER IN BANGLADESH</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-minecraft font-bold uppercase tracking-tight mc-shadow leading-tight">
          The Best Minecraft Server in Bangladesh
        </h1>
        <p className="mt-5 text-lg text-zinc-300 leading-relaxed">
          <strong className="text-white">BrutalMC</strong> is a Bangladeshi Minecraft server built for BD players:
          free to join, Java and Bedrock cross-play, low-ping BDIX, and a custom world survival SMP with dragon
          boss raids. If you&apos;re searching for the #1 Minecraft server in Bangladesh, start here.
        </p>

        <div className="mt-8 rounded-2xl border border-red-500/30 bg-[#0b0b12] p-6 font-mono text-sm space-y-2">
          <p><span className="text-zinc-500">Java IP:</span> <span className="text-white font-bold">{SERVER_IP}</span></p>
          <p><span className="text-zinc-500">Bedrock / PE:</span> <span className="text-white font-bold">{SERVER_IP}</span> <span className="text-zinc-500">port</span> <span className="text-white font-bold">{BEDROCK_PORT}</span></p>
          <p><span className="text-zinc-500">Price:</span> <span className="text-white font-bold">Free</span></p>
        </div>

        <h2 className="mt-14 text-2xl sm:text-3xl font-minecraft font-bold uppercase mc-shadow">
          Why players call BrutalMC the #1 BD Minecraft server
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {REASONS.map((r, i) => (
            <section key={r.title} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
              <h3 className="font-bold text-white">
                <span className="text-red-500 font-mono mr-2">{String(i + 1).padStart(2, "0")}</span>
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{r.text}</p>
            </section>
          ))}
        </div>

        <h2 className="mt-14 text-2xl sm:text-3xl font-minecraft font-bold uppercase mc-shadow">
          How to join in 30 seconds
        </h2>
        <ol className="mt-5 space-y-3 text-zinc-300 list-decimal pl-6">
          <li><strong className="text-white">Java (PC, TLauncher):</strong> Multiplayer → Add Server → enter <code className="text-red-400">{SERVER_IP}</code> → Join.</li>
          <li><strong className="text-white">Bedrock / Minecraft PE:</strong> Play → Servers → Add Server → address <code className="text-red-400">{SERVER_IP}</code>, port <code className="text-red-400">{BEDROCK_PORT}</code>.</li>
          <li><strong className="text-white">Join the community:</strong> say hi on our <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-red-400 underline">Discord</a> for events, giveaways and support.</li>
        </ol>

        <h2 className="mt-14 text-2xl sm:text-3xl font-bold" lang="bn">
          বাংলাদেশের সেরা মাইনক্রাফট সার্ভার
        </h2>
        <p className="mt-4 text-zinc-300 leading-relaxed" lang="bn">
          BrutalMC হলো বাংলাদেশি খেলোয়াড়দের জন্য একটি ফ্রি মাইনক্রাফট সার্ভার। Java এবং Bedrock (মোবাইল) দুটো থেকেই খেলা যায়,
          TLauncher দিয়েও জয়েন করা যায়, আর BDIX থাকায় পিং খুব কম। কাস্টম সার্ভাইভাল SMP, ড্রাগন বস, ক্ল্যান আর প্রতি সপ্তাহে ইভেন্ট আছে।
          আইপি: <span className="font-mono text-white">{SERVER_IP}</span>
        </p>

        <h2 className="mt-14 text-2xl sm:text-3xl font-minecraft font-bold uppercase mc-shadow">
          Questions
        </h2>
        <div className="mt-6 space-y-5">
          {QUESTIONS.map((x) => (
            <section key={x.q}>
              <h3 className="font-bold text-white">{x.q}</h3>
              <p className="mt-1 text-zinc-400 leading-relaxed">{x.a}</p>
            </section>
          ))}
        </div>

        <p className="mt-14 text-zinc-400">
          Explore more: <Link href="/survival/" className="text-red-400 underline">Survival SMP</Link>,{" "}
          <Link href="/dragons/" className="text-red-400 underline">Dragon bosses</Link>,{" "}
          <Link href="/events/" className="text-red-400 underline">Events</Link>,{" "}
          <Link href="/ranks/" className="text-red-400 underline">Ranks</Link> and the{" "}
          <Link href="/faq/" className="text-red-400 underline">FAQ</Link>.
        </p>
      </article>
    </PageShell>
  );
}
