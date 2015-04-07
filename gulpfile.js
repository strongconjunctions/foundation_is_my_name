var gulp       = require('gulp'),
		jade       = require('gulp-jade'),
		tinylr 		 = require('tiny-lr'),
		uglify 		 = require('gulp-uglify'),
		styles     = require('gulp-stylus'),
		prefix     = require('gulp-autoprefixer'),
		plumber    = require('gulp-plumber'),
		imagemin   = require('gulp-imagemin'),
		livereload = require('gulp-livereload');

/*=======================================================*/

/* function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
} */

/*=======================================================*/

// Name: Uglify Task
// Description: JS minification
// Task Build Status: Works
gulp.task('uglify', function(){
	gulp.src('js/*.js')
		.pipe(plumber({
				errorHandler: onError
			}))
		.pipe(uglify())
		.pipe(gulp.dest('build/assets/js'))
});



// Styles Task
// Task Build Status:
gulp.task('styles', function(){
	gulp.src('stylus/main.styl')
		.pipe(plumber())
		.pipe(styles({
			compress: true,
			errLogToConsole: true
		}))
		.pipe(gulp.dest('build/assets/css'))
});



// Templates Task
// Task Build Status: Works
gulp.task('templates', function() {
  return gulp.src('jade/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('build/'))
});


// Imagemin Task
// Description: Image Minification
gulp.task('imagemin', function(){
	return gulp.src('img/*')
		.pipe(plumber())
	  .pipe(imagemin())
	  .pipe(gulp.dest('build/assets/img'));
});


// Watch Task
gulp.task('watch', function () {
		/* livereload.listen(); */
    gulp.watch('stylus/main.styl', ['styles']);
  	gulp.watch('js/*.js', ['uglify']);
    gulp.watch('jade/*.jade',['templates']);

});


// Default tasks
gulp.task('default', ['watch'], function(){

});




/*// Livereload task
gulp.task('livereload', function() {
  tinylr.listen(35729);  // or 4002
}); */
