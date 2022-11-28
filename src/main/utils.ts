import axios from "axios"
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer"

import { logError } from "./errorHandling"

export async function canReach(url: string) {
  try {
    await axios.options(url)
    return true
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      logError(error as Error)
    }
    return false
  }
}

export async function installVueDevtools() {
  try {
    await installExtension(VUEJS_DEVTOOLS)
  } catch (error) {
    console.error("Vue Devtools failed to install:", error.toString())
  }
}
