import { join } from "node:path"

import { is } from "@electron-toolkit/utils"
import {
  attachTitlebarToWindow,
  setupTitlebar,
} from "custom-electron-titlebar/main"
import { app, BrowserWindow, shell } from "electron"
import { autoUpdater } from "electron-updater"

import icon from "../../resources/icon.png?asset"

setupTitlebar()

let mainWindow: BrowserWindow | undefined
export function getMainWindow() {
  return mainWindow
}

export const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 350,
    frame: false,
    backgroundColor: "#ececec",
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      webSecurity: false,
    },
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: "deny" }
  })

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
    mainWindow.webContents.openDevTools({ mode: "right" })
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"))
    autoUpdater.checkForUpdatesAndNotify()
  }

  mainWindow.on("minimize", () => mainWindow?.hide())
  mainWindow.on("close", () => mainWindow?.destroy())
  mainWindow.on("closed", () => {
    mainWindow = undefined
  })
  mainWindow.once("ready-to-show", () => mainWindow?.show())

  attachTitlebarToWindow(mainWindow)
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
