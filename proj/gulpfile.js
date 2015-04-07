var gulp       = require('gulp'),
		uglify 		 = require('gulp-uglify'),
		styles     = require('gulp-ruby-sass'),
		prefix     = require('gulp-autoprefixer');
		imagemin   = require('gulp-imagemin'),
		livereload = require('gulp-livereload'),

/*=======================================================*/

function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

/*=======================================================*/

// Name: Uglify Task
// Description: JS minification
gulp.task('uglify', function(){
	gulp.src('js/*.js')
		.pipe(uglify())
		.on('error', errorLog)
		.pipe(gulp.dest('build/js'))
		.pipe(livereload());
});


// Styles Task
// Description: Sass to CSS
gulp.task('styles', function(){
	gulp.src('sass/**/*.sass') // this will find every sass file in the stylus folder
		.pipe(styles())
		.on('error', errorLog)
		.pipe(prefix('last 2 versions')) // first we tell it to prefix the last 2 versions of browsers, and then,-output it to css >
		.pipe(gulp.dest('build/css'))
		.pipe(livereload());
});


// Imagemin Task
// Description: Image Minification
gulp.task('imagemin', function(){
	return gulp.src('img/*')
	  .pipe(imagemin())
	  .pipe(gulp.dest('build/img'));
});


// Watch Task
// Description: Watches and Updates JS Files
gulp.task('watch', function(){
	var server = livereload();
	livereload.listen();
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('stylus/main.styl', ['styles']);
});


// Default tasks
gulp.task('default', ['scripts', 'styles', 'imagemin', 'watch']);