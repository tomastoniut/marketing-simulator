/**
 * Helper para manejar rutas de assets con basePath de GitHub Pages
 */

const isProd = process.env.NODE_ENV === 'production';
// Detectar si estamos en Netlify o GitHub Pages
const isNetlify = isProd && (process.env.NETLIFY === 'true' || process.env.NEXT_PUBLIC_APP_URL?.includes('netlify.app'));
const basePath = isProd && !isNetlify ? '/marketing-simulator' : '';

/**
 * Construye la ruta completa para un asset público
 * @param path - Ruta del asset (ej: '/logo.png')
 * @returns Ruta completa con basePath si está en producción sin dominio personalizado
 */
export function getAssetPath(path: string): string {
  // Asegurar que la ruta empiece con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

/**
 * Hook para obtener rutas de assets en componentes
 */
export function useAssetPath() {
  return getAssetPath;
}

export { basePath };
