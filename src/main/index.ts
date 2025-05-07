/* eslint-disable promise/prefer-await-to-then */
import { electronApp, is, optimizer } from "@electron-toolkit/utils"
import type { BrowserWindow } from "electron"
import { app } from "electron"

import { setupIpcChannels } from "./ipc"
import { createMenu } from "./menu"
import { createTray } from "./tray"
import { installVueDevtools } from "./vueDevtools"
import { createWindow, getMainWindow } from "./window"

setupIpcChannels()

const gotTheLock = app.requestSingleInstanceLock()

if (gotTheLock) {
  app.on("second-instance", () => {
    const mainWindow = getMainWindow()
    if (mainWindow) {
      restoreExistingWindow(mainWindow)
    }
  })

  app.whenReady().then(async () => {
    electronApp.setAppUserModelId("com.electron")

    if (is.dev) {
      await installVueDevtools()
    }

    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    createWindow()
    createMenu()
    createTray()
  })
} else {
  app.quit()
}

function restoreExistingWindow(window: BrowserWindow) {
  if (window.isMinimized()) {
    window.show()
  }
  window.focus()
}
