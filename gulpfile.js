const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function () {
  return gulp.src('src/index.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
