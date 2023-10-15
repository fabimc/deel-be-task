const balance = require('./balance')
const contract = require('./contract')
const job = require('./job')

module.exports = {
  balanceRouter: balance,
  contractRouter: contract,
  jobRouter: job
}