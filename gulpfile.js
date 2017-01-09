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

gulp.task('js', function(){
	return gulp.src([
		'./node_modules/jquery/dist/jquery.min.js',
		'./src/js/poseidon.js'
	])
	.pipe(plugins.concat('all.js'))
	.pipe(plugins.uglify())
	.pipe(gulp.dest('./public/js'))
	.pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src('./src/html/*.html')
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch',function(){
	gulp.watch('./src/sass/*.scss', ['css']);
	gulp.watch('./src/html/*.html', ['html']);
	gulp.watch('./src/js/*.js', ['js']);
	gulp.watch('./server.js',['nodemon']);
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

gulp.task('default', ['css','js', 'html','watch', 'nodemon','browserSync']);
