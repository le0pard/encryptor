/* eslint-disable no-var, strict, global-strict */
/* @flow weak */

'use strict'

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

var loaders = {
  'scss': '!sass-loader',
  'sass': '!sass-loader?indentedSyntax'
}

var browserSupport = {
  browsers: [
    'last 2 version',
    'Chrome 42',
    'Firefox 28',
    'Safari 8',
    'IE 9',
    'iOS 7.1',
    'Android 4.1'
  ]
}

module.exports = function(currentEnv) {
  function isEnv() {
    return Array.prototype.indexOf.call(arguments, currentEnv) >= 0
  }

  function stylesLoaders() {
    return Object.keys(loaders).map(function(ext) {
      var prefix = 'css-loader!autoprefixer-loader?' + JSON.stringify(
        browserSupport)

      var extLoaders = prefix + loaders[ext]
      var loader = isEnv('development', 'test') ? 'style-loader!' + extLoaders :
        ExtractTextPlugin.extract('style-loader', extLoaders)
      return {
        loader: loader,
        test:   new RegExp('\\.(' + ext + ')$')
      }
    })
  }

  var preScripts = {
    development: [
      'webpack-dev-server/client?http://localhost:8888',
      // Why only-dev-server instead of dev-server:
      // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
      'webpack/hot/only-dev-server'
    ],
    test: []
  }
  var preScriptsEnv = preScripts[currentEnv] || []

  var polyfills = {
    intl: [
      './node_modules/intl/dist/Intl.min.js',
      './node_modules/intl/locale-data/jsonp/en.js'
    ],
    es5: [
      './node_modules/es5-shim/es5-shim.js',
      './node_modules/es5-shim/es5-sham.js'
    ]
  }

  var appScripts = ['./src/app.js']

  /* eslint-disable camelcase */
  var entryPoints = {
    app: preScriptsEnv.concat(
      appScripts
    ),
    app_polyfills: preScriptsEnv.concat(
      polyfills.intl,
      polyfills.es5,
      appScripts
    )
  }
  /* eslint-enable camelcase */
  // speed up compilation
  if (isEnv('test'))
    delete entryPoints.app
  else if (isEnv('production'))
    delete entryPoints.app_polyfills

  var config = {
    browserSupport: browserSupport.browsers,
    cache:          isEnv('development'),
    debug:          isEnv('development'),
    devtool:        isEnv('production') ? '' : 'source-map',
    entry:          entryPoints,
    module:         {
      loaders: [{
        loader: 'url-loader?limit=10000',
        test:   /\.(gif|jpg|png|woff|woff2|eot|ttf|svg|ico)$/
      }, {
        exclude: /node_modules/,
        loaders: isEnv('development') ? [
          'react-hot', 'babel-loader'
        ] : [
          'babel-loader'
        ],
        test: /\.(js|jsx)$/
      }, {
        test:    /\.json$/,
        loaders: ['json']
      }].concat(stylesLoaders()),
      noParse: []
    },
    output: isEnv('development') ? {
      path:       path.join(__dirname, '/dist/'),
      filename:   '[name].js',
      publicPath: 'http://localhost:8888/dist/'
    } : {
      path:     'dist/',
      filename: '[name].js'
    },
    plugins: (function() {
      var plugins = [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV':   JSON.stringify(currentEnv),
          'process.env.APP_LOCALE': JSON.stringify(process.env.APP_LOCALE)
        })
      ]
      if (isEnv('development')) {
        plugins.push(
          new webpack.HotModuleReplacementPlugin(),
          // Tell reloader to not reload if there is an error.
          new webpack.NoErrorsPlugin()
        )
      } else if (isEnv('test')) {
        plugins.push(
          new webpack.optimize.DedupePlugin()
        )
      } else {
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app.css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            },
            mangle:    isEnv('production'),
            sourceMap: !isEnv('production')
          })
        )
      }

      return plugins
    })(),
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      root:       [path.join(__dirname, '..', 'src')]
    },
    profile: process.env.PROFILE_WEBPACK
  }

  return config
}
