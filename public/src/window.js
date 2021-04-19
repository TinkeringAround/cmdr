const { BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

// ==============================================================
const { logError, logInfo } = require('./logger')

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

      mainWindow.webContents.openDevTools()

      mainWindow.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
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
