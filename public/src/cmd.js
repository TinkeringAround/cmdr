const { ipcMain } = require('electron')
const cmd = require('node-cmd')

// ==============================================================
const { ACTION, STATUS } = require('../../src/consts')
const { logError, logInfo } = require('./logger')
const { createId } = require('./id')

// ==============================================================
const childProcesses = {}

// ==============================================================
function createResponse(id, data = null, error = null) {
  return {
    id,
    data,
    error,
    status: data ? STATUS.SUCCESS : STATUS.ERROR
  }
}

function handleError(errorMsg, event) {
  logError(errorMsg)
  event.reply(ACTION.errorCommand, createResponse(id, null, errorMsg))
}

function runCommand(event, command) {
  const id = createId()
  try {
    logInfo(`Try running command with id ${id}`)

    childProcesses[id] = cmd.run(command,
      function(err, data, _) {
        const response = createResponse(id, data, err)
        delete childProcesses[id]
        event.reply(ACTION.updateCommand, response)
        logInfo(`Running command with id ${id} was successful`)
      })

    event.reply(ACTION.updateCommand, createResponse(id, {}))
  } catch (error) {
    const errorMsg = `Could not run command with id ${id}, raising error ${error}`
    handleError(errorMsg, event)
  }
}

function killCommand(event, commandId) {
  try {
    logInfo(`Killing command with id ${commandId}`)
    if (childProcesses[commandId]) {
      childProcesses[commandId].kill(1)
      event.reply(ACTION.updateCommand, createResponse(commandId, {}))
    }
  } catch (error) {
    const errorMsg = `Could not kill command with id ${commandId}, raising error ${error}`
    handleError(errorMsg, event)
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
    logError(`Killing all processes raised an error ${error}`)
  }
}


// ==============================================================
try {
  ipcMain.on('[COMMAND] Run', runCommand)
  ipcMain.on('[COMMAND] Kill', killCommand)
} catch (error) {
  logError(error)
}

// ==============================================================
module.exports = {
  killAllProcesses
}
