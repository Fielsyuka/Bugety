"use strict";
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', function (done) {
  browserify({
      entries: './src/app.js'
  })
  .transform(babelify)
  .bundle()
  .pipe(source("bundle.js"))
  .pipe(gulp.dest("./dist"));
  done();
});