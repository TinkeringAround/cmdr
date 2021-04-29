const { BrowserWindow } = require('electron')
const path = require('path')

// ==============================================================
const { logError, logInfo } = require('./logger')

// ==============================================================
const isDev = process.env['NODE_ENV'] === 'dev'

// ==============================================================
let mainWindow

// ==============================================================
function createWindow() {
  try {
    if (mainWindow == null) {
      mainWindow = new BrowserWindow({
        width: isDev ? 1600 : 1000,
        height: isDev ? 800 : 600,
        minHeight: 600,
        minWidth: 1000,
        webPreferences: {
          nodeIntegration: false,
          preload: __dirname + '/preload.js'
        }
      })

      if (isDev) {
        mainWindow.webContents.openDevTools()
      }

      mainWindow.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`
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
