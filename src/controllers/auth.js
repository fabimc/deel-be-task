
const login = async (req, res) => {
  res.json(req.user).end()
}

module.exports = { login }