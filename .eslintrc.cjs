module.exports = {
  root: true,
  parserOptions: {
    project: ["tsconfig.node.json", "tsconfig.web.json"],
  },
  extends: ["@lehoczky/eslint-config-vue"],
  ignorePatterns: ["out"],
}
