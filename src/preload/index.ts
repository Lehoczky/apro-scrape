import { contextBridge, ipcRenderer } from "electron"

import { createTitlebar } from "./titlebar"

window.addEventListener("DOMContentLoaded", () => {
  createTitlebar()
})

contextBridge.exposeInMainWorld("api", {
  startScraping: (url: string) => ipcRenderer.invoke("start-scraping", url),
  isWindowHidden: () => ipcRenderer.invoke("is-window-hidden"),
  validateUrl: (url: string) => ipcRenderer.invoke("validate-url", url),
  openWindow: () => ipcRenderer.send("open-window"),
  onOpenSettings: (callback: () => unknown) =>
    ipcRenderer.on("open-settings", (_event) => callback()),
})
