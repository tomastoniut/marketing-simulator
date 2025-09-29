import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para GitHub Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  
  // Base path para GitHub Pages (nombre del repositorio)
  basePath: process.env.NODE_ENV === 'production' ? '/marketing-simulator' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/marketing-simulator' : '',
  
  // Optimización de imágenes deshabilitada para static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
