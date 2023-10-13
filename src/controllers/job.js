
const { jobService } = require('../services') 

const getUnpaidJobs = async (req, res) => {
  const profileId = req.profile.id

  const jobs = await jobService.getUnpaidJobs(profileId)
  
  if (!jobs) return res.status(404).end()
  res.json(jobs)
}

module.exports = { getUnpaidJobs }