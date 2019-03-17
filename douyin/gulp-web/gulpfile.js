const gulp = require('gulp');
const gulpScss = require('gulp-sass');
const minscss = require('gulp-clean-css');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');
//编译sass
gulp.task('compile', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpScss())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', () => {
        gulp.watch('./src/scss/**/*.scss', gulp.series('compile'))
    })
    //连接接口
gulp.task('lineserver', () => {
        return gulp.src('./src')
            .pipe(webserver({
                port: 1000,
                livereload: true,
                proxies: [{
                    source: '/getdata',
                    target: 'http://localhost:3000/getdata'
                }]
            }))
    })
    // gulp.task('lineserver', () => {
    //     return gulp.src('./src')
    //         .pipe(webserver({
    //             port: 3000,
    //         }))
    // })
gulp.task('link', gulp.parallel('watch', 'lineserver'));