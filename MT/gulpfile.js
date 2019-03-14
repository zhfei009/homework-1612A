const gulp = require('gulp');
const webserver = require('gulp-webserver');
const gulpSass = require('gulp-sass');
const minCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const url = require('url');
const fs = require('fs');
const path = require('path');
const data = require('./src/data/data')
    //编译sass
gulp.task('devCss', () => {
        return gulp.src('./src/scss/*.scss')
            .pipe(gulpSass())
            .pipe(gulp.dest('./src/css'))
    })
    //js
const gulpBabel = require('gulp-babel');
const uglify = require('gulp-uglify');
gulp.task('devJs', () => {
        return gulp.src('./src/js/*.js')
            .pipe(gulpBabel({
                presets: 'es2015'
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./bulid/js'))
    })
    //监听
gulp.task('watch', () => {
        gulp.watch('./src/scss/*.scss', gulp.series('devCss'));
        gulp.watch('./src/js/*.js', gulp.series('devJs'));
    })
    //服务
gulp.task('server', function() {
        return gulp.src('./src')
            .pipe(webserver({
                port: 8989,
                middleware: function(req, res, next) {
                    let { pathname, query } = url.parse(req.url, true);

                    if (req.url === '/favicon.ico') {
                        return res.end();
                    }
                    if (pathname === '/api/getdata') {

                        res.end(JSON.stringify({ code: 1, data: data }))
                    } else {
                        pathname = pathname === '/' ? 'index.html' : pathname;
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                    }
                }
            }))
    })
    //开发任务
gulp.task('dev', gulp.series('devCss', 'watch', 'server'))
    //压缩html
const htmlmin = require('gulp-htmlmin');
gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./bulid'));
})
gulp.task('min', () => {
        return gulp.src('./src/css/*.css')
            .pipe(minCSS())
            .pipe(gulp.dest('./bulid/css'))
    })
    //开发任务
gulp.task('build', gulp.parallel('devJs', 'html', 'min'))