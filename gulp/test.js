/* eslint-env node */
/* eslint-disable no-var */

var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('set-test-env', function() {
  process.env.NODE_ENV = 'test'
  process.env.APP_LOCALE = 'en'
})

gulp.task('test', ['set-test-env'], function(done) {
  runSequence('eslint', 'karma', done)
})
