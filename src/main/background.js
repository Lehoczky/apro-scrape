"use strict";

import { app, protocol, ipcMain } from "electron";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

import unhandled from "electron-unhandled";
import axios from "axios";

import { createTray } from "./tray";
import { createScraper } from "./scrape";
import { createWindow } from "./window";

const scrape = createScraper();

unhandled();

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

ipcMain.on("validate", async (event, url) => {
  try {
    await axios.head(url);
    event.returnValue = true;
  } catch {
    event.returnValue = false;
  }
});

ipcMain.on("start-scraping", async (event, page) => {
  const selling = await scrape(page);
  event.reply("new-items", selling);
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  createTray();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
