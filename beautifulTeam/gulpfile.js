const gulp=require('gulp');
const gulpSass=require('gulp-sass');
const gulpConcat=require('gulp-concat');
const minCss=require('gulp-clean-css');
const gulpBabel=require('gulp-babel');
const autoprefixer=require('gulp-autoprefixer');
const minJs=require('gulp-uglify');
const minHtml=require('gulp-htmlmin');
const webserver=require('gulp-webserver');

gulp.task('devSass',()=>{
    return gulp.src('./src/sass/*.scss')
    .pipe(gulpSass())
    .pipe(
       autoprefixer({
           browsers:['last 2 versions']
       }))
    .pipe(minCss())
    .pipe(gulp.dest('./bulid/stylesheets'))
})

gulp.task('devJs',()=>{
    return gulp.src('./src/js/*.js')
    .pipe(
        gulpBabel({
            presets:'es2015'
        })
    )
    .pipe(minJs())
    .pipe(gulp.dest('./bulid/scripts'))
})

gulp.task('devHtml',()=>{
    return gulp.src('./src/*.html')
    .pipe(
        minHtml({
            collapseWhitespace: true
        })
    )
    .pipe(gulp.dest('./bulid'))
})

gulp.task('watch',()=>{
    gulp.watch('./src/sass/*.scss',gulp.series('devSass'))
    gulp.watch('./src/js/*.js',gulp.series('devJs'))
    gulp.watch('./src/*.html',gulp.series('devHtml'))
})

gulp.task('server',()=>{
    return gulp.src('./bulid')
    .pipe(
        webserver({
            port: 8080,
            livereload: true
        })
    )
})

gulp.task('go',gulp.parallel('server','watch'));