import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false,         // ✅ All CSS into one file
    assetsDir: 'assets',         // ✅ Still keep CSS in assets/
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        content: resolve(__dirname, '../content.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'content') return 'content.js';
          return '[name].js';
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'assets/main.css';
          return 'assets/[name][extname]';
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});

