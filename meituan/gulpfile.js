/*
 * @Author: 刘祥祥 
 * @Date: 2019-03-13 20:05:52 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-13 20:29:06
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const server = require('gulp-webserver');

const fs = require('fs');
const url = require('url');
const path = require('path');

const list = require('./src/data/data.json');

gulp.task('scss', () => { //编译scss
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', () => { //监听scss
    return gulp.watch('./src/scss/*.scss', gulp.series('scss'));
});

gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: (req, res, next) => {
                let { pathname, query } = url.parse(req.url, true);
                pathname = pathname === '/' ? "index.html" : pathname;

                if (pathname == '/favicon.ico') {
                    return res.end("");
                } else if (pathname == 'api/list') {
                    res.end(JSON.stringify({ code: 0, data: list, mes: 'success' }));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});
gulp.task('default', gulp.series('scss', 'server', 'watch'));