import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { imagetools } from 'vite-imagetools';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        eslintPlugin(),
        react(),
        svgr(),
        imagetools(),
    ],
});
