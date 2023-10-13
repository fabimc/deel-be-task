const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const { jobController } = require('../controllers')

const router = express.Router()

router.get('/unpaid', getProfile, jobController.getUnpaidJobs)

module.exports = router
