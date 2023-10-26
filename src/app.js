const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Mustache = require('mustache')
var fs = require('fs')
const { adminRouter, balanceRouter, contractRouter, jobRouter } = require('./routes')

const app = express()
app.use(bodyParser.json())

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

// Api routes
app.use('/api/admin', adminRouter)
app.use('/api/balances', balanceRouter)
app.use('/api/contracts', contractRouter)
app.use('/api/jobs', jobRouter)

// UI routes
app.use('/', (req, res) => {
  const page = fs.readFileSync(path.join(__dirname, '/views/index.tpl')).toString()
  const view = { title: 'Contracts’ Landing Page' }
  const output = Mustache.render(page, view)
  res.send(output)
})

module.exports = app
