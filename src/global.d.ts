interface ElectronAPI {
  writeCraftingLog: (logData: any) => void;
}

declare interface Window {
  electron?: ElectronAPI;
}
