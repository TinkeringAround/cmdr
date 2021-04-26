const { app } = require('electron')
process.env['NODE_ENV'] = `${require('electron-is-dev')}`

// ==============================================================
const { logError } = require('./src/logger')
const { createWindow } = require('./src/window')
const { killAllProcesses } = require('./src/cmd')
require('./src/config')

// ==============================================================
process.on('uncaughtException', error =>
  logError(`Main process: Uncaught Exception: ${error}`))

try {
  app.on('ready', createWindow)
  app.on('activate', createWindow)
  app.on('window-all-closed', () => {
    killAllProcesses()
    app.quit()
  })
} catch (error) {
  logError(error)
}
