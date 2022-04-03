const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('cors')

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 8080

app.use('/api', routes)
app.listen(port)

console.log(`Running on http://localhost:${port}`)
