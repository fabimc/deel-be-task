const Contract = require('./contract')
const Job = require('./job')
const Profile = require('./profile')

Contract.belongsTo(Profile, { as: 'Client' })
Contract.hasMany(Job)

Job.belongsTo(Contract)

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })

module.exports = { Contract, Job, Profile }