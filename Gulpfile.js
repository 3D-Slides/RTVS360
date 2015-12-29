var gulp = require('gulp');
var reactify = require('reactify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var glob = require('glob');
var buffer = require('vinyl-buffer');
var streamify = require('gulp-streamify');

gulp.task('watchify', function() {
	var bundler = browserify({
		entries: ['./client/main.jsx'],
		transform: [reactify],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	});

	var watcher = watchify(bundler);

	return watcher
		.on('update', function() {
			watcher.bundle()
			.on('error', function(err) {
				console.log('There was an error compiling the components.', err.message);
			})
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./dest/'));
		})
		.bundle()
		.on('error', function(err) {
			console.log('There was an error compiling the components.', err.message);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dest/'));
});

gulp.task('browserify', function() {
	var testFiles = glob.sync('./client/main.jsx');
	var bundler = browserify({
		entries: testFiles,
		transform: [reactify],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	});

	function rebundle () {
		bundler
		.bundle()
		.on('error', function(err) {
			console.log('There was an error compiling the components.', err.message);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dest/'));
	}
	return rebundle();
});

gulp.task('home', function() {
	var testFiles = glob.sync('./client/homepage.jsx');
	var bundler = browserify({
		entries: testFiles,
		transform: [reactify],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	});

	function rebundle() {
		bundler
		.bundle()
		.on('error', function(err) {
			console.log('There was an error compiling the components.', err.message);
		})
		.pipe(source('homeBundle.js'))
		.pipe(gulp.dest('./dest/'));
	}


	return rebundle();
});

gulp.task('default', ['browserify', 'home']);