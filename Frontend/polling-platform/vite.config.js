import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,  // Frontend port
    proxy: {
      '/api': {  // Proxy all /api requests to backend
        target: 'http://localhost:3000',  // Backend URL
        changeOrigin: true,  // Change origin to match target
        secure: false,  // For local dev
      },
    },
  },
});