const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');
const clean = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const path = require('path');
const url = require('url');
const { readFileSync } = require('fs');
const list = require('./src/data/list.json');

//编译sass
gulp.task('sass', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

//监听sass
gulp.task('watch', () => {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass', 'myCss'))
})

//起服务
gulp.task('server', () => {
    return gulp.src('src')
        .pipe(webserver({
            port: 8886,
            open: true,
            livereload: true,
            middleware: (req, res, next) => {
                let pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('')
                }
                if (pathname === '/api/getData') {
                    res.end(JSON.stringify({ code: 1, data: list }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname
                    res.end(readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

//开发环境
gulp.task('dev', gulp.series('sass', 'server', 'watch'))

//压缩打包css
gulp.task('myCss', () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(clean())
        .pipe(gulp.dest('./bulid/css'))
})

//压缩打包js
gulp.task('coyJs', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./bulid/js'))
})

//压缩打包html
gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./bulid'))
})

//上线环境
gulp.task('build', gulp.parallel('myCss', 'coyJs', 'html'))