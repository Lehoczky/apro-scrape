module.exports = {
  configureWebpack: {},
  pluginOptions: {
    electronBuilder: {
      chainWebpackRendererProcess: config => {
        // Add custom entry point
        config.entry("app").clear()
        config.entry("app").add("./src/renderer/main.ts")
      },
      mainProcessFile: "src/main/background.ts",
      mainProcessWatch: ["src/main/"],
      nodeIntegration: true,
      preload: { preload: "src/main/preload.ts" },
      externals: ["jsdom"],
      builderOptions: {
        win: {
          target: "nsis",
        },
        linux: {
          target: "AppImage",
          category: "Network",
        },
        nsis: {
          deleteAppDataOnUninstall: "true",
        },
        publish: ["github"],
      },
    },
  },
}
