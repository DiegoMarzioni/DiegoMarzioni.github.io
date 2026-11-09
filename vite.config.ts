import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Published at https://diegomarzioni.github.io/ (user site), so the base is the root.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
