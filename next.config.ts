import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
// Detectar si estamos en Netlify o GitHub Pages
const isNetlify = isProd && (process.env.NETLIFY === 'true' || process.env.NEXT_PUBLIC_APP_URL?.includes('netlify.app'));

const nextConfig: NextConfig = {
  // Configuración para GitHub Pages - Static Export
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  
  // Base path solo cuando NO estamos en Netlify (solo para GitHub Pages)
  basePath: isProd && !isNetlify ? '/marketing-simulator' : '',
  assetPrefix: isProd && !isNetlify ? '/marketing-simulator' : '',
  
  // Optimización de imágenes deshabilitada para static export
  images: {
    unoptimized: true,
  },
  
  // Configuración adicional para GitHub Pages
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
