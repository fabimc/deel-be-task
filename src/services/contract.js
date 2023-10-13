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

const getContracts = async profileId =>
  await Contract.findAll({
    where: {
      status: {
        [Op.ne]: 'terminated'
      },
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

module.exports = { getContract, getContracts }
