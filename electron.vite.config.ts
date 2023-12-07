/* eslint-disable @typescript-eslint/naming-convention */
import vue from "@vitejs/plugin-vue2"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import { resolve } from "path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"

export default defineConfig({
  main: {
    resolve: {
      alias: {
        "@shared": resolve("src/shared"),
      },
    },
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    resolve: {
      alias: {
        "@shared": resolve("src/shared"),
      },
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@shared": resolve("src/shared"),
      },
    },
    plugins: [
      Components({
        dts: "./src/components.d.ts",
      }),
      AutoImport({
        imports: ["vue", "@vueuse/core"],
        dts: "./src/autoImports.d.ts",
      }),
      vue(),
    ],
  },
})
