const admin = require('./admin')
const auth = require('./auth')
const balance = require('./balance')
const contract = require('./contract')
const job = require('./job')

module.exports = {
  adminRouter: admin,
  authRouter: auth,
  balanceRouter: balance,
  contractRouter: contract,
  jobRouter: job,
}