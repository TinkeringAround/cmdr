const ACTION = Object.freeze({
  runCommand: '[COMMAND] Run',
  updateCommand: '[COMMAND] Update',
  errorCommand: '[COMMAND] Error',
  killCommand: '[COMMAND] Kill'
})

const STATUS = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error'
})

module.exports = {
  ACTION,
  STATUS
}
