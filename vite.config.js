import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      usePolling: true, // 👈 add this
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    }
  }
})