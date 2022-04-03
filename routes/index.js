
const express = require('express')
const routes = express.Router()

const user = require('./user')
const openbanking = require('./openBanking')

routes.get('/', (req, res, next) => {
  res.json({ 'msg': 'Servidor conectado!' })
})

routes.use('/users', user)
routes.use('/openbanking', openbanking)

module.exports = routes