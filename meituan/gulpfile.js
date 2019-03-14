/*
 * @Author: 刘祥祥 
 * @Date: 2019-03-13 20:05:52 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-14 13:11:06
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const server = require('gulp-webserver');

const clean = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel'); //支持es6

const url = require('url');
const path = require('path');
const { readFileSync } = require('fs');

const list = require('./src/data/data.json');

gulp.task('scss', () => { //编译scss
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', () => { //监听scss
    gulp.watch('./src/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: (req, res, next) => {
                let { pathname, query } = url.parse(req.url, true);

                if (pathname == '/favicon.ico') {
                    return res.end("");
                } else if (pathname == '/api/list') {
                    res.end(JSON.stringify({ code: 0, data: list, mes: 'success' }));
                } else {
                    pathname = pathname === '/' ? "index.html" : pathname;
                    res.end(readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});

//线上的开发任务
gulp.task('dev', gulp.series('scss', 'server', 'watch'));


gulp.task('minScss', () => { //压缩scss
    return gulp.src('./src/scss/**/*.scss')
        .pipe(clean())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('minHtml', () => { //压缩html
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'));
});

gulp.task('minJs', () => { //压缩js
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

// 管理上线任务
gulp.task('build', gulp.parallel('minJs', 'minHtml', 'minScss'));