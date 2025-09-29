// Versión automática para evitar cache
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || Date.now().toString();
export const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString();
