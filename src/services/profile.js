const { Op, QueryTypes } = require('sequelize')
const { sequelize } = require('../core/database')
const { Contract, Job, Profile } = require('../models')

const getBestClients = async (start, end, limit = 2) => {
  const rawQuery = `SELECT p.id, (p.firstName || ' ' || p.lastName) AS fullName, SUM(j.price) AS paid
  FROM Profiles AS p
  JOIN Contracts AS c ON p.id = c.ClientId
  JOIN Jobs AS j ON c.id = j.ContractId
  WHERE j.paid = 1
    AND j.paymentDate BETWEEN :start AND :end
  GROUP BY p.id
  ORDER BY paid DESC
  LIMIT :limit;`

  const bestClients = await sequelize.query(rawQuery, {
    replacements: { start, end, limit },
    type: QueryTypes.SELECT
  })

  return bestClients

}

getBestProfession = async (start, end) => {
  const rawQuery = `SELECT p.firstName, p.lastName, SUM(j.price) AS totalEarnings
  FROM Profiles AS p
  JOIN Contracts AS c ON p.id = c.ContractorId
  JOIN Jobs AS j ON c.id = j.ContractId
  WHERE j.paid = 1 AND j.paymentDate BETWEEN :start AND :end
  GROUP BY p.id
  ORDER BY totalEarnings DESC
  LIMIT 1;`

  const bestContractor = await sequelize.query(rawQuery, {
    replacements: { start, end },
    type: QueryTypes.SELECT
  })

  return bestContractor
}

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



module.exports = { getBestProfession, getBestClients, getProfile, deposit }
