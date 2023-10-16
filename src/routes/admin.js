const express = require('express')
const { adminController } = require('../controllers')

const router = express.Router()

router.get('/best-profession', adminController.getBestProfession)

module.exports = router
