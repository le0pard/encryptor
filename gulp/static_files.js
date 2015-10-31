var gulp = require('gulp')
var conf = require('./conf')

// copy static files to public directory
gulp.task('copy-static-files', function() {
  gulp.src(conf.dist.assets)
    .pipe(gulp.dest(conf.dist.assetsDest))
  gulp.src(conf.dist.electron)
    .pipe(gulp.dest(conf.dist.electronDest))
})
