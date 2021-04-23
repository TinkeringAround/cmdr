const ACTION = Object.freeze({
  runCommand: '[COMMAND] Run',
  updateCommand: '[COMMAND] Update',
  killCommand: '[COMMAND] Kill',
  loadConfig: '[CONFIG] Load',
  configLoaded: '[CONFIG] Loaded',
  updateConfig: '[CONFIG] Update'
})

const STATUS = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  RUNNING: 'running',
  INACTIVE: 'inactive',
})

module.exports = {
  ACTION,
  STATUS
}
