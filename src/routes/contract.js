const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const { contractController } = require('../controllers')

const router = express.Router()

router.get('/:id', getProfile, contractController.getContract)
router.get('/', getProfile, contractController.getContracts)

module.exports = router
