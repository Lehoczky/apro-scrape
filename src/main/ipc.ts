import { BrowserWindow, ipcMain } from "electron"

import { createScraper } from "./scrape"
import { canReach } from "./utils"

export function setupIpcChannels() {
  const scrape = createScraper()

  ipcMain.handle("validate-url", async (_event, url) => {
    return await canReach(url)
  })
  ipcMain.handle("start-scraping", async (_event, url) => {
    return await scrape(url)
  })
  ipcMain.handle("is-window-hidden", ({ sender }) => {
    const mainWindow = BrowserWindow.fromWebContents(sender)
    return !mainWindow?.isVisible()
  })
  ipcMain.on("open-window", ({ sender }) => {
    const mainWindow = BrowserWindow.fromWebContents(sender)
    mainWindow?.show()
  })
  ipcMain.handle("enable-always-on-top", ({ sender }) => {
    const mainWindow = BrowserWindow.fromWebContents(sender)
    mainWindow?.setAlwaysOnTop(true, "modal-panel")
  })
  ipcMain.handle("disable-always-on-top", ({ sender }) => {
    const mainWindow = BrowserWindow.fromWebContents(sender)
    mainWindow?.setAlwaysOnTop(false)
  })
  ipcMain.on("get-always-on-top", (event) => {
    const mainWindow = BrowserWindow.fromWebContents(event.sender)
    event.returnValue = mainWindow?.isAlwaysOnTop()
  })
}
