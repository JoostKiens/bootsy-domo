const PythonShell = require('python-shell')
const config = require('config')
const express = require('express')
const historyApiFallback = require('connect-history-api-fallback')
const path = require('path')
const app = express()

const pinController = new PythonShell('pinController.py', { scriptPath: path.resolve(__dirname, '..') })
const { port, host } = config.server
const isProduction = process.env.NODE_ENV === 'production'

app.use(historyApiFallback())

if (isProduction) {
  // will serve a static directory
  app.use(express.static(path.resolve(__dirname, '..', config.build.public)))
} else {
  // will serve webpack
  app.use(developmentMiddleware(port, host))
}

app.post('/switch', function (req, res) {
  res.send('Got a POST request')
})

app.listen(port, host)

function developmentMiddleware (port, host) {
  const webpackConfig = require('../build/webpack.config')
  const webpackMiddleware = require('./middleware/webpackMiddleware')

  return webpackMiddleware(webpackConfig, Object.assign({}, config.webpackDevServer, port, host))
}


// sendToPin(true)



function sendToPin (state) {
  // Send JSON data to script of stdin
  pinController.send(JSON.stringify({ state }))
  // Logs print statements from python script
  pinController.on('message', message => { console.log(message) })
  // Executes script
  pinController.end(err => { if (err) throw err })
}
