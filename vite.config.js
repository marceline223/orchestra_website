import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@api': path.resolve(__dirname, 'api'),
      '@public': path.resolve(__dirname, 'public'),
    },
  },
})
