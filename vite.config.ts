import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        related_applications: [
          {
            platform: 'webapp',
            url: 'https://main.dsorxvjzdogy0.amplifyapp.com/manifest.webmanifest',
          },
        ],
        name: 'PWA TEST APP',
        short_name: 'APP(short_name)',
        description: 'description',
        theme_color: '#ffffff',
        start_url: 'https://main.dsorxvjzdogy0.amplifyapp.com/home',
        icons: [
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      // registerType: 'autoUpdate',
      registerType: 'prompt',
      strategies: 'generateSW',
      workbox: {
        cacheId: `app-${pkg.version}`,
        clientsClaim: true,
        skipWaiting: false,
      },
    }),
  ],
});
