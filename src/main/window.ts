"use strict"

import { app, BrowserWindow } from "electron"
import { join } from "path"
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"
import { autoUpdater } from "electron-updater"
import {
  setupTitlebar,
  attachTitlebarToWindow,
} from "custom-electron-titlebar/dist/main"
import { iconPath } from "./icon"

let mainWindow: BrowserWindow | undefined
setupTitlebar()

export const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 350,
    icon: iconPath,
    frame: false,
    backgroundColor: "#ececec",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: Boolean(process.env.ELECTRON_NODE_INTEGRATION),
      contextIsolation: false,
      webSecurity: false,
      preload: join(__dirname, "preload.js"),
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol("app")
    mainWindow.loadURL("app://./index.html")
    autoUpdater.checkForUpdatesAndNotify()
  }

  attachTitlebarToWindow(mainWindow)
  mainWindow.on("minimize", mainWindow.hide)
  mainWindow.on("close", mainWindow.destroy)
  mainWindow.on("closed", () => {
    mainWindow = undefined
  })
  mainWindow.once("ready-to-show", () => mainWindow.show())
}

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === undefined) {
    createWindow()
  }
})

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})