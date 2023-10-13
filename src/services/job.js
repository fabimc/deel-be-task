const { Op } = require('sequelize')
const Job = require('../models/job')
const Contract = require('../models/contract')

const getUnpaidJobs = async (profileId) =>
  await Job.findAll({
    include: [
      {
        model: Contract,
        where: {
          [Op.or]: [
            {
              ClientId: profileId
            },
            {
              ContractorId: profileId
            }
          ]
        }
      }
    ],
    where: {
      paid: {
        [Op.is]: null
      }
    }
  })

module.exports = { getUnpaidJobs }
