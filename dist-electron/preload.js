const { contextBridge: o, ipcRenderer: r } = require("electron");
o.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (e, ...n) => r.send(e, ...n),
    on: (e, n) => r.on(e, n),
    once: (e, n) => r.once(e, n),
    removeListener: (e, n) => r.removeListener(e, n)
  }
});
