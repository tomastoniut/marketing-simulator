// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: { unoptimized: true },
  skipTrailingSlashRedirect: true,
  // sin basePath ni assetPrefix
};

export default nextConfig;