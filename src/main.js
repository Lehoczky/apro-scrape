const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  Notification,
} = require("electron");
const path = require("path");
const unhandled = require("electron-unhandled");

const { createScraper } = require("./scrape");

unhandled();

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow = null;
let tray = null;
let interval = null;
const iconPath = path.join(__dirname, "..", "static", "icon.png");
const scrape = createScraper();

const createTray = () => {
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: () => {
        mainWindow.destroy();
        app.quit();
      },
    },
  ]);
  tray.setToolTip("Apro Scrape");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    mainWindow.show();
  });
};

const showNewItemsNotification = (items) => {
  const notification = new Notification();
  notification.on("click", () => {
    mainWindow.show();
  });

  if (items.length == 1) {
    const item = items[0];
    notification.title = "New item is available";
    notification.body = `${item.title} - ${item.price}`;
  } else if (items.length > 1) {
    notification.title = "New items are available";
    notification.body = `${items.length} new items found!`;
  }
  notification.show();
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 250,
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.webContents.openDevTools();

  mainWindow.on("minimize", () => {
    mainWindow.hide();
  });
};

ipcMain.on("start-scraping", (event, page, seconds) => {
  interval = startInterval(seconds, async () => {
    try {
      const selling = await scrape(page);
      console.log(selling.length);

      if (selling.length) {
        mainWindow.webContents.send("new-items", selling);
        if (!mainWindow.isVisible()) {
          showNewItemsNotification(selling);
        }
      }
    } catch (error) {
      mainWindow.webContents.send("scrape-error");
    }
  });
});

ipcMain.on("stop-scraping", (event) => {
  clearInterval(interval);
});

app.on("ready", () => {
  createWindow();
  createTray();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const startInterval = (seconds, callback) => {
  callback();
  return setInterval(callback, seconds * 1000);
};
