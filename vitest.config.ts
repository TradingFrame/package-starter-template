// vitest.config.ts
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  // 🔑 Make "@/..." resolve to "src/..."
  resolve: {
    alias: {
      '@': '/src', // so "@/utils/x" → "<repo>/src/utils/x"
    },
  },

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

  // Ignore generated folders in watch mode
  server: {
    watch: {
      ignored: ['coverage/**', 'dist/**'],
    },
  },
});
