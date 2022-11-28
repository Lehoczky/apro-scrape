//@ts-check
const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "simple-import-sort", "only-warn"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  rules: {
    "simple-import-sort/imports": "warn",
  },
  overrides: [
    {
      files: ["**/main/**/*.{j,t}s"],
      extends: ["plugin:n/recommended", "prettier"],
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        "n/no-missing-import": "off",
      },
    },
    {
      files: ["**/main/preload.{j,t}s"],
      env: {
        browser: true,
      },
    },
    {
      files: ["**/renderer/**/*.{j,t}s", "**/renderer/**/*.vue"],
      extends: ["plugin:vue/recommended", "prettier"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
      },
      env: {
        browser: true,
      },
      rules: {
        "vue/html-self-closing": ["warn", { html: { void: "always" } }],
      },
    },
    {
      files: [
        "**/tests/e2e/**/*.spec.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ["**/*.cjs"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
})
