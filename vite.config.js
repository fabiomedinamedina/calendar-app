import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'serviceWorker.js',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: "index.html",
        /* other options */
      },
      injectManifest: {
        globPatterns: ['**/*.{png,css,js,svg,jpg,html}']
      },
      manifest: {
        name: 'Calendar PWA - Fabio Medina | Curso React',
        short_name: 'CalendarPWA',
        description: 'Calendar App es una aplicación desarrollada con React y backend con Node y Express. Desarrollada en un curso de React',
        theme_color: '#D7263D',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
