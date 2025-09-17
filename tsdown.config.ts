import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  platform: 'neutral', // works in Node and browsers
  target: ['node20', 'es2020'],
  dts: true, // auto-enables anyway if package.json has "types"
  sourcemap: true, // helpful for debugging
  outDir: 'dist',
  fixedExtension: true, // emit .mjs/.cjs to match our package.json
});
