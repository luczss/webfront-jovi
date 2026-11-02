import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// O Tailwind (v3) roda via PostCSS: veja postcss.config.js e tailwind.config.js.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})