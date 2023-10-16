const { profileService } = require('../services')

const getBestProfession = async (req, res) => {
  const start = req.query.start ? new Date(Number(req.query.start)) : new Date().setUTCHours(0, 0, 0, 0)
  const end = req.query.end ? new Date(Number(req.query.end)) : new Date().setUTCHours(23, 59, 59, 999)

  const bestContractor = await profileService.getBestProfession(start, end)

  if (!bestContractor) return res.status(404).end()
  res.json(bestContractor).end()
}

const getBestClients = async (req, res) => {
  const start = req.query.start ? new Date(Number(req.query.start)) : new Date().setUTCHours(0, 0, 0, 0)
  const end = req.query.end ? new Date(Number(req.query.end)) : new Date().setUTCHours(23, 59, 59, 999)
  const limit = req.query.end ? Number(req.query.limit) : 2

  const bestClients = await profileService.getBestClients(start, end, limit)

  if (!bestClients) return res.status(404).end()
  res.json(bestClients).end()
}

module.exports = { getBestClients, getBestProfession }
