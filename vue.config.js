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
      nodeIntegration: true,
      externals: ["jsdom"],
      builderOptions: {
        linux: {
          target: "AppImage",
          category: "Network",
          icon: "./icons"
        }
      }
    }
  }
};
