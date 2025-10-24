// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // Make built asset links relative so they load properly on Netlify
  base: './',
  build: {
    outDir: 'dist'
  }
})
