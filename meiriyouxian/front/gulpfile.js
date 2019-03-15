var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
gulp.task('mysass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('mysass'))
})
gulp.task('server', function() {
    return gulp.src('./src/')
        .pipe(server({
            port: 8866,
            open: true,
            livereload: true,
            proxies: [{
                "source": "/list",
                "target": "http://localhost:3000/list"
            }]
        }))
})
gulp.task('dev', gulp.series('mysass', 'server', 'watch'))