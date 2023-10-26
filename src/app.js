const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
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

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
})

module.exports = app
