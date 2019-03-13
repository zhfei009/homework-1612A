var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var result = require('./src/data/data.json');
var clean = require('gulp-clean-css');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');

//编译sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

//起服务
gulp.task('server', function() {
    return gulp.src('./src/')
        .pipe(server({
            port: 8899,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == '/favicon.ico') {
                    res.end('')
                } else {
                    pathname = pathname == '/' ? 'index.html' : pathname;
                    if (pathname == '/list') {
                        res.end(JSON.stringify({ code: 0, data: result }))
                    } else {
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                    }
                }
            }
        }))
})

//监听sass
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

//压缩css
gulp.task('sassmin', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(clean())
        .pipe(gulp.dest('./build/css'))
})

//压缩html
gulp.task('htmlmin', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./build/'))
})

//压缩js
gulp.task('jsmin', function() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
})

//压缩图片
gulp.task('imagemin', function() {
    return gulp.src('./src/images/*.png')
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('./build/images'))
})
gulp.task('dev', gulp.series('sass', 'server', 'watch'))
gulp.task('build', gulp.series('htmlmin', 'jsmin', 'imagemin', 'sassmin'))