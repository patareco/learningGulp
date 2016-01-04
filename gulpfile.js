var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];

var jsSources = ['components/scripts/rclick.js',
				 'components/scripts/pixgrid.js',
				 'components/scripts/tagline.js',
				 'components/scripts/template.js'];

var sassSources =  ['components/sass/style.scss']


gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({ bare:true })
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
})

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('scripts.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
})

gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded' //nested,expanded,compressed,compact
		})
		.on('error', gutil.log))
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())
});


gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
});


gulp.task('connect', function(){
	connect.server({
		root: 'builds/development/',
		livereload: true
	});
});

gulp.task('default', ['coffee', 'js', 'compass', 'log', 'connect', 'watch']);

gulp.task('log', function(){
	gutil.log('All done! Have a wonderful day! :)')
})