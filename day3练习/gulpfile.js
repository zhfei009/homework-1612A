const gulp = require('gulp')
const gulpSass = require('gulp-sass')
const minsass = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const webserver = require('gulp-webserver')
const minhtml = require('gulp-htmlmin')
const fs = require('fs')
const path = require('path')
const url = require('url')
const datalist = require('./src/data/data.json')
console.log(datalist)

//开发
//编译Sass
gulp.task('Sass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('./src/css'))
})

//监听Sass
gulp.task('watch', () => {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('Sass'))
})

//起服务
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9999,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    return res.end()
                }
                let { pathname, query } = url.parse(req.url, true)
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({
                        code: 1,
                        list: datalist
                    }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname
                    const file = fs.readFileSync(path.join(__dirname, 'src', pathname))
                    res.end(file)
                }
            }
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

//
gulp.task('build', gulp.parallel('devSass', 'devhtml', 'devjs'))