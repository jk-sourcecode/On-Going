const express = require('express')
const app = express()
const router = express.Router()
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

require('./routes')(app, router)

app.listen(process.env.PORT || 5000)