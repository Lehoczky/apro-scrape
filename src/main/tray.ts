"use strict"

import { app, BrowserWindow, Menu, Tray } from "electron"

import { iconPath } from "./icon"

let tray

export const createTray = () => {
  tray = new Tray(iconPath)
  tray.setToolTip("Apro Scrape")

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: openMainWindow,
    },
    {
      label: "Quit",
      click: app.quit,
    },
  ])
  tray.setContextMenu(contextMenu)

  tray.on("click", openMainWindow)
}

const openMainWindow = () => {
  const mainWindow = BrowserWindow.getAllWindows()[0]
  mainWindow.show()
}
