import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: '/spiderman/dist/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html'
    }
  },
  server: {
    port: 3001,
    open: true
  }
})
