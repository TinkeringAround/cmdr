const ACTION = Object.freeze({
  updateRoute: '[ROUTE] Update',

  addScript: '[SCRIPT] Add',
  deleteScript: '[SCRIPT] Delete',
  killScript: '[SCRIPT] Kill',
  runScript: '[SCRIPT] Run',
  updateScript: '[SCRIPT] Update',

  configLoaded: '[CONFIG] Loaded',
  loadConfig: '[CONFIG] Load',
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
