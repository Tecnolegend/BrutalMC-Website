import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a fully static site (the `out/` folder) so it can be hosted on GitHub Pages
  output: "export",
  // GitHub Pages serves /store/index.html for /store/
  trailingSlash: true,
  images: {
    // No image optimisation server on static hosting
    unoptimized: true,
  },
};

export default nextConfig;
