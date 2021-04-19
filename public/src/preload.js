const {
  contextBridge,
  ipcRenderer
} = require('electron')

// ==========================================================
contextBridge.exposeInMainWorld(
  'electron',
  {
    invoke: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, fn) => ipcRenderer.on(channel, fn)
  }
)
