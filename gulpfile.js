var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');

gulp.task('sass',function() {
    return gulp.src('./src/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
})

gulp.task('server',function() {
    return gulp.src('src')
    .pipe(server({
        open : true,
        potr :　'8585',
        liveraload : true,
    }))
})

gulp.task('watch',function() {
    gulp.watch('./src/*.scss',gulp.series('sass'))
})

gulp.task('dev',gulp.series('server','watch'));