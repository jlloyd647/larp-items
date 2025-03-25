import { contextBridge, ipcRenderer } from 'electron';

// Whitelist of allowed channels for security
const validSendChannels = ['toMain'] as const;
const validReceiveChannels = ['fromMain'] as const;

type ValidSendChannel = typeof validSendChannels[number];
type ValidReceiveChannel = typeof validReceiveChannels[number];

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Send messages to the main process
  send: (channel: ValidSendChannel, data: unknown) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  
  // Receive messages from the main process
  receive: (channel: ValidReceiveChannel, callback: (...args: unknown[]) => void) => {
    if (validReceiveChannels.includes(channel)) {
      const subscription = (_event: Electron.IpcRendererEvent, ...args: unknown[]) => 
        callback(...args);
        
      ipcRenderer.on(channel, subscription);
      
      // Return a function to remove the event listener
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    }
    
    return () => {}; // Return empty function if channel is not valid
  },
  
  // You can add more API methods here if needed
  // For example, a method to open files using Electron's dialog
  // openFile: () => ipcRenderer.invoke('dialog:openFile'),
});

// Optional: notify the renderer process that the preload script has loaded
window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script has loaded successfully');
});