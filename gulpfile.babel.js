'use strict';

import fs from 'fs';
import gulp from 'gulp';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import copy from 'gulp-copy';
import gulpJsdoc2md from 'gulp-jsdoc-to-markdown';

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

gulp.task('doc', () => {
  return gulp.src([
      'src/**/*.js',
      '!src/**/*.spec.js', // omit tests
      '!src/pipeline.js', // omit ES2017 async files, also customized comma-dangle
                          // to pass lt ES2017 (see .eslintrc)
    ])
    .pipe(concat('README.md'))
    .pipe(gulpJsdoc2md({
      template: fs.readFileSync('jsdoc2md/README.hbs', 'utf-8')
    }))
    .pipe(gulp.dest(''));
});
