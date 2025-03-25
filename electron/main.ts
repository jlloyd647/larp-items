import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Any additional IPC handlers can go here