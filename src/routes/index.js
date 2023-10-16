const admin = require('./admin')
const balance = require('./balance')
const contract = require('./contract')
const job = require('./job')

module.exports = {
  adminRouter: admin,
  balanceRouter: balance,
  contractRouter: contract,
  jobRouter: job
}