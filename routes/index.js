
const express = require('express')
const routes = express.Router()

const user = require('./user.js')

routes.get('/', (req, res, next) => {
	res.json({ 'msg': 'Servidor conectado!' })
})

routes.use('/users', user)

module.exports = routes