import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  assetsInclude: ['**/*.svg'],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src/environment.ts')) { // Ajuste aqui para o caminho correto do seu arquivo
            return 'environment'; // O nome do arquivo gerado
          }
        }
      }
    }
  }
})
