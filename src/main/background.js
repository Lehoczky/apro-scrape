"use strict"

import { app, ipcMain } from "electron"
import unhandled from "electron-unhandled"

import { createTray } from "./tray"
import { createScraper } from "./scrape"
import { createWindow } from "./window"
import { canReach, installVueDevtools } from "./utils"
import { registerAppScheme, registerFileProtocol } from "./protocols"

unhandled()
registerAppScheme()
const scrape = createScraper()
const isDevelopment = process.env.NODE_ENV !== "production"

ipcMain.on("validate", async (event, url) => {
  event.returnValue = await canReach(url)
})

ipcMain.on("start-scraping", async (event, page) => {
  const selling = await scrape(page)
  event.reply("new-items", selling)
})

app.on("ready", async () => {
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
