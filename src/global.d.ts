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
