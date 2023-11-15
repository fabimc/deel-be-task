const express = require('express')
const passport = require('passport')
const { authController } = require('../controllers')

const router = express.Router()

router.post('/login', passport.authenticate('local'), authController.login);

module.exports = router