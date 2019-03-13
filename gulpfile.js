var gulp=require('gulp');
var gulpSass=require('gulp-sass');
var gulpServer=require('gulp-webserver');

gulp.task('startServer',function(){
	return  gulp.src('src')
			.pipe(gulpServer({
				port:9999,
// 				proxies:[
// 					{
// 						source:"/getData",
// 						target:"http://localhost:3000/getData"
// 					},
// 					{
// 						source:"/deleData",
// 						target:"http://localhost:3000/deleData"
// 					}
// 				]
			}))
			
})

gulp.task('sass',function(){
	return gulp.src('./src/scss/**/*.scss')
			.pipe(gulpSass())
			.pipe(gulp.dest('./src/css'))
})

gulp.task('watching',function(){
	return gulp.watch('./src/scss/**/*.scss',gulp.series('sass'))
	
})

gulp.task('dev',gulp.series('sass','startServer','watching'))