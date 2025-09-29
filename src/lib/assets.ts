/**
 * Helper para manejar rutas de assets con basePath de GitHub Pages
 */

const isProd = process.env.NODE_ENV === 'production';
// Si tenemos dominio personalizado, no necesitamos basePath
const hasCustomDomain = isProd && process.env.NEXT_PUBLIC_APP_URL?.includes('universidadfastamarketing.com.ar');
const basePath = isProd && !hasCustomDomain ? '/marketing-simulator' : '';

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
