/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

var gulp = require('gulp')

gulp.task('set-prod-env', function() {
  process.env.NODE_ENV = 'production'
  process.env.APP_LOCALE = 'en'
})

gulp.task('dist', ['set-prod-env', 'copy-static-files', 'build'])
