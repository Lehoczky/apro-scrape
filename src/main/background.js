"use strict";

import { app, protocol, ipcMain } from "electron";
import unhandled from "electron-unhandled";

import { createTray } from "./tray";
import { createScraper } from "./scrape";
import { createWindow } from "./window";
import { canReach, installVueDevtools } from "./utils";

unhandled();
const scrape = createScraper();
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

ipcMain.on("validate", async (event, url) => {
  event.returnValue = await canReach(url);
});

ipcMain.on("start-scraping", async (event, page) => {
  const selling = await scrape(page);
  event.reply("new-items", selling);
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    await installVueDevtools();
  }
  createWindow();
  createTray();
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
