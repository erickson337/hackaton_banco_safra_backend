const openBankingService = require('../service/OpenBankingService')

const find = async (id) => {
  return await openBankingService.find(id)
}

module.exports = {
  find
}