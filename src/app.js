const express = require('express')
const bodyParser = require('body-parser')
const { contractRouter } = require('./routes')

const app = express()
app.use(bodyParser.json())

app.use('/', contractRouter)

module.exports = app
