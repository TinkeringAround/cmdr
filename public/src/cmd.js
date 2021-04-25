const { ipcMain } = require('electron')
const cmd = require('node-cmd')

// ==============================================================
const { ACTION, STATUS } = require('../../src/consts')
const { logError, logInfo } = require('./logger')

// ==============================================================
const childProcesses = {}

// ==============================================================
function createResponse(id, status, data = null, error = null) {
  return {
    id,
    data,
    error,
    status
  }
}

function handleError(event, id, errorMsg) {
  logError(errorMsg)
  event.reply(ACTION.updateScript, createResponse(id, STATUS.ERROR, null, errorMsg))
}

function runScript(event, { id, exec }) {
  try {
    logInfo(`${ACTION.runScript} id ${id}`)

    childProcesses[id] = cmd.run(exec,
      function(err, data, _) {
        childProcesses[id].stdout.end()
        delete childProcesses[id]

        const response = createResponse(id, STATUS.SUCCESS, data, err)
        event.reply(ACTION.updateScript, response)
        logInfo(`${ACTION.runScript} id ${id} was successful`)
      })

    childProcesses[id].stdout.on('data',
      function(data) {
        const response = createResponse(id, STATUS.RUNNING, data)
        event.reply(ACTION.updateScript, response)
      })

    childProcesses[id].stdout.on('error',
      function(error) {
        handleError(event, id, STATUS.ERROR, error)
      })

    event.reply(ACTION.updateScript, createResponse(id, STATUS.RUNNING))
  } catch (error) {
    const errorMsg = `${ACTION.runScript} id ${id}, raising ${error}`
    handleError(event, id, errorMsg)
  }
}

function killScript(event, { id }) {
  try {
    if (childProcesses[id]) {
      logInfo(`${ACTION.killScript} process with id ${id}`)
      childProcesses[id].stdout.end()
      const killResult = childProcesses[id].kill(0)

      if (!killResult) handleError(event, id, `Error at ${ACTION.killScript} id ${id}`)
      else event.reply(ACTION.updateScript, createResponse(id, STATUS.INACTIVE))

    } else {
      handleError(event, id, `${ACTION.killScript} id ${id}, id does not exist`)
    }
  } catch (error) {
    const errorMsg = `${ACTION.killScript} id ${id}, raising ${error}`
    logError(errorMsg)
    handleError(event, id, errorMsg)
  }
}

function killAllProcesses() {
  try {
    const childProcessesCount = Object.keys(childProcesses).length
    if (childProcessesCount > 0) {
      logInfo(`Start killing ${childProcessesCount} running processes`)
      for (const id of childProcesses) {
        childProcesses[id].kill(1)
      }
    }
  } catch (error) {
    logError(`Killing all processes raised ${error}`)
  }
}


// ==============================================================
try {
  ipcMain.on(ACTION.runScript, runScript)
  ipcMain.on(ACTION.killScript, killScript)
} catch (error) {
  logError(error)
}

// ==============================================================
module.exports = {
  killAllProcesses
}
