const express = require('express')
const bodyParser = require('body-parser')
const { Op } = require('sequelize')
const { sequelize } = require('./model')
const { getProfile } = require('./middleware/getProfile')
const app = express()
app.use(bodyParser.json())
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id', getProfile, async (req, res) => {
  const { Contract } = req.app.get('models')
  const { id } = req.params
  const profileId = req.profile.id
  const contract = await Contract.findOne({
    where: {
      id,
      [Op.or]: [
        {
          ClientId: profileId
        },
        {
          ContractorId: profileId
        }
      ]
    }
  })
  if (!contract) return res.status(404).end()
  res.json(contract)
})
module.exports = app
