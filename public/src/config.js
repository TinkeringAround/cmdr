const { ipcMain, app } = require('electron')
const fs = require('fs')

// ==============================================================
const { ACTION, STATUS } = require('../../src/consts')
const { logError, logInfo } = require('./logger')

// ==============================================================
const CONFIG_PATH = `${app.getAppPath()}\\config.json`

// ==============================================================
function loadConfig(event) {
  try {
    logInfo(`${ACTION.loadConfig} in path ${CONFIG_PATH}`)
    const configRaw = fs.readFileSync(CONFIG_PATH);
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
    logInfo(`${ACTION.updateConfig} in path ${CONFIG_PATH}`)

    if (fs.existsSync(CONFIG_PATH)) fs.unlinkSync(CONFIG_PATH)

    const jsonConfig = JSON.stringify(scripts)
    fs.writeFileSync(CONFIG_PATH, jsonConfig)
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
