import gulp from 'gulp';
import babel from 'gulp-babel';
import copy from 'gulp-copy';
import jsdoc from 'gulp-jsdoc3';
import jsdocConfig from './jsdoc.json';
import clean from 'gulp-clean';
import gulpSequence from 'gulp-sequence';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import rename from 'gulp-rename';
import minify from 'gulp-minify';
 
gulp.task('default', ['build']);

gulp.task('compile', gulpSequence('copy', 'transpile'));

gulp.task('build', gulpSequence(
  'clean',
  'copy',
  'transpile',
  'doc',
  'build:browser',
  'compress:browser',
  'copy:example:browser'
));

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
  gulp.src(['doc', 'dist', 'examples/browser/corenlp.min.js'], { read: false })
        .pipe(clean()));

gulp.task('build:browser', () =>
  browserify('src/index.js', {
    standalone: 'CoreNLP',
    debug: false,
    extensions: ['.js', '.json'],
  })
    .transform('babelify')
    .bundle()
      .pipe(source('index.browser.js'))
      .pipe(gulp.dest('dist/')))

gulp.task('compress:browser', () =>
  gulp.src('dist/index.browser.js')
    .pipe(minify({
        ext: {
            src: '.js',
            min: '.min.js',
        },
    }))
    .pipe(gulp.dest('dist')));

gulp.task('copy:example:browser', () =>
    gulp.src('dist/index.browser.min.js')
      .pipe(rename('corenlp.min.js'))
      .pipe(gulp.dest('examples/browser')))
