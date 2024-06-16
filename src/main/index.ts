import { electronApp, is, optimizer } from "@electron-toolkit/utils"
import { app } from "electron"

import { setupErrorHandling } from "./errorHandling"
import { setupIpcChannels } from "./ipc"
import { createMenu } from "./menu"
import { createTray } from "./tray"
import { installVueDevtools } from "./vueDevtools"
import { createWindow } from "./window"

setupErrorHandling()
setupIpcChannels()

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
