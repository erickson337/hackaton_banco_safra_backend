const express = require('express')
const router = express.Router()
const { StatusCodes } = require('http-status-codes')

const userController = require('../controller/UserController')

router.get('/:id', async (req, res, next) => {
  const { id = 1 } = req.params
  const result = await userController.findOne(id)
  res.status(StatusCodes.OK).json(result)
})

module.exports = router
