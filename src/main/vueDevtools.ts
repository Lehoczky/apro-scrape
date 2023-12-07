import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer"

export async function installVueDevtools() {
  try {
    await installExtension(VUEJS_DEVTOOLS)
  } catch (error) {
    if (error instanceof Error) {
      console.error("Vue Devtools failed to install:", error.toString())
    }
  }
}
