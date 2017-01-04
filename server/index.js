const PythonShell = require('python-shell')
const config = require('config')
const express = require('express')
const historyApiFallback = require('connect-history-api-fallback')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const { port, host } = config.server
const isProduction = process.env.NODE_ENV === 'production'
const pinControllerFile = isProduction ? 'pinController.py': 'pinController.mock.py'
console.log('using: ', pinControllerFile)

app.use(historyApiFallback())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (isProduction) {
  console.log(path.resolve(__dirname, '..', config.build.root, config.build.public))
  // will serve a static directory
  app.use(express.static(path.resolve(__dirname, '..', config.build.root, config.build.public)))
} else {
  // will serve webpack
  app.use(developmentMiddleware(port, host))
}

// static files, not processed by webpack
app.use('/static', express.static(path.resolve(__dirname, '..', config.build.static)))
app.use('/serviceWorker.js', express.static(path.resolve(__dirname, '..', config.build.static, 'serviceWorker.js')))

app.post('/switch', function (req, res) {
  sendToPin(req.body.state)
  res.send('Got a POST request')
})

app.listen(port, host)

function developmentMiddleware (port, host) {
  const webpackConfig = require('../build/webpack.config')
  const webpackMiddleware = require('./middleware/webpackMiddleware')

  return webpackMiddleware(webpackConfig, Object.assign({}, config.webpackDevServer, port, host))
}

function sendToPin (state) {
  const pinController = new PythonShell(pinControllerFile, { scriptPath: path.resolve(__dirname, '..') })
  // Send JSON data to script of stdin
  pinController.send(JSON.stringify({ state }))
  // Logs print statements from python script
  pinController.on('message', message => { console.log(message) })
  // Executes script
  pinController.end(err => { if (err) throw err })
}
