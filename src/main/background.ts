"use strict"

import { app, BrowserWindow, ipcMain } from "electron"

import { setupErrorHandling } from "./errorHandling"
import { registerAppScheme, registerFileProtocol } from "./protocols"
import { createScraper } from "./scrape"
import { createTray } from "./tray"
import { canReach, installVueDevtools } from "./utils"
import { createWindow } from "./window"

setupErrorHandling()
registerAppScheme()
const scrape = createScraper()
const isDevelopment = process.env.NODE_ENV !== "production"

ipcMain.handle("validate", async (_event, url) => {
  return await canReach(url)
})
ipcMain.handle("start-scraping", async (_event, url) => {
  return await scrape(url)
})
ipcMain.handle("is-window-hidden", ({ sender }) => {
  const mainWindow = BrowserWindow.fromWebContents(sender)
  return !mainWindow.isVisible()
})
ipcMain.on("open-window", ({ sender }) => {
  const mainWindow = BrowserWindow.fromWebContents(sender)
  mainWindow.show()
})

app.whenReady().then(async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    await installVueDevtools()
  }
  registerFileProtocol()
  createWindow()
  createTray()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit()
      }
    })
  } else {
    process.on("SIGTERM", () => {
      app.quit()
    })
  }
}
