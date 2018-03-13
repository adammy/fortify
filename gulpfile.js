const gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect');

gulp.task('uglify', () => {
	gulp.src('src/**/*.js')
		.pipe(uglify())
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
	gulp.start('uglify');
	gulp.start('sass');
	gulp.watch(['src/**/*.js'], ['uglify']);
	gulp.watch(['src/**/*.scss'], ['sass']);
	gulp.start('server');
});
