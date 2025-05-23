import { resolve } from "node:path"

import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {},
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
