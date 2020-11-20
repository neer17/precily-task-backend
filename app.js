var express = require('express')
const cors = require('cors')

const indexRouter = require('./routes/index')

const PORT = 8080
var app = express()

app.use(cors())
app.use(express.json())

app.use('/', indexRouter)

app.listen(PORT)
