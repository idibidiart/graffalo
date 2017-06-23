"use strict"

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

// Lets bring es6 to es5 with this.
// Browserify - crawls your code for dependencies and packages them up into one file. 
// Babelify - a babel plugin for browserify, to make browserify handle es6 including imports.
gulp.task('babel', function() {
	browserify({
    	entries: 'index.js',
    	debug: true
  	})
    .transform(babelify)
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(''));
});

gulp.task('watch',function() {
	gulp.watch('*.js',['babel'])
});

gulp.task('default', ['watch']);
