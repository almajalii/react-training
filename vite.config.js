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
      usePolling: true, //Vite detects change
    },
    hmr: {//hot module relode
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    }
  }
})