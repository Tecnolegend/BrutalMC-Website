// Shared FAQ list: shown on the FAQ section and sent to Google as structured data.
export interface FaqEntry {
  category: string;
  question: string;
  answer: string;
}

export const FAQS: FaqEntry[] = [
  {
    category: "CONNECTIVITY",
    question: "What makes BrutalMC latency so low in Bangladesh (BDIX)?",
    answer:
      "BrutalMC is directly peered through major Bangladesh Internet Exchanges (BDIX). Whether you are connected via Amber IT, Dot Internet, Link3, Carnival, Carnival Point, or Grameenphone/Banglalink fiber, your packets route domestically with sub-15ms latency, virtually eliminating the lag and knockback delay common on foreign European or US servers.",
  },
  {
    category: "PLATFORMS",
    question: "Can I play on Mobile (Bedrock/PE) or Cracked / Offline Launchers?",
    answer:
      "Yes, 100%! BrutalMC supports both official Microsoft Minecraft accounts and offline launchers (such as PojavLauncher on Android, TLauncher, and Prism). Bedrock and mobile players can connect using play.brutalmc.xyz with port 19132, allowing seamless cross-play with PC Java players.",
  },
  {
    category: "GAMEPLAY",
    question: "What is Custom World Survival SMP and what are its features?",
    answer:
      "BrutalMC is exclusively a Custom World Survival SMP server. It features a completely custom-generated Minecraft world with breathtaking custom biomes, procedural dungeons, clan warfare & secret wilderness fortresses, a player-driven diamond/coin economy with /ah, and mythical world boss raids.",
  },
  {
    category: "BOSS RAIDS",
    question: "What makes the Custom Ender Dragon on BrutalMC unique?",
    answer:
      "Unlike vanilla Minecraft, BrutalMC features an empowered Custom Ender Dragon with multi-phase AI combat, crystal energy barrier shields, homing void breath attacks, and meteor rain. Slaying the dragon yields rare Dragon Scales to forge end-game armor, custom Elytras, and server-wide prestige.",
  },
  {
    category: "TOURNAMENTS",
    question: "Are there real cash / BDT tournaments and how do I participate?",
    answer:
      "Yes! BrutalMC runs weekly events such as build contests, boss raids, dungeon runs and dragon hunts, with prizes that can include Bangladeshi Taka (BDT), ranks and rare items. See the Events page for the schedule and register in our Discord before each event.",
  },
  {
    category: "STORE & DONATIONS",
    question: "How can I purchase Ranks, Keys, and Blood Shards with bKash / Nagad?",
    answer:
      "Open the Store page, pick a rank or crate key, and pay with bKash or Nagad using Send Money. Enter your Minecraft name and Transaction ID (TrxID), then copy your order details into a ticket on our Discord. Staff check the payment and activate your purchase in-game.",
  },
  {
    category: "SECURITY",
    question: "What anticheat does BrutalMC use, and how do I report rule breakers?",
    answer:
      "We deploy a proprietary server-side heuristic anticheat alongside GrimAC and custom packet validation. It detects Reach, AutoClicker, KillAura, Baritone, Velocity, and Flight within ticks. You can report suspicious activity in real-time with /report <player> or by opening a Discord ticket with video evidence.",
  },
];
