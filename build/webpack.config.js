var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = require('config')

var isProduction = process.env.NODE_ENV === 'production'
var enableHmr = !isProduction

var NO_PLUGIN = { apply: () => {} }

var inlineCssLoader = [
  'style',
  'css?modules&localIdentName=[name]--[local]--[hash:base64:5]',
  'postcss'
].join('!')

var extractCssLoader = ExtractTextPlugin.extract('style', [
  'css?modules&localIdentName=[hash:base64:5]',
  'postcss'
].join('!'))

var appFiles = [ './client/main.js' ]

if (enableHmr) {
  appFiles = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    ...appFiles
  ]
}

module.exports = {
  entry: {
    app: ['whatwg-fetch', ...appFiles]
  },

  output: {
    path: path.join(__dirname, '..', config.build.root, config.build.public),
    publicPath: '/',
    filename: isProduction ? '[name].[hash].js' : '[name].js',
    devtoolModuleFilenameTemplate: '/[resource-path]'
  },

  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          env: {
            development: {
              plugins: ['react-hot-loader/babel']
            }
          }
        }
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: isProduction ? extractCssLoader : inlineCssLoader },
      { test: /\.svg$/, loader: 'url?limit=5000&mimetype=image/svg+xml' },
      { test: /\.gif$/, loader: 'url?limit=5000&mimetype=image/gif' },
      { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file' },
      {
        test: /\.(png|jpe?g)$/,
        loaders: [
          'file',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
          'image-maxsize-webpack?useImageMagick=true'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.png'],
    root: [
      path.resolve(__dirname, '../client')
    ],
    alias: {
      config: path.resolve(__dirname, '../client/config.js'),
      universal: path.resolve(__dirname, '../universal')
    }
  },

  postcss: function (webpack) {
    return [
      require('postcss-import')({
        root: path.join(__dirname, '..'),
        path: 'client'
      }),
      require('postcss-url')(),
      require('postcss-mixins')(),
      require('postcss-cssnext')({
        browsers: 'last 2 versions',
        sourcemap: true,
        features: {
          autoprefixer: {
            remove: false // faster if not processing legacy css
          }
        }
      }),
      require('postcss-browser-reporter')()
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'build/template.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'BUILD_NUMBER': JSON.stringify(process.env.BUILD_NUMBER),
        'BROWSER': true
      },
      __CONFIG__: JSON.stringify(config.app)
    }),
    new ExtractTextPlugin(null, '[name].[contenthash].css', {
      disable: !isProduction,
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    enableHmr ? new webpack.HotModuleReplacementPlugin() : NO_PLUGIN,
    new webpack.NoErrorsPlugin()
  ]
}
