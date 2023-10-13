const { Op } = require('sequelize')
const { sequelize } = require('../core/database')
const Job = require('../models/job')
const Contract = require('../models/contract')
const Profile = require('../models/profile')

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

// Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.
const payJob = async (id, profileId) => {
  const transaction = await sequelize.transaction()

  // Get the job
  let job = null
  try {
    job = await getJobToPay(id, profileId, transaction)
  } catch (err) {
    await transaction.rollback()
    throw err
  }

  if (!job) {
    await transaction.rollback()
    throw new Error('Job not found or already paid')
  }

  // Pay for the job if possible
  try {
    const contract = await Contract.findByPk(job.ContractId)
    const client = await Profile.findByPk(contract.ClientId)
    const contractor = await Profile.findByPk(contract.ContractorId)

    if (client.balance >= job.price) {
      client.balance -= job.price
      contractor.balance += job.price
      job.paid = true
      job.paymentDate = new Date()

      await job.save({ transaction })
      await client.save({ transaction })
      await contractor.save({ transaction })

      await transaction.commit()
    } else {
      throw new Error('Insufficient funds')
    }
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

const getJobToPay = async (id, profileId, transaction) => {
  let job = null

  try {
    job = await Job.findOne({
      include: [
        {
          model: Contract,
          where: {
            [Op.or]: [
              {
                ClientId: profileId
              }
            ]
          }
        }
      ],
      where: {
        id,
        paid: {
          [Op.is]: null
        }
      },
      lock: transaction.LOCK.UPDATE,
      transaction
    })
  } catch (err) {
    throw err
  }

  return job
}

module.exports = { getUnpaidJobs, payJob }
