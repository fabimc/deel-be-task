const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const { profileController } = require('../controllers')

const router = express.Router()

router.post('/deposit/:userId', getProfile, profileController.deposit)

module.exports = router
