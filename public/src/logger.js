const { app } = require('electron')
const fs = require('fs')
const path = require('path')

// ==============================================================
const isDev = process.env['NODE_ENV'] === "dev"
const MAX_FILE_SIZE = 5
const LOG_PATH = path.join(process.env['DATA_PATH'], 'log.txt')

// ==============================================================
function logError(error) {
  const message = getTimestamp() + '   ERROR    ' + error
  if (isDev) console.error(message)
  else writeToLogFile(message)
}

function logInfo(info) {
  const message = getTimestamp() + '   INFO     ' + info
  if (isDev) console.info(message)
  else writeToLogFile(message)
}

function writeToLogFile(message) {
  try {
    if (fs.existsSync(LOG_PATH)) {
      let fd = fs.openSync(LOG_PATH, 'a')
      fs.writeSync(fd, `${message}\n`, null, 'utf8')
      fs.closeSync(fd)
    } else fs.appendFileSync(LOG_PATH, message)
  } catch (error) {}
}

function cleanLogFile() {
  try {
    if (fs.existsSync(LOG_PATH)) {
      const stats = fs.statSync(LOG_PATH)
      if (stats['size'] / 1000000.0 > MAX_FILE_SIZE) fs.writeFileSync(LOG_PATH, '')
    } else writeToLogFile('==========================================================\n')
  } catch (error) {}
}

// ==============================================================
function getTimestamp() {
  const a = new Date(Date.now())
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const year = a.getFullYear()
  const month = months[a.getMonth()]
  const date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate()

  const hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours()
  const min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
  const sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds()

  return hour + ':' + min + ':' + sec + ', ' + date + '. ' + month + ' ' + year
}

// ==============================================================
try {
  logInfo(`===> Running cmdr version ${app.getVersion()}`)
  if (!isDev) cleanLogFile()
} catch (error) {
  logError(error)
}

// ==============================================================
module.exports = {
  logError,
  logInfo
}
