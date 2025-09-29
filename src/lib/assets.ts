/**
 * Helper para manejar rutas de assets con basePath de GitHub Pages
 */

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/marketing-simulator' : '';

/**
 * Construye la ruta completa para un asset público
 * @param path - Ruta del asset (ej: '/logo.png')
 * @returns Ruta completa con basePath si está en producción
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
