/* eslint-disable @typescript-eslint/naming-convention */
import vue from "@vitejs/plugin-vue"
import autoprefixer from "autoprefixer"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import { resolve } from "path"
import tailwind from "tailwindcss"
import AutoImport from "unplugin-auto-import/vite"

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
    plugins: [
      AutoImport({
        imports: ["vue", "@vueuse/core"],
        dts: "./src/autoImports.d.ts",
      }),
      vue(),
    ],
  },
})
