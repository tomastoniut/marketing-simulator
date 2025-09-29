import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Configuración para GitHub Pages - Static Export
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  
  // Base path para GitHub Pages
  basePath: isProd ? '/marketing-simulator' : '',
  assetPrefix: isProd ? '/marketing-simulator' : '',
  
  // Optimización de imágenes deshabilitada para static export
  images: {
    unoptimized: true,
  },
  
  // Configuración adicional para GitHub Pages
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
