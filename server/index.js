const config = require('config')
const express = require('express')
const historyApiFallback = require('connect-history-api-fallback')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const { port, host } = config.server
const isProduction = process.env.NODE_ENV === 'production'
let pins = []

app.use(historyApiFallback())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (isProduction) {
  const five = require('johnny-five')
  const chipio = require('chip-io')
  const board = new five.Board({
    io: new chipio()
  })

  ipns = config.lights.map(l => new five.Pin(l.pinOut, 1))

  board.on('ready', function() {
    // will serve a static directory
    app.use(express.static(path.resolve(__dirname, '..', config.build.root, config.build.public)))
  })
} else {
  // will serve webpack
  app.use(developmentMiddleware(port, host))
}

// static files, not processed by webpack
app.use('/static', express.static(path.resolve(__dirname, '..', config.build.static)))

app.post('/switch', function (req, res) {
  if (isProduction) {
    req.body.state
    ? pins[req.body.index].high()
    : pins[req.body.index].low()
  }
  res.send('Got a POST request')
})

app.listen(port, host)

function developmentMiddleware (port, host) {
  const webpackConfig = require('../build/webpack.config')
  const webpackMiddleware = require('./middleware/webpackMiddleware')
  return webpackMiddleware(webpackConfig, Object.assign({}, config.webpackDevServer, port, host))
}
