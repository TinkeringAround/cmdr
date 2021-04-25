const {
  contextBridge,
  ipcRenderer,
  ipcMain
} = require('electron')

// ==========================================================
contextBridge.exposeInMainWorld(
  'electron',
  {
    dispatch: (channel, data) => ipcRenderer.send(channel, data),
    trigger: (channel, data) => ipcRenderer.emit(channel, null, data),
    on: (channel, fn) => ipcRenderer.on(channel, fn)
  }
)
