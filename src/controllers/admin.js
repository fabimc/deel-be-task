const { jobService } = require('../services')

const getBestProfession = async (req, res) => {
  const start = req.query.start ? new Date(Number(req.query.start)) : new Date().setUTCHours(0, 0, 0, 0)
  const end = req.query.end ? new Date(Number(req.query.end)) : new Date().setUTCHours(23, 59, 59, 999)

  const jobs = await jobService.getBestProfession(start, end)

  if (!jobs) return res.status(404).end()
  res.json(jobs).end()
}

module.exports = { getBestProfession }
