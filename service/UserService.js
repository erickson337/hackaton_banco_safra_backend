const { User } = require('../models/User')

const user = new User(1, 'Pedro', 'pedro@outlook.com', 'pedro1992', '@#@W$fa1')

const findOne = (id) => {
  return user.toDTO();
}

module.exports = {
  findOne
}