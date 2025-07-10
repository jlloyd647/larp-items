import { app as e, BrowserWindow as o, ipcMain as c } from "electron";
import t from "path";
import { fileURLToPath as l } from "url";
const d = l(import.meta.url), p = t.dirname(d);
process.platform === "win32" && e.setAppUserModelId(e.getName());
const w = e.requestSingleInstanceLock();
w || (e.quit(), process.exit(0));
let n = null;
async function r() {
  n = new o({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: t.join(p, "preload.js"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), process.env.VITE_DEV_SERVER_URL ? (await n.loadURL(process.env.VITE_DEV_SERVER_URL), n.webContents.openDevTools()) : n.loadFile(t.join(process.env.DIST || "dist", "index.html"));
}
e.whenReady().then(r);
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
e.on("activate", () => {
  o.getAllWindows().length === 0 && r();
});
c.on("print-character-card", () => {
  const i = o.getFocusedWindow();
  i && i.webContents.print({
    silent: !0,
    printBackground: !0,
    landscape: !0,
    margins: { marginType: "none" },
    // 👈 required
    pageSize: {
      width: 148e3,
      // 148mm in microns
      height: 105e3
      // 105mm
    }
  }, (a, s) => {
    a || console.error("Failed to print character card:", s);
  });
});
