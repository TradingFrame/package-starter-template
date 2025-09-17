import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  platform: 'neutral', // lib usable in Node & browsers
  target: ['node22', 'es2022'], // bump from node20/es2020 → node22/es2022
  dts: true,
  sourcemap: true,
  outDir: 'dist',
  fixedExtension: true, // keep .mjs/.cjs file names
});
