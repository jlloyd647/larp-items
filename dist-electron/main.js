import { app as e, BrowserWindow as t } from "electron";
import n from "path";
import { fileURLToPath as s } from "url";
const r = s(import.meta.url), a = n.dirname(r);
process.platform === "win32" && e.setAppUserModelId(e.getName());
const l = e.requestSingleInstanceLock();
l || (e.quit(), process.exit(0));
let o = null;
async function i() {
  o = new t({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: n.join(a, "preload.js"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), process.env.VITE_DEV_SERVER_URL ? (await o.loadURL(process.env.VITE_DEV_SERVER_URL), o.webContents.openDevTools()) : o.loadFile(n.join(process.env.DIST || "dist", "index.html"));
}
e.whenReady().then(i);
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
e.on("activate", () => {
  t.getAllWindows().length === 0 && i();
});
