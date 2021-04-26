const { BrowserWindow } = require('electron')
const path = require('path')

// ==============================================================
const { logError, logInfo } = require('./logger')

// ==============================================================
const IS_DEV = process.env['NODE_ENV'] === "true"

// ==============================================================
let mainWindow

// ==============================================================
function createWindow() {
  try {
    if (mainWindow == null) {
      mainWindow = new BrowserWindow({
        width: 1600,
        height: 800,
        minHeight: 600,
        minWidth: 1000,
        webPreferences: {
          nodeIntegration: false,
          preload: __dirname + '/preload.js'
        }
      })

      if (IS_DEV) {
        mainWindow.webContents.openDevTools()
      }

      mainWindow.loadURL(
        IS_DEV ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
      )

      mainWindow.on('closed', () => (mainWindow = null))
      logInfo('Main Window Creation was successful.')
    }
  } catch (error) {
    logError(error)
  }
}

// ==============================================================
module.exports = {
  createWindow
}
