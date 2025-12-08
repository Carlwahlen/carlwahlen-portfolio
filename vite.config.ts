import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [react()],
  // For development: use root path
  // For production: use GitHub Pages subdirectory until carlwahlen.com is ready
  base: '/',
  server: {
    host: '0.0.0.0', // Allow external connections (for sharing on local network)
    port: 5173,
    allowedHosts: [
      '.trycloudflare.com', // Allow all Cloudflare Tunnel domains
    ],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(process.cwd(), 'index.html')
    }
  }
})
