import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cc.lab.xjtlu.github.io/', // Project pages subdirectory deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});