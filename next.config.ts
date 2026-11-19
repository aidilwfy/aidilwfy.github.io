import type { NextConfig } from "next";

/**
 * Static export so the site can be hosted on GitHub Pages (or any static host).
 * NEXT_PUBLIC_BASE_PATH is set by the GitHub Actions workflow when the site
 * lives under a sub-path, e.g. https://username.github.io/repo-name
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  ...(basePath && { basePath }),
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
};

export default nextConfig;
