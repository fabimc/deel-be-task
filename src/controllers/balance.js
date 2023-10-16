
const { profileService } = require('../services') 

const deposit = async (req, res) => {
  const { userId } = req.params
  const amount = Number(req.body.amount)

  let deposit = null
  try {
    deposit = await profileService.deposit(userId, amount)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }

  res.json(deposit).end()
}

module.exports = { deposit }