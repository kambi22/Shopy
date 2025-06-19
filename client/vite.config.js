import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // PWA plugin configuration
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon.svg'],
      manifest: {
        name: 'Shopy',
        short_name: 'Shopy',
        start_url: '/',
        display: 'standalone',
        description: 'welcome to Shopy, your online shopping companion',
        theme_color: '#fbc2eb', // light purple
        background_color: '#fbc2eb', // light purple
        icons: [
          {
            src: 'web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'web-app-manifest-512x512.png',
            type: 'image/png',
            sizes: '512x512'
          },
        ]
      },
      workbox: {
        // Cache strategies
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
      // Enable install prompt and offline support
      devOptions: {
        enabled: true, // Enable PWA in development
        type: 'module', // Use modern JS
      },
    })
  ],
  server: {
    port: 5173, // or your preferred port
    host: true,
    strictPort: true,
    hmr: {
      clientPort: 443 // For ngrok HTTPS
    }
  }
})
