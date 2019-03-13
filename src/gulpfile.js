const gulpscss = require('gulp-sass')
const gulpauto = require('gulp-autoprefixer')
const gulpconcat = require('gulp-concat')
const gulpclean = require('gulp-clean-css')
const gulpbabel = require('gulp-babel')
const gulpuglify = require('gulp-uglify')
const gulphtmlmin = require('gulp-htmlmin')
const babelcore = require('babel-core')
const gulpwebserver = require('gulp-webserver')
const babelpre2015 = require('babel-preset-es2015')
const gulp = require('gulp')

gulp.task('devcss', () => {
    return gulp.src("./src/**/*.scss")
        .pipe(gulpscss())
        .pipe(gulpclean())
        .pipe(gulp.dest('./buld/css'))
})

gulp.task('wath', () => {
    gulp.watch('./src/**/*.scss', gulp.series('devcss'))
})