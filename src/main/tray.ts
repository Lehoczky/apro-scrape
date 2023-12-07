import { app, BrowserWindow, Menu, nativeImage, Tray } from "electron"

import icon from "../../resources/icon.png?asset"

let tray: Tray

export const createTray = () => {
  tray = new Tray(nativeImage.createFromPath(icon))
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
