import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import electron from 'vite-plugin-electron'
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        // Main process entry point
        entry: 'electron/main.ts', // Changed to .ts for TypeScript support
        onstart({ startup }) {
          startup();
        },
      },
      {
        entry: 'electron/preload.ts', // Changed to .ts for TypeScript support
        onstart({ reload }) {
          reload();
        },
      },
    ]),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // If issues with ESM/CJS conflicts
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Ensure React 19 plays nicely with Electron
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@hookform/resolvers',
      'zod'
    ],
    esbuildOptions: {
      // Fix for certain React 19 features
      target: 'esnext',
    },
  },
})