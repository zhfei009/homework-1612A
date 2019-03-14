const gulp = require('gulp');
const sass = require('gulp-sass');
const server = require('gulp-webserver');
const minCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const url = require('url');
const fs = require('fs');
const path = require('path');
const data = require('./src/data/data.json');
const list = require('./src/data/list.json');
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('sass'));
});

gulp.task('minCss', function() {
    return gulp.src('./src/css/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('./src/css/'))
});
gulp.task('babel', function() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(gulp.dest('./src/js/'));
});
gulp.task('uglify', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'))
});

gulp.task('server', function() {
    return gulp.src('./src/')
        .pipe(server({
            port: 8787,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                let { pathname, query } = url.parse(req.url, true);
                if (pathname == '/favicon.ico') {
                    res.end('');
                    return;
                } else if (pathname == '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: data, list: list }));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, '/src', pathname)));
                }
            }
        }));
});
gulp.task('dev', gulp.series('sass', 'minCss', 'babel', 'uglify', 'server', 'watch'));