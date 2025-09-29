import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
// Detectar si estamos usando dominio personalizado
const hasCustomDomain = isProd && process.env.NEXT_PUBLIC_APP_URL?.includes('universidadfastamarketing.com.ar');

const nextConfig: NextConfig = {
  // Configuración para GitHub Pages - Static Export
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  
  // Base path solo cuando NO hay dominio personalizado
  basePath: isProd && !hasCustomDomain ? '/marketing-simulator' : '',
  assetPrefix: isProd && !hasCustomDomain ? '/marketing-simulator' : '',
  
  // Optimización de imágenes deshabilitada para static export
  images: {
    unoptimized: true,
  },
  
  // Configuración adicional para GitHub Pages
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
