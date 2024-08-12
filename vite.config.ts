import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    chunkSizeWarningLimit:1400,
    // Configuración manual de chunks
    rollupOptions:{
      output:{
        manualChunks(id:string){
          if (id.includes('firebase')) {
            return '@fireb';
          }
          if(id.includes('pdf')){
            return '@pdf'
          }
        }
      }
    }
  }
})
