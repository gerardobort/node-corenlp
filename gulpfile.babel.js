import gulp from 'gulp';
import babel from 'gulp-babel';
import copy from 'gulp-copy';
import jsdoc from 'gulp-jsdoc3';
import jsdocConfig from './jsdoc.json';
import clean from 'gulp-clean';
import gulpSequence from 'gulp-sequence';
 
gulp.task('default', ['build']);

gulp.task('build', gulpSequence('clean', 'copy', 'transpile', 'doc'));

gulp.task('transpile', () =>
  gulp.src(['src/*', 'src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist')));

gulp.task('copy', () =>
  gulp.src(['src/**/*.json'])
    .pipe(copy('./dist', { prefix: 1 }))
    .pipe(gulp.dest('dist')));

gulp.task('doc', () => 
    gulp.src(['README.md', 'src/**/*.js', '!src/**/*.spec.js'], { read: false })
        .pipe(jsdoc(jsdocConfig)));

gulp.task('clean', () =>
  gulp.src(['doc', 'dist'], { read: false })
        .pipe(clean()));

