const gulp = require('gulp');

const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const minCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlMin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const path = require('path');
const url = require('url');
const { readFileSync } = require('fs');
const dataJson = require('./src/data/list');
//编译scss
gulp.task('devScss', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});
//监听scss
gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('devScss'))
});
//起服务
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9090,
            open: true,
            middleware: (req, res, next) => {
                let { pathname, query } = url.parse(req.url, true);
                if (pathname === '/favicon.ico') {
                    return res.end('');
                }
                if (pathname === '/api/lists') {
                    res.end(JSON.stringify({ code: 1, data: dataJson }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
});
gulp.task('dev', gulp.series('devScss', 'server', 'watch'));
//压缩css
gulp.task('devCss', () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('./bulid/css'))
});
//压缩js
gulp.task('devJs', () => {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./bulid/scripts'))
});
//压缩html
gulp.task('minHTML', () => {
    return gulp.src('./src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./bulid'))
});
//上线
gulp.task('bulid', gulp.parallel('devCss', 'devJs', 'minHTML'));