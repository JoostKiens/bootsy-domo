const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

module.exports = function webpackMiddleware (webpackConfig, devServerConfig) {
  const compiler = webpack(webpackConfig)

  return [
    webpackDevMiddleware(compiler, devServerConfig),
    webpackHotMiddleware(compiler)
  ]
}
