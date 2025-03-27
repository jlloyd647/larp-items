import { contextBridge as r, ipcRenderer as o } from "electron";
const d = ["toMain"], t = ["fromMain"];
r.exposeInMainWorld("electronAPI", {
  // Send messages to the main process
  send: (e, n) => {
    d.includes(e) && o.send(e, n);
  },
  // Receive messages from the main process
  receive: (e, n) => {
    if (t.includes(e)) {
      const i = (c, ...s) => n(...s);
      return o.on(e, i), () => {
        o.removeListener(e, i);
      };
    }
    return () => {
    };
  }
  // You can add more API methods here if needed
  // For example, a method to open files using Electron's dialog
  // openFile: () => ipcRenderer.invoke('dialog:openFile'),
});
window.addEventListener("DOMContentLoaded", () => {
  console.log("Preload script has loaded successfully");
});
