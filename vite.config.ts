import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import apiServer from './server/index.mjs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-server-middleware',
      configureServer(server) {
        server.middlewares.use(apiServer);
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-tesseract': ['tesseract.js'],
          'vendor-pdf': ['pdfjs-dist'],
          'vendor-three': ['three']
        }
      }
    }
  }
});
