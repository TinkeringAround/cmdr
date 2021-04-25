const ACTION = Object.freeze({
  runScript: '[SCRIPT] Run',
  updateScript: '[SCRIPT] Update',
  deleteScript: '[SCRIPT] Delete',
  killScript: '[SCRIPT] Kill',
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
