import { defineConfig } from "vite"
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  build: {
    minify: true,
    cssMinify: true,
    manifest: true,
    sourcemap: true
  },
  plugins: [WindiCSS({})]
})
