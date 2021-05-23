const estabelecimentos = require('./routes/estabelecimentosRoutes')

const express = require('express')

const cors = require ('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/estabelecimentos', estabelecimentos)


module.exports = app