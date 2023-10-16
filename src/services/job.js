const { Op } = require('sequelize')
const { sequelize } = require('../core/database')
const { Contract, Job, Profile } = require('../models')

const getJobToPay = async (id, profileId, transaction) => {
  let job = null

  try {
    job = await Job.findOne({
      include: [
        {
          model: Contract,
          where: {
            ClientId: profileId
          }
        }
      ],
      where: {
        id,
        paid: {
          [Op.is]: null
        }
      },
      transaction
    })
  } catch (err) {
    throw err
  }

  return job
}

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
  let job = null

  try {
    job = await getJobToPay(id, profileId, transaction)
  } catch (err) {
    await transaction.rollback()
    throw err
  }

  // Pay for the job if possible
  try {
    if (!job) {
      throw new Error('Job not found or already paid')
    }
    const contract = await Contract.findByPk(job.ContractId)
    const client = await Profile.findByPk(contract.ClientId)
    const contractor = await Profile.findByPk(contract.ContractorId)

    if (job.price > client.balance) {
      throw new Error('Insufficient funds')
    }

    client.balance -= job.price
    contractor.balance += job.price
    job.paid = true
    job.paymentDate = new Date()

    await job.save({ transaction })
    await client.save({ transaction })
    await contractor.save({ transaction })

    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

module.exports = { getUnpaidJobs, payJob }
