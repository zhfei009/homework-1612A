const gulp = require("gulp");
const scss = require("gulp-sass");
const cssmin = require("gulp-clean-css");
const babel = require("gulp-babel");
const server = require("gulp-webserver");

gulp.task("devScss", () => {
    return gulp.src("./src/css/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("./src/css"))
})
gulp.task("devJs", () => {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("./src/js"))
})
gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            fallback: "index.html",
            proxies: [
                { source: "/getData", target: "http://localhost:3000/api/list" }
            ]
        }))
})