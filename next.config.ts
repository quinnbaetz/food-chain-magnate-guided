import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: githubPages ? "export" : undefined,
  basePath: githubPages ? "/food-chain-magnate-guided" : "",
  images: { unoptimized: true },
  typescript: { tsconfigPath: githubPages ? "tsconfig.pages.json" : "tsconfig.json" },
};

export default nextConfig;
