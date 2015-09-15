var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var open = require('gulp-open');
var watch = require('gulp-watch');
var mocha = require('gulp-mocha');
require('babel/register');

var port = process.env.port || 8000;

gulp.task('browserify', function () {
	gulp.src('react_components/app.jsx')
		.pipe(browserify({
			transform: ['babelify', 'reactify']
		}))
		.pipe(rename('app.built.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('open', function(){
	var options = {
		url: 'http://localhost:' + port
	};

	gulp.src('index.html')
	.pipe(open('', options));
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

gulp.task('html', function(){
	gulp.src('*.html')
	.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['react_components/**/*.js', 'react_components/**/*.jsx'], function () {
		gulp.start('browserify');
	});

	gulp.watch('index.html', ['html']);
	gulp.watch('react_components/**/*.jsx', ['jsx']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open' ,'watch']);
