import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this as a project site at /upcycle-brews-bites/, so
  // the production build needs that path prefix; keep local dev at the root.
  base: command === 'build' ? '/upcycle-brews-bites/' : '/',
}))
