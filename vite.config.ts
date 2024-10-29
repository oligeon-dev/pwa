import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "serviceWorker.js",
      // includeAssets: [],
      injectRegister: null,
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        sourcemap: true,
        skipWaiting: false,
        clientsClaim: false,
        cleanupOutdatedCaches: true,
        globPatterns: [],
      },
      manifest: {
        name: "あいうえお愛うろあいう　えおあい",
        short_name: "あいうえお",
        background_color: "#ffffff",
        theme_color: "#0D7A81",
        icons: [
          {
            src: "48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
      },
    }),
  ],
});
