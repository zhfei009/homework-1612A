var gulp=require('gulp');
var sass=require('gulp-sass');
var server=require('gulp-webserver');
gulp.task('mysass',function(){
	return gulp.src('./src/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./src/css'))
})
gulp.task('server',function(){
	return gulp.src('./src/')
	.pipe(server({
		port:8800,
		open:true,
		livereload:true
	}))
})
gulp.task('watch',function(){
	gulp.watch('./src/scss**/*.scss',gulp.series('mysass'))
})
gulp.task('default',gulp.series('mysass','server','watch'))