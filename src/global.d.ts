interface ElectronAPI {
  ipcRenderer: {
    send: (channel: string, ...args: any[]) => void;
    on: (channel: string, listener: (...args: any[]) => void) => void;
    once: (channel: string, listener: (...args: any[]) => void) => void;
    removeListener: (channel: string, listener: (...args: any[]) => void) => void;
    invoke: (channel: string, ...args: any[]) => Promise<any>;
  };
  shell?: {
    openPath: (filePath: string) => Promise<void>;
  };
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
interface ElectronAPI {
  writeCraftingLog: (logData: any) => void;
  ipcRenderer: {
    invoke: (channel: string, ...args: any[]) => Promise<any>;
    // You can add other ipcRenderer methods here if needed
  };
}

declare interface Window {
  electron?: ElectronAPI;
}
