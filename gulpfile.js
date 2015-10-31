'use strict'

var gulp = require('gulp')
var path = require('path')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.NODE_PATH = [
  path.join(__dirname, 'src'),
  path.join(__dirname, 'node_modules')
].join(':')

process.env.APP_LOCALE = process.env.APP_LOCALE || 'en'

require('./gulp/dist')
require('./gulp/dev')

require('./gulp/eslint')
require('./gulp/karma')
require('./gulp/test')

gulp.task('default', ['dev'])
