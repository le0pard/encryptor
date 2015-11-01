var gulp = require('gulp')
var path = require('path')
var childProcess = require('child_process')
var config = require('../webpack/config')
var webpackBuild = require('../webpack/build')
var webpackDevServer = require('../webpack/server')

function makeWebpackRunner(constructor, configurator) {
  return function(done) {
    var config = configurator.call(null, process.env.NODE_ENV)
    var task = constructor.call(null, config)
    return task(done)
  }
}

gulp.task('build', makeWebpackRunner(webpackBuild, config))

gulp.task('dev_server', function(done) {
  if ('development' === process.env.NODE_ENV)
    makeWebpackRunner(webpackDevServer, config)(done)
  else {
    console.log('webpack-dev-server should work only in development environment')
    done(1)
  }
})

gulp.task('dev', ['dev_server'], function(done) {
  var node = childProcess.spawn('node', [path.resolve(__dirname, '../electron/server')], {
    stdio:  'inherit',
    stderr: 'inherit'
  })
  node.on('close', done)
})
