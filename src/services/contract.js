const { Op } = require('sequelize')
const Contract = require('../models/contract')

const getContract = async (id, profileId) =>
  await Contract.findOne({
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

  module.exports = { getContract }
