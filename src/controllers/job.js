
const { jobService } = require('../services') 

const getUnpaidJobs = async (req, res) => {
  const profileId = req.profile.id

  const jobs = await jobService.getUnpaidJobs(profileId)
  
  if (!jobs) return res.status(404).end()
  res.json(jobs).end()
}

const payJob = async (req, res) => {
  const profileId = req.profile.id
  const { job_id } = req.params

  let paidJob = null
  try {
    paidJob = await jobService.payJob(job_id, profileId)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }

  res.json(paidJob).end()
}

module.exports = { getUnpaidJobs, payJob }