import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: "/kaplay-runner/",
  resolve: {
    alias: {
      kaplay: path.resolve(__dirname, 'node_modules/kaplay/dist/kaplay.js'),
    },
  },
  optimizeDeps: {
    include: ['kaplay']
  }
});