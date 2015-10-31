var gulp = require('gulp')
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

gulp.task('dev', function(done) {
  if (process.env.NODE_ENV === 'development')
    makeWebpackRunner(webpackDevServer, config)(done)
  else {
    console.log('webpack-dev-server will only work in development environment because of asset paths')
    done(1)
  }
})
