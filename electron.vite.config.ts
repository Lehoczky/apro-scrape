import { resolve } from "node:path"

import vue from "@vitejs/plugin-vue"
import autoprefixer from "autoprefixer"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import tailwind from "tailwindcss"

export default defineConfig({
  main: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    css: {
      postcss: {
        plugins: [
          tailwind({ config: resolve(__dirname, "tailwind.config.ts") }),
          autoprefixer(),
        ],
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [vue()],
  },
})
