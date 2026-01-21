import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Vital for GitHub Pages deployment (handles subdirectory hosting)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});