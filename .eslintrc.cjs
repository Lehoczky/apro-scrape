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
  plugins: ["only-warn", "promise"],
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["**/main/**/*.{j,t}s"],
      extends: ["plugin:node/recommended", "prettier"],
      globals: {
        __static: "readonly",
      },
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        "node/no-unpublished-import": "off",
        "node/no-unsupported-features/es-syntax": [
          "warn",
          { ignores: ["modules"] },
        ],
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
  ],
})
