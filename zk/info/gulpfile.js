const gulp = require('gulp'),
    sass = require('gulp-sass'),
    server = require('gulp-webserver'),
    clean = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat');
//编译Sass
gulp.task('devSass', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
});

//监听sass
gulp.task('watch', () => {
    gulp.watch('./src/scss/*.scss', gulp.series('devSass'));
});
//编译js
gulp.task('devJs', () => {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});
//起服务
gulp.task('server', () => {
    return gulp.src('./src/')
        .pipe(server({
            port: 8888,
            open: true,
            livareload: true
        }))
});
//打包
gulp.task('build', () => {
    return gulp.src('./src/css/*.css', './src/js/*.js')
        .pipe(gulp.dest('./dist/'))
});

gulp.task('default', gulp.series('devSass', 'devJs', 'server', 'build', 'watch'));