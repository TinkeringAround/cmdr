const { ipcMain, app } = require('electron')
const fs = require('fs');

// ==============================================================
const { ACTION, STATUS } = require('../../src/consts')
const { logError, logInfo } = require('./logger')

// ==============================================================
function loadConfig(event) {
  try {
    const appPath = app.getAppPath()
    logInfo(`${ACTION.loadConfig} in path ${appPath}`)
    const configRaw = fs.readFileSync(`${appPath}\\config.json`);
    const config = JSON.parse(configRaw);

    if (config) event.reply(ACTION.configLoaded, {status: STATUS.SUCCESS, config})
    else {
      const errorMsg = `${ACTION.loadConfig}, raising ${error}`
      logError(errorMsg)
      event.reply(ACTION.configLoaded, {status: STATUS.ERROR, error: errorMsg})
    }
  } catch (error) {
    const errorMsg = `${ACTION.loadConfig}, raising ${error}`
    logError(errorMsg)
    event.reply(ACTION.configLoaded, {status: STATUS.ERROR, error: errorMsg})
  }
}

function updateConfig(event, { scripts }) {
  try {
    const appPath = app.getAppPath()
    const configPath = `${appPath}\\config.json`
    logInfo(`${ACTION.updateConfig} in path ${appPath}`)

    if (fs.existsSync(configPath)) fs.unlinkSync(configPath)

    const jsonConfig = JSON.stringify(scripts)
    fs.writeFileSync(configPath, jsonConfig)
  } catch (error) {
    const errorMsg = `${ACTION.updateConfig}, raising ${error}`
    logError(errorMsg)
  }
}

// ==============================================================
try {
  ipcMain.on(ACTION.loadConfig, loadConfig)
  ipcMain.on(ACTION.updateConfig, updateConfig)
} catch (error) {
  logError(error)
}
