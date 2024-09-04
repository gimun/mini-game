import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [react(), svgr(), imagetools()]
});
