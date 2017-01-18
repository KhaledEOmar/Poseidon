var gulp = require('gulp'),
	plugins= require('gulp-load-plugins')(),
	browserSync = require('browser-sync').create();


gulp.task('css', function(){
	//compile sass
	// output file to a dist
	
	return gulp.src(['./src/sass/main.scss'])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass().on('error', plugins.sass.logError))
		.pipe(plugins.cssmin())
		.pipe(plugins.autoprefixer())
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest('./public/css'))
		.pipe(browserSync.stream());;
});

gulp.task('mainJS', function(){
	return gulp.src([
		'./src/js/*.js'
	])
	.pipe(gulp.dest('./public/js'))
	.pipe(browserSync.stream());
});

gulp.task('ctrlJS', function(){
	return gulp.src([
		'./src/js/controllers/*.js'
	])
	.pipe(gulp.dest('./public/js/controllers'))
	.pipe(browserSync.stream());
});

gulp.task('servicesJS', function(){
	return gulp.src([
		'./src/js/services/*.js'
	])
	.pipe(gulp.dest('./public/js/services'))
	.pipe(browserSync.stream());
});

gulp.task('indexHTML', function() {
  return gulp.src('./src/html/index.html')
    .pipe(gulp.dest('./public'))
	.pipe(browserSync.stream());
});

gulp.task('partialHTML', function() {
  return gulp.src('./src/html/partial/*.html')
    .pipe(gulp.dest('./public/partial'))
	.pipe(browserSync.stream());
});

gulp.task('imgs', function() {
  return gulp.src('./src/imgs/*.*')
    .pipe(gulp.dest('./public/imgs'));
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/*.*')
    .pipe(gulp.dest('./public/fonts'));
});


gulp.task('watch',function(){
	gulp.watch('./src/sass/*.scss', ['css']);
	gulp.watch('./src/html/*.html', ['indexHTML']);
	gulp.watch('./src/html/partial/*.html', ['partialHTML']);
	gulp.watch('./src/js/*.js', ['mainJS']);
	gulp.watch('./src/js/controllers/*.js', ['ctrlJS']);
	gulp.watch('./src/js/services/*.js', ['servicesJS']);
	gulp.watch('./src/imgs/*.*',['imgs']);
	gulp.watch('./src/fonts/*.*',['fonts']);
	gulp.watch('*.html').on('change',browserSync.reload);
});

gulp.task('browserSync',function(){
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: ["public/**/*.*"],
        port: 7000
	});
});
	
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return plugins.nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('default', ['css','mainJS', 'ctrlJS', 'servicesJS', 'indexHTML', 'partialHTML','watch', 'imgs', 'fonts', 'nodemon','browserSync']);
