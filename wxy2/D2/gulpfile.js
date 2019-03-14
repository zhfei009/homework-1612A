/*
 * @Author: wangxinyue 
 * @Date: 2019-03-14 10:59:56 
 * @Last Modified by: wangxinyue
 * @Last Modified time: 2019-03-14 11:49:41
 */

const gulp = require('gulp');
const sass = require('gulp-sass'); //编译sass
const webserver = require('gulp-webserver'); //开启动服务
const uglify = require('gulp-uglify'); //压缩js
// const babel = require('gulp-babel'); //ie6转ie5

//内置模块
const { readFileSync } = require('fs');
const path = require('path');
const url = require('url');
const data = require('./src/data/data.json');

/*--------------------------------开发环境------------------------------------------- */
//编译sass
gulp.task('mySass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})


//开启服务
gulp.task('server', () => {
    return gulp.src('src').pipe(webserver({
        port: 9090,
        open: true,
        livereload: true,
        middleware: function(req, res) {
            //获取路径
            let { pathname, query } = url.parse(req.url, true);
            if (pathname === '/favicon.ico') {
                return res.end('')
            }
            if (pathname === '/api/list') {
                res.end('')
            } else {
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }
    }))

})

//监听sass
gulp.task('watching', function() {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('mySass'))
})

//管理开发任务
gulp.task('dev', gulp.series('mySass', 'server', 'watching'));

/*--------------------------------上线压缩并打包------------------------------------------- */

//上线压缩js
gulp.task('yuglify', () => {
    return gulp.src('./src/js/**/*.js').
    pipe(uglify()).
    pipe(gulp.dest('./build/js'))

})

//打包html
gulp.task('yhtml', () => {
        return gulp.src('./src/js/**/*.html').
        pipe(gulp.dest('./build', ))

    })
    ///打包css
gulp.task('ycss', () => {
    return gulp.src('./src/js/**/*.css').
    pipe(gulp.dest('./build/css'))

})

//上线压缩并打包到build

gulp.task('build', gulp.parallel('yuglify', 'yhtml', 'ycss'))