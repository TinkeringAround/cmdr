const uuid = require('uuid')

// ==============================================================
function createId() {
  return uuid.v1();
}

// ==============================================================
module.exports = {
  createId
}
