const gulp = require('gulp')
const gulpSass = require('gulp-sass')
const cssmin = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const webserver = require('gulp-webserver')
const fs = require('fs')
const path = require('path')
const url = require('url')

//开发
//编译scss
gulp.task('Sass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('./src/css'))
})

//监听
gulp.task('watch', () => {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('Sass'))
})

//起服务
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 8080,
            livereload: true,
            proxies: [{
                source: '/get',
                target: 'http://localhost:3000/get'
            }]
        }))
})

gulp.task('dev', gulp.parallel('Sass', 'watch', 'server'))

//上线
//打包Scss
gulp.task('devSass', () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(minsass())
        .pipe(gulp.dest('./build/css'))
})

//打包html
gulp.task('devhtml', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
})

//打包js
gulp.task('devjs', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
})

//执行上线
gulp.task('build', gulp.parallel('devSass', 'devhtml', 'devjs'))