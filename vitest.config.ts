import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['test/**/*.{test,spec}.ts'],
    css: false, // disable css processing to avoid postcss plugin loading
  },
});
