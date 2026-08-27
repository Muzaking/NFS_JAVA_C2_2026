import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    
    // 👇 ADD THIS LINE TO FIX THE ERROR 👇
    exclude: ['node_modules', 'e2e/**/*'], 
  },
});