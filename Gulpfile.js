var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var open = require('gulp-open');
var watch = require('gulp-watch');
require('babel/register');

var port = process.env.port || 8000;

gulp.task('browserify', function () {
	gulp.src('app/index.jsx')
		.pipe(browserify({
			transform: ['babelify', 'reactify']
		}))
		.pipe(rename('app.built.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('connect', function () {
	connect.server({
		hostname: 'localhost',
		port: port,
		livereload: true
	});
});

gulp.task('jsx', function() {
	gulp.src('js/**/*.jsx')
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['app/**/*.js', 'app/**/*.jsx'], function () {
		gulp.start('browserify');
	});

	gulp.watch('app/**/*.jsx', ['jsx']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect','watch']);
