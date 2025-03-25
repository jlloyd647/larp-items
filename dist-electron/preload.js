import { contextBridge, ipcRenderer } from "electron";
const validSendChannels = ["toMain"];
const validReceiveChannels = ["fromMain"];
contextBridge.exposeInMainWorld("electronAPI", {
  // Send messages to the main process
  send: (channel, data) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // Receive messages from the main process
  receive: (channel, callback) => {
    if (validReceiveChannels.includes(channel)) {
      const subscription = (_event, ...args) => callback(...args);
      ipcRenderer.on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
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
