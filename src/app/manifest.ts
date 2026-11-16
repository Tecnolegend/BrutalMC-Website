import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BrutalMC – Best Minecraft Server in Bangladesh",
    short_name: "BrutalMC",
    description: "Custom world survival SMP Minecraft server in Bangladesh for Java & Bedrock. play.brutalmc.xyz",
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#ff0033",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
