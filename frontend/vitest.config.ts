import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/services/**/*.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
      },
    },
  },
});
