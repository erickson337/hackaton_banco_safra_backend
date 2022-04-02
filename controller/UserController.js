const userService = require('../service/UserService')

const findOne = async (id) => {
  return userService.findOne(id)
}

module.exports = {
  findOne
}