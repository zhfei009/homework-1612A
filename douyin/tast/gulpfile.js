const gulp = require("gulp");
const scss = require("gulp-sass");
const server = require('gulp-webserver');
gulp.task("css", () => {
    return gulp.src("./src/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("./src/css"))
})
gulp.task("watch", () => {
    gulp.watch("./src/*.scss", gulp.series("css"))
})
gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(server({
            port: 5656,
            open: true,
            proxies: [{
                source: "/api/list",
                target: "http://localhost:3000/api/list"
            }]

        }))
})