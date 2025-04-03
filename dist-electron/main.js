import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.platform === "win32") {
  app.setAppUserModelId(app.getName());
}
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
let mainWindow = null;
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(process.env.DIST || "dist", "index.html"));
  }
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("print-character-card", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;
  win.webContents.print({
    silent: true,
    printBackground: true,
    landscape: true,
    margins: { marginType: "none" },
    // 👈 required
    pageSize: {
      width: 148e3,
      // 148mm in microns
      height: 105e3
      // 105mm
    }
  }, (success, errorType) => {
    if (!success) {
      console.error("Failed to print character card:", errorType);
    }
  });
});
