const gulp = require('gulp');
const htmlImport = require('gulp-html-imports');
const less = require('gulp-less');
const browserSync = require('browser-sync');

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(htmlImport('./src/components/'))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('less', function () {
  return gulp.src('src/styles/main.less')
    .pipe(less())
    .pipe(gulp.dest('build/styles'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('copy', function () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('build/assets'))
    .pipe(browserSync.reload({ stream: true }));
})

gulp.task('default', function () {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  });

  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/styles/**/*.less', gulp.series('less'));
  gulp.watch('src/assets/**/*', gulp.series('copy'));
});