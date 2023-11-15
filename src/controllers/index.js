const admin = require('./admin')
const contract = require('./contract')
const job = require('./job')
const balance = require('./balance')
const auth = require('./auth')

module.exports = {
  adminController: admin,
  contractController: contract,
  jobController: job,
  balanceController: balance,
  authController: auth
}