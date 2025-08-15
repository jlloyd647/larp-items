import { app as e, BrowserWindow as l, ipcMain as p } from "electron";
import n from "path";
import { fileURLToPath as m } from "url";
import a from "fs";
const u = m(import.meta.url), h = n.dirname(u);
process.platform === "win32" && e.setAppUserModelId(e.getName());
const S = e.requestSingleInstanceLock();
S || (e.quit(), process.exit(0));
let t = null;
async function f() {
  t = new l({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: n.join(h, "preload.js"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), process.env.VITE_DEV_SERVER_URL ? (await t.loadURL(process.env.VITE_DEV_SERVER_URL), t.webContents.openDevTools()) : t.loadFile(n.join(process.env.DIST || "dist", "index.html"));
}
e.whenReady().then(f);
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
e.on("activate", () => {
  l.getAllWindows().length === 0 && f();
});
p.on("print-character-card", () => {
  const o = l.getFocusedWindow();
  o && o.webContents.print({
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
  }, (i, r) => {
    i || console.error("Failed to print character card:", r);
  });
});
p.on("write-crafting-log", (o, i) => {
  const r = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), g = n.dirname(process.execPath), s = n.join(g, "log");
  a.existsSync(s) || a.mkdirSync(s, { recursive: !0 });
  const c = n.join(s, `${r}_craft_log.txt`);
  console.log("Crafting log will be saved to:", c);
  const w = JSON.stringify(i) + `
`;
  a.appendFile(c, w, "utf8", (d) => {
    d && console.error("Failed to write crafting log:", d);
  });
});
