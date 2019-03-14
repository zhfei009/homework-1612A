const gulp = require('gulp');
const gulpsass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const mincss = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const minhtml = require('gulp-htmlmin');
const webserver = require('gulp-webserver');
const { readFileSync, existsSync } = require('fs');
const { join } = require('path');
const url = require('url');
const listdata = require('./src/data/data');

//编译scss
gulp.task('compilescss', () => {
        return gulp.src('./src/js/**/*.scss')
            .pipe(gulpsass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(gulp.dest('./src/css'))
    })
    //编译js

//监听测试
gulp.task('watch', () => {
    gulp.watch('./src/js/**/*.scss', gulp.series('compilescss'))
})

//起服务测试
gulp.task('server', () => {
        return gulp.src('./src')
            .pipe(webserver({
                port: 1000,
                livereload: true,
                middleware: (req, res, next) => {
                    let { pathname, query } = url.parse(req.url, true);
                    if (req.url.includes('/favicon.ico')) {
                        return res.end(JSON.stringify({ code: 0, status: 404 }))
                    }
                    if (pathname === '/getdata') {
                        res.end(JSON.stringify({ code: 4, data: listdata }))
                    } else {
                        pathname = pathname === '/' ? 'index.html' : pathname;
                        const file = (join(__dirname, 'src', pathname))
                        res.end(readFileSync(file));
                        // if (existsSync(file)) {
                        // res.end(readFileSync(file));
                        // } else {
                        //     res.end({ code: 0, status: 404 })
                        // }
                    }
                }
            }))
    })
    // gulp.task('testserver', gulp.parallel('watch','server'));
    //线上测试压缩
    //压缩scss
gulp.task('miniscss', () => {
        return gulp.src('./src/js/**/*.scss')
            .pipe(mincss())
            .pipe(gulp.dest('./dist/css'))
    })
    //压缩js
gulp.task('minijs', () => {
        return gulp.src('./src/js/**/*.js')
            .pipe(babel())
            .pipe(gulp.dest('./dist/js'))
    })
    //压缩html
gulp.task('minihtml', () => {
        return gulp.src('./src/**/*.html')
            .pipe(minhtml())
            .pipe(gulp.dest('./dist'))
    })
    //压缩图片
gulp.task('minipng', () => {
        return gulp.src('./src/images/**/*.png')
            .pipe(gulp.dest('./dist/images'))
    })
    //压缩JSON
gulp.task('minijson', () => {
    return gulp.src('./src/data/**/*.json')
        .pipe(gulp.dest('./dist/data'))
})
gulp.task('watchs', () => {
    gulp.watch('./src/js/**/*.scss', gulp.series('miniscss'))
    gulp.watch('./src/js/**/*.js', gulp.series('minijs'))
    gulp.watch('./src/**/*.html', gulp.series('minihtml'))
    gulp.watch('./src/images/**/*.png', gulp.series('minipng'))
    gulp.watch('./src/data/**/*.json', gulp.series('minijson'))

})
gulp.task('lineserver', gulp.parallel('watchs', 'watch', 'server'))