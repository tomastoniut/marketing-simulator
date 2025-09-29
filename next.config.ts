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
  
  // Headers para controlar cache
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, must-revalidate', // 5 minutos
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 año para assets estáticos
          },
        ],
      },
    ];
  },
};

export default nextConfig;
