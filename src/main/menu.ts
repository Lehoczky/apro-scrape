import { platform } from "@electron-toolkit/utils"
import { Menu } from "electron"

export function createMenu() {
  const menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          label: "Settings",
          click(_menuItem, browserWindow) {
            browserWindow?.webContents.send("open-settings")
          },
        },
        platform.isMacOS ? { role: "close" } : { role: "quit" },
      ],
    },
    // See: https://github.com/AlexTorresDev/custom-electron-titlebar/issues/216
    { label: undefined },
    { label: undefined },
  ])
  Menu.setApplicationMenu(menu)
}
