const gulp = require('gulp');
const sass = require('gulp-sass');
const server = require('gulp-webserver');

gulp.task('sass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
});

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('server', () => {
    return gulp.src('./src/')
        .pipe(server({
            port: 8787,
            open: true,
            livereload: true,
            proxies: [{
                source: '/api/list',
                target: 'http://localhost:3000/api/list'
            }]
        }))
});
gulp.task('dev', gulp.parallel('sass', 'server', 'watch'));