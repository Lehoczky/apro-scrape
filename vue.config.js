module.exports = {
  configureWebpack: {},
  pluginOptions: {
    electronBuilder: {
      chainWebpackRendererProcess: config => {
        // Add custom entry point
        config.entry("app").clear();
        config.entry("app").add("./src/renderer/main.js");
      },
      mainProcessFile: "src/main/background.js",
      mainProcessWatch: ["src/main/"],
      nodeIntegration: true,
      preload: { preload: "src/main/preload.js" },
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
};
