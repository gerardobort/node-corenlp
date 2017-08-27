const gulp = require('gulp');
const babel = require('gulp-babel');
const copy = require('gulp-copy');

gulp.task('default', ['copy', 'transpile']);

gulp.task('transpile', function () {
  return gulp.src(['src/*', 'src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  return gulp.src(['src/**/*.json'])
    .pipe(copy('./dist', { prefix: 1 }))
    .pipe(gulp.dest('dist'));
});
