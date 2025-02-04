import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
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
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
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
      registerType: 'autoUpdate',
    }),
  ],
});
