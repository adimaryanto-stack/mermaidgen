import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'mermaid': ['mermaid'],
          'react-vendors': ['react', 'react-dom'],
        }
      }
    }
  },
  preview: {
    port: 5173
  }
})
