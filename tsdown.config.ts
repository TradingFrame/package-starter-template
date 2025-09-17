import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  platform: 'neutral',
  target: ['node22', 'es2022'],
  dts: true,
  sourcemap: true,
  outDir: 'dist',
  fixedExtension: true,

  // 🔑 Alias '@/' → '<repo>/src/'
  alias: {
    '@/': 'src/',
  },
});
