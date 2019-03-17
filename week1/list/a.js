const gulp = require('gulp')
const gulpSass = require('gulp-sass')
const cssmain = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const webserver = require('gulp-webserver')
const fs = require('fs')
const path = require('path')
const url = require('url')

//开发
//编译sass
gulp.task('Sass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('./src/css'))
})

//监听sass
gulp.task('watch', () => {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('Sass'))

})

//起服务
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9090,
            livereload: true,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    return res.end()
                }
                let { pathname, query } = url.parse(req.url, true)
                if (pathname === '/list') {
                    res.end(JSON.stringify({
                        list: app
                    }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname
                    const file = fs.readFileSync(path.join(__dirname, 'src', pathname))
                    res.end(file)
                }
            }
        }))
})