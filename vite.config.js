import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    modulePreload: {
      resolveDependencies: (filename, deps) => {
        // Exclude heavy 3D WebGL engine and screens from initial critical modulepreload
        return deps.filter(dep => !dep.includes('vendor-three') && !dep.includes('FireExtinguisher3D'));
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['lucide-react', 'canvas-confetti'],
        }
      }
    },
    chunkSizeWarningLimit: 1200
  },
  server: {
    port: 5173,
    host: true
  }
})
