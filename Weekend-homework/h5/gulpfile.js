var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//起服务
gulp.task('server', function() {
        return gulp.src('./')
            .pipe(server({
                livereload: true, //自动刷新
                port: 8080, //端口号
                open: true, //自动打开浏览器
                proxies: [{
                    source: '/app',
                    target: 'http://localhost:3000/app'
                }]
            }))
    })
    //编译sass，压缩css
gulp.task('sass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(sass()) //编译
            .pipe(clean()) //压缩
            .pipe(gulp.dest('./src/css'));
    })
    //编译、合并、压缩js
gulp.task('js', function() {
        return gulp.src('./src/js1/*.js')
            .pipe(concat('c.js')) //合并js
            .pipe(uglify()) //压缩js
            .pipe(gulp.dest('./src/dist'))
    })
    //监听sass
gulp.task('watch', function() {
        return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
    })
    //创建default任务
gulp.task('default', gulp.series('sass', 'js', 'server', 'watch'));

//创建build
gulp.task('build', gulp.parallel('sass', 'js'));