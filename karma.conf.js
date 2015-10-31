const webpackConf = require('./webpack/config')('test')

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files:    [
      './webpack.tests.js'
    ],
    frameworks:    ['phantomjs-shim', 'jasmine'],
    preprocessors: {
      './webpack.tests.js': ['webpack']
    },
    browserNoActivityTimeout: 120000,
    reporters:                ['dots'],
    webpack:                  webpackConf,
    webpackServer:            {
      noInfo: true
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  })
}
