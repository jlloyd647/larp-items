const { contextBridge: r, ipcRenderer: o, shell: i } = require("electron");
r.exposeInMainWorld("electron", {
  shell: {
    openPath: (e) => i.openPath(e)
  },
  ipcRenderer: {
    send: (e, ...n) => o.send(e, ...n),
    on: (e, n) => o.on(e, n),
    once: (e, n) => o.once(e, n),
    removeListener: (e, n) => o.removeListener(e, n),
    invoke: (e, ...n) => o.invoke(e, ...n)
  },
  writeCraftingLog: (e) => o.send("write-crafting-log", e)
});
