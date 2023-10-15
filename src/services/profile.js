const { Op } = require('sequelize')
const { sequelize } = require('../core/database')
const { Contract, Job, Profile } = require('../models')

const getProfile = async (id) => await Profile.findByPk(id)

// A client can't deposit more than 25% his total of jobs to pay
const canDeposit = async (profileId, depositAmount, transaction) => {
  const jobsTotal = await Job.sum('price', {
    include: [
      {
        model: Contract,
        where: {
          ClientId: profileId
        },
        attributes: []
      }
    ],
    where: {
      paid: {
        [Op.is]: null
      }
    },
    transaction
  })

  return depositAmount <= jobsTotal * 0.25
}

// Deposits money into the the the balance of a client
const deposit = async (clientId, amount) => {
  const transaction = await sequelize.transaction()
  const client = await Profile.findByPk(clientId)

  try {
    if (!(await canDeposit(clientId, amount, transaction))) {
      throw new Error('A client can’t deposit more than 25% of his total jobs to pay')
    }
    client.balance += amount
    await client.save({ transaction })
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

module.exports = { getProfile, deposit }
