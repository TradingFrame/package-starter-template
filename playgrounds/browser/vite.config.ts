import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const REPO_ROOT = resolve(__dirname, '../..');
const SRC_ABS = resolve(REPO_ROOT, 'src');

export default defineConfig({
  root: __dirname,
  plugins: [
    react(),
    // Ensure HMR watches files outside the playground root (../../src)
    {
      name: 'watch-external-src',
      configureServer(server) {
        server.watcher.add(SRC_ABS);
      },
    },
  ],
  resolve: {
    alias: {
      '@': SRC_ABS,
    },
  },
  server: {
    open: true,
    fs: {
      // allow reading from the repo root (so "@/..." works from ../../src)
      allow: [REPO_ROOT],
    },
  },
});
