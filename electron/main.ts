import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { ipcMain } from 'electron';
import fs from 'fs';
import dotenv from 'dotenv';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (process.platform === 'win32') {
  app.setAppUserModelId(app.getName());
}

// Prevent multiple instances
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the appropriate URL based on environment
  if (process.env.VITE_DEV_SERVER_URL) {
    // Load from Vite dev server
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // Load from built file in production
    mainWindow.loadFile(path.join(process.env.DIST || 'dist', 'index.html'));
  }
}

// Create window when Electron is ready
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS re-create a window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Load ADMIN_PASSWORD from .env using dotenv
dotenv.config();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Any additional IPC handlers can go here

ipcMain.on('print-character-card', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  win.webContents.print({
    silent: true,
    printBackground: true,
    landscape: true,
    margins: { marginType: 'none' }, // 👈 required
    pageSize: {
      width: 148000, // 148mm in microns
      height: 105000, // 105mm
    },
  }, (success, errorType) => {
    if (!success) {
      console.error('Failed to print character card:', errorType);
    }
  });
});

ipcMain.on('write-crafting-log', (event, logData) => {
  const dateStr = new Date().toISOString().slice(0, 10);
  const exeDir = path.dirname(process.execPath);
  const logDir = path.join(exeDir, 'log');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  const logFile = path.join(logDir, `${dateStr}_craft_log.txt`);
  console.log('Crafting log will be saved to:', logFile);
  const logEntry = JSON.stringify(logData) + '\n';
  fs.appendFile(logFile, logEntry, 'utf8', (err) => {
    if (err) {
      console.error('Failed to write crafting log:', err);
    }
  });
});

// Add a new IPC handler for password check
ipcMain.handle('check-admin-password', (event, password) => {
  return password === ADMIN_PASSWORD;
});