const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const Mustache = require('mustache')
const fs = require('fs')
const passport = require('passport')
require('./lib/auth/local');
const { adminRouter, authRouter, balanceRouter, contractRouter, jobRouter } = require('./routes')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(
  session({
    secret: 'secret-for-now',
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, '..', '/public')))

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

// Api routes
app.use('/api/admin', adminRouter)
app.use('/api/auth', authRouter)
app.use('/api/balances', balanceRouter)
app.use('/api/contracts', contractRouter)
app.use('/api/jobs', jobRouter)

// UI routes
app.use('/', (req, res) => {
  const page = fs.readFileSync(path.join(__dirname, '/views/index.mustache'), 'utf8')
  const view = { title: 'API Demo with UI' }
  const output = Mustache.render(page, view)
  res.send(output)
})

module.exports = app
