const gulp = require('gulp'),
	babel = require('gulp-babel'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect');

gulp.task('babel', () => {
	gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['env', 'minify'],
			plugins: ['iife-wrap']
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

gulp.task('sass', () => {
	gulp.src('src/**/*.scss')
		.pipe(sass())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

gulp.task('server', () => {
	connect.server({
		root: ['test', 'dist', 'src'],
		livereload: true,
		port: 8888
	})
});

gulp.task('dev', () => {
	gulp.start('babel');
	gulp.start('sass');
	gulp.watch(['src/**/*.js'], ['babel']);
	gulp.watch(['src/**/*.scss'], ['sass']);
	gulp.start('server');
});
