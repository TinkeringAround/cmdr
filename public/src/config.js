const { ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

// ==============================================================
const isDev = process.env['NODE_ENV'] === 'dev'
const { ACTION, STATUS } = require(isDev ? '../../src/consts' : './consts')
const { logError, logInfo } = require('./logger')

// ==============================================================
const CONFIG_PATH = path.join(process.env['DATA_PATH'], 'config.json')

// ==============================================================
function loadConfig(event) {
  try {
    logInfo(`${ACTION.loadConfig} in path ${CONFIG_PATH}`)

    if (fs.existsSync(CONFIG_PATH)) {
      const configRaw = fs.readFileSync(CONFIG_PATH)
      const config = JSON.parse(configRaw)
      event.reply(ACTION.configLoaded, { status: STATUS.SUCCESS, config })
    } else {
      logInfo(`${ACTION.loadConfig}, no config file found`)
      event.reply(ACTION.configLoaded, { status: STATUS.SUCCESS, config: {} })
    }
  } catch (error) {
    const errorMsg = `${ACTION.loadConfig}, raising ${error}`
    logError(errorMsg)
    event.reply(ACTION.configLoaded, { status: STATUS.ERROR, config: {}, error: errorMsg })
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
