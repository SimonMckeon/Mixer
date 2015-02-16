var gulp = require('gulp'),
	sass = require('gulp-sass'),
	include = require('gulp-file-include'),
	del = require('del'),
	connect = require('gulp-connect'),
	deploy = require('gulp-gh-pages'),
	plumber = require('gulp-plumber');

gulp.task('css', function () {
	gulp.src('src/main.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('dest'));
});

gulp.task('html', function () {
	gulp.src('src/index.html')
		.pipe(include({
			prefix: '@@',
			basepath: 'src/partials/'
		}))
		.pipe(gulp.dest('dest'));
});

gulp.task('clean', function () {
	del(['dest']);
});

gulp.task('serve', function () {
	connect.server({
		root: 'dest',
		livereload: true
	});
});

gulp.task('deploy', function () {
	return gulp.src('./dest/**/*')
		.pipe(deploy());
})

gulp.task('watch', function () {
	gulp.watch(['**/*.scss', '**/*.html'], ['css', 'html']);
});

gulp.task('default', ['clean', 'html', 'css', 'serve', 'watch']);