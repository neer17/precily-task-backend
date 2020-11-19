var express = require('express')
const cors = require('cors')
// var createError = require('http-errors')

const indexRouter = require('./routes/index')

const PORT = 8080
var app = express()

/* app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
}) */

app.use(cors())
app.use(express.json())

/* app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err,
  })
}) */

app.use('/', indexRouter)

app.listen(PORT)
