"use strict";

import { app, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { iconPath } from "./icon";

let mainWindow;

export const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 250,
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    createProtocol("app");
    mainWindow.loadURL("app://./index.html");
  }

  mainWindow.on("minimize", mainWindow.hide);
  mainWindow.on("close", mainWindow.destroy);
  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
};

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === undefined) {
    createWindow();
  }
});
