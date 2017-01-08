const config = require('config')
const express = require('express')
const historyApiFallback = require('connect-history-api-fallback')
const path = require('path')
const bodyParser = require('body-parser')
const spawn = require('child_process').spawn

const app = express()
const { port, host } = config.server
const isProduction = process.env.NODE_ENV === 'production'
let dataStream = ''

const pinControllerFile = isProduction ? 'pinController.py': 'pinController.mock.py'
//const py = spawn('python', [path.resolve(__dirname, '..', pinControllerFile)])
//const child = spawn('unbuffer', ['-p', py])
const child = spawn('unbuffer', ['python', path.resolve(__dirname, '..', pinControllerFile)])

child.stdin.setEncoding('utf-8')
console.log('using: ', pinControllerFile, child)
/*
  Log data from stdout coming from python script
 */
child.stdout.on('data', data => {
  console.log(data.toString())
  dataStream += data.toString()
})

child.stdout.on('message', data => {
  console.log(data.toString())
  dataStream += data.toString()
})
child.stdout.on('end', () => {
  console.log(dataStream)
  dataStream = ''
})

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
  sendToPin(req.body.state, req.body.index)
  res.send('Got a POST request')
})

app.listen(port, host)

function developmentMiddleware (port, host) {
  const webpackConfig = require('../build/webpack.config')
  const webpackMiddleware = require('./middleware/webpackMiddleware')
  return webpackMiddleware(webpackConfig, Object.assign({}, config.webpackDevServer, port, host))
}

function sendToPin (state, index) {
  console.log('sendToPin', { state, index })
  sendJsonToPy({ state, index })
}

function sendJsonToPy (json) {
  child.stdin.write(JSON.stringify(json))
}
