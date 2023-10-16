const express = require('express')
const bodyParser = require('body-parser')
const { adminRouter, balanceRouter, contractRouter, jobRouter } = require('./routes')

const app = express()
app.use(bodyParser.json())

app.use('/admin', adminRouter)
app.use('/balances', balanceRouter)
app.use('/contracts', contractRouter)
app.use('/jobs', jobRouter)

module.exports = app
