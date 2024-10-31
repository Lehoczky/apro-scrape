import { configLehoczkyVue } from "@lehoczky/eslint-config-vue"

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...configLehoczkyVue({
    parserOptionsForTypeChecking: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  }),
]
