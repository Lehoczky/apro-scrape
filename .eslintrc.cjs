// @ts-check
const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
  root: true,
  parserOptions: {
    project: ["tsconfig.node.json", "tsconfig.web.json"],
  },
  extends: ["@lehoczky/eslint-config-vue"],
  ignorePatterns: ["out"],
})
