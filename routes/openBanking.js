const express = require('express')
const router = express.Router()
const { StatusCodes } = require('http-status-codes')

const openBankingController = require('../controller/OpenBankingController')

router.get('/', async (req, res, next) => {
  const result = await openBankingController.find()
  res.status(StatusCodes.OK).json(result)
})

module.exports = router
