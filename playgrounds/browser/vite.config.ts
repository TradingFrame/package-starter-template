import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const REPO_ROOT = resolve(__dirname, '../..');
const SRC_ABS = resolve(REPO_ROOT, 'src');
const DIST_ABS = resolve(REPO_ROOT, 'dist');

const PLAY_FROM = (process.env.PLAY_FROM || 'src').toLowerCase();
const USE_DIST = PLAY_FROM === 'dist';

export default defineConfig({
  root: __dirname,
  plugins: [
    react(),
    {
      name: 'watch-external',
      configureServer(server) {
        // 👇 In src mode, watch ../../src; in dist mode, watch ../../dist
        server.watcher.add(USE_DIST ? DIST_ABS : SRC_ABS);
      },
    },
  ],
  resolve: {
    alias: {
      '@': USE_DIST ? DIST_ABS : SRC_ABS,
    },
  },
  server: {
    open: true,
    fs: { allow: [REPO_ROOT, SRC_ABS, DIST_ABS] },
  },
});
