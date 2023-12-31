
const { contractService } = require('../services') 

const getContract = async (req, res) => {
  const { id } = req.params
  const profileId = req.profile.id

  const contract = await contractService.getContract(id, profileId)
  
  if (!contract) return res.status(404).end()
  res.json(contract)
}

const getContracts = async (req, res) => {
  const profileId = req.profile.id

  const contracts = await contractService.getContracts(profileId)
  
  if (!contracts) return res.status(404).end()
  res.json(contracts)
}

module.exports = { getContract, getContracts }