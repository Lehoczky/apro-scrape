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
    // Possible Problems
    "no-constant-binary-expression": "warn",
    "no-constructor-return": "warn",
    "no-promise-executor-return": "warn",
    "no-unreachable-loop": "warn",

    // Suggestions
    complexity: ["warn", 13],
    "default-case-last": "warn",
    "dot-notation": "warn",
    eqeqeq: ["warn", "smart"],
    "func-style": ["warn", "declaration", { allowArrowFunctions: true }],
    "grouped-accessor-pairs": ["warn", "getBeforeSet"],
    "max-depth": ["warn", 6],
    "max-params": ["warn", { max: 8 }],
    "no-bitwise": "warn",
    "no-caller": "warn",
    "no-extend-native": "warn",
    "no-implicit-coercion": ["warn", { boolean: false }],
    "no-lonely-if": "warn",
    "no-multi-str": "warn",
    "no-nested-ternary": "warn",
    "no-return-assign": "warn",
    "no-throw-literal": "warn",
    "no-unneeded-ternary": "warn",
    "no-useless-concat": "warn",
    "no-var": "warn",
    "no-useless-return": "warn",
    "object-shorthand": "warn",
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn",
    "prefer-exponentiation-operator": "warn",
    "prefer-object-spread": "warn",
    "prefer-rest-params": "warn",
    "prefer-template": "warn",
    radix: "warn",
    "require-await": "warn",
    yoda: ["warn", "never", { exceptRange: true }],

    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
    "@typescript-eslint/consistent-indexed-object-style": ["warn", "record"],
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { disallowTypeAnnotations: false },
    ],
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

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
        "vue/component-name-in-template-casing": [
          "warn",
          "PascalCase",
          {
            ignores: [],
          },
        ],
        "vue/custom-event-name-casing": ["warn", "kebab-case"],
        "vue/html-self-closing": ["warn", { html: { void: "always" } }],
        "vue/no-static-inline-styles": "warn",
        "vue/no-useless-mustaches": "warn",
        "vue/no-useless-v-bind": "warn",
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
      rules: {
        "require-await": "off",
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
