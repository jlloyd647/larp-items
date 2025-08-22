const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  shell: {
    openPath: (filePath) => shell.openPath(filePath),
  },
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    once: (channel, listener) => ipcRenderer.once(channel, listener),
    removeListener: (channel, listener) => ipcRenderer.removeListener(channel, listener),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  },
  writeCraftingLog: (logData) => ipcRenderer.send('write-crafting-log', logData)
});
