import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Netlify root directory deployment (use '/cc.lab.xjtlu.github.io/' for GitHub Pages)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});