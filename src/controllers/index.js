const admin = require('./admin')
const contract = require('./contract')
const job = require('./job')
const balance = require('./balance')

module.exports = {
  adminController: admin,
  contractController: contract,
  jobController: job,
  balanceController: balance
}