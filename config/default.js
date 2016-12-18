module.exports = {

  client: {
    meta: {
      title: 'Domo Bootsy'
    }
  },

  server: {
    port: 8000,
    host: '0.0.0.0',

    // list of files synced with the server
    sync: [
      'package.json',
      'config/**',
      'dist/**',
      '!dist/**/*.js.map',
      '!dist/**/*.css.map'
    ]
  },

  webpackDevServer: {
    progress: true,
    noInfo: true,
    https: false,
    stats: { colors: true }
  },

  // webpack build settings
  build: {
    root: 'dist',
    public: 'public',
    static: 'static'
  }
}
