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
const { readFileSync } = require('fs')
const path = require('path')
const url = require('url')
const dats = require('./data/datas')
    //编译css
gulp.task('devcss', () => {
        return gulp.src("./src/css/**/*.scss")
            .pipe(gulpscss())

        .pipe(gulp.dest('./src/style'))
    })
    //监听css
gulp.task('wath', () => {
    gulp.watch('./src/css/**/*.scss', gulp.series('devcss'))
})


//起服务
gulp.task('server', () => {
        return gulp.src('./src')
            .pipe(gulpwebserver({
                port: 7070,
                middleware: function(req, res, next) {
                    console.log(dats)
                    if (req.url.includes("/favicon.ico")) {
                        return res.end("")
                    }
                    let { pathname, query } = url.parse(req.url, true);
                    if (req.url == "/list/data") {

                        res.end(JSON.stringify(dats))
                    } else {
                        pathname = pathname === "/" ? "index.html" : pathname;
                        res.end(readFileSync(path.join(__dirname, 'src', pathname)))
                    }
                }
            }))
    })
    //管理开发任务
gulp.task('dev', gulp.series('devcss', 'server', 'wath'))




//上线时去压缩并打包
//压缩js
gulp.task('devjs', () => {
    return gulp.src("./src/scripts/**/*.js")
        .pipe(gulpbabel({
            presets: ['es2015']
        }))
        .pipe(gulpuglify())
        .pipe(gulp.dest('./bulid/js'))
})

gulp.task('html', () => {
    return gulp.src("./src/**/*.html")
        .pipe(gulphtmlmin({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('./bulid'))
})
gulp.task('css', () => {
        return gulp.src('./src/style/**/*.css')
            .pipe(gulpclean())
            .pipe(gulp.dest('./bulid/css'))
    })
    //管理上线任务
gulp.task('bulid', gulp.parallel('devjs', 'html', 'css'))