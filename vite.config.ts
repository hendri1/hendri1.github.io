/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // Root base path. '/' is correct for both Vercel and a `username.github.io`
  // user site (served at the domain root). Do NOT use a `/repo/` subpath here.
  base: '/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
  // Vitest config — unit tests for the domain & application layers (TDD).
  test: {
    environment: 'happy-dom',
    include: ['tests/unit/**/*.spec.ts'],
    globals: false,
    css: false,
  },
})
