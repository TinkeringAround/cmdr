const { app } = require('electron')

// ==============================================================
function logError(error) {
  const message = getTimestamp() + '   ERROR    ' + error
  console.error(message)
}

function logInfo(info) {
  const message = getTimestamp() + '   INFO     ' + info
  console.info(message)
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
  console.info(`===> Running cmdr version ${app.getVersion()}`)
} catch (error) {
  logError(error)
}

// ==============================================================
module.exports = {
  logError,
  logInfo
}
