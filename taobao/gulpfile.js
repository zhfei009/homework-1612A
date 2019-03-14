/*
 * @Author: 刘祥祥 
 * @Date: 2019-03-12 11:41:00 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-12 14:05:16
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean-css');

gulp.task('scss', function() { //编译scss
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(clean()) //压缩css
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('scss'));
});

gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9898,
            open: true,
            livereload: true,
            fallback: 'index.html'
        }));
});

gulp.task('default', gulp.series('scss', 'server', 'watch'));