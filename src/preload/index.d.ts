import type { SoldItem } from "src/shared"

declare global {
  interface Window {
    api: {
      startScraping: (url: string) => Promise<SoldItem[]>
      isWindowHidden: () => Promise<boolean>
      validateUrl: (url: string) => Promise<boolean>
      openWindow: () => Promise<void>
      onOpenSettings: (callback: () => unknown) => Electron.IpcRenderer
    }
  }
}
