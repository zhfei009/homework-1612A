const gulp=require('gulp');
const gulpSass=require('gulp-sass');
const minCss=require('gulp-clean-css');
const gulpBabel=require('gulp-babel');
const uglify=require('gulp-uglify');
const htmlmin=require('gulp-htmlmin');
const webserver=require('gulp-webserver');

gulp.task('devSass',()=>{
    return gulp.src('./src/scss/*.scss')
    .pipe(gulpSass())
    .pipe(minCss())
    .pipe(gulp.dest('./dest/stylesheets'))
})

gulp.task('devJs',()=>{
    return gulp.src('./src/js/*.js')
    .pipe(gulpBabel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dest/scripts'))
})

gulp.task('devHtml',()=>{
    return gulp.src('./src/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./dest'))
})

gulp.task('watch',()=>{
    gulp.watch('./src/scss/*.scss',gulp.series('devSass'))
    gulp.watch('./src/js/*.js',gulp.series('devJs'))
    gulp.watch('./src/*.html',gulp.series('devHtml'))
})

gulp.task('server',()=>{
    return gulp.src('./dest')
    .pipe(
       webserver({
           livereload: true,
           port: 9999,
           open: true,
           proxies:[{source:'/api/list',target:'http://localhost:3000/api/list'}]
           
       })
    )
})

gulp.task('go',gulp.parallel('watch','server'));