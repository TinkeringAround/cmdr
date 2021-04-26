const {
  contextBridge,
  ipcRenderer,
} = require('electron')

// ==========================================================
contextBridge.exposeInMainWorld(
  'electron',
  {
    dispatch: (channel, data) => ipcRenderer.send(channel, data),
    trigger: (channel, data) => ipcRenderer.emit(channel, null, data),
    on: (channel, fn) => ipcRenderer.on(channel, fn),
    isDev: () => process.env['NODE_ENV'] === "true"
  }
)
