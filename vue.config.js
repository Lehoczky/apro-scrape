module.exports = {
  configureWebpack: {},
  chainWebpack: config => {
    config.plugin("html").tap(args => [
      {
        ...args[0],
        title: "Apro Scrape"
      }
    ]);
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackRendererProcess: (config) => {
        // Add custom entry point
        config.entry("app").clear();
        config.entry("app").add("./src/renderer/main.js");
      },
      mainProcessFile: "src/main/background.js",
      nodeIntegration: true,
      externals: ["jsdom"],
    },
  },
};
