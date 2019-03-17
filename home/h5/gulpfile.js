const gulp = require('gulp');
const webserver = require('gulp-webserver');
const gulpSass = require('gulp-sass');
const minCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const url = require('url');
const fs = require('fs');
const path = require('path');

//编译sass
gulp.task('devCss', () => {
        return gulp.src('./src/scss/*.scss')
            .pipe(gulpSass())
            .pipe(minCSS())
            .pipe(gulp.dest('./src/css'))
    })
    // js
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
            proxies: [{
                source: '/getData',
                target: 'http://localhost:3000/getData'
            }]
        }))
})