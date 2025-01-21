import { defineConfig } from 'vite';

export default defineConfig({
  base: "/kaplay-runner/",
  build: {
    rollupOptions: {
      external: []
    },
  },
});