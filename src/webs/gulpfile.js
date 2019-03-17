const gulp = require('gulp')
const gulpwebserver = require('gulp-webserver')

gulp.task('webserver', () => {
    return gulp.src('./src')
        .pipe(gulpwebserver({
            port: 9090,
            proxies: [
                { source: '/api/find', target: 'http://localhost:3000/api/find' }
            ]
        }))
})