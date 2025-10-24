// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',        // ← relative paths so assets load correctly
  build: {
    outDir: 'dist'
  }
})

