// vitest.config.ts
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.{test,spec}.ts'],
    exclude: [...configDefaults.exclude, 'coverage/**', 'dist/**'],

    clearMocks: true,
    mockReset: true,
    restoreMocks: true,

    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/__tests__/**',
        'src/**/*.{test,spec}.{ts,tsx}',
        '**/*.d.ts',
        'vitest.config.ts',
        'tsdown.config.ts',
        '**/*.config.*',
      ],
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
    },
  },

  // Vitest uses Vite's watcher: ignore generated folders here
  server: {
    watch: {
      ignored: ['coverage/**', 'dist/**'],
    },
  },
});
