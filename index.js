const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')
const helmet = require('helmet')
const debug = require('debug')('node-only:server')
const http = require('http')

const app = express()

/**
 * MIDDLEWARE
 */
app.use(helmet()) //set helmet first
app.use(express.json({ limit: '50mb' }))
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/**
 * ROUTES
 */
app.use('/', require('./routes'))
app.use('/api', require('./routes/api'))

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

addErrorHandlers(app)

/**
 * Create HTTP server.
 */
var server = http.createServer(app)

/**
 * Initialize port and server.
 */
var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function addErrorHandlers(app) {
  /**
   * ERROR HANDLERS
   */
  app.use(function (req, res, next) {
    // catch 404 and forward to error handler
    next(createError(404))
  })

  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
