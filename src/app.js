const express = require('express')
const bodyParser = require('body-parser')
const { contractRouter, jobRouter } = require('./routes')

const app = express()
app.use(bodyParser.json())

app.use('/contracts', contractRouter)
app.use('/jobs', jobRouter)

module.exports = app
