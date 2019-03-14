const gulp = require("gulp")
const scss = require("gulp-sass")
const data = require("./src/data.json");
const server = require("gulp-webserver");
const clean = require("gulp-clean-css")
const babel = require("gulp-babel")
const ugify = require("gulp-uglify")
const { join } = require("path")
const { readFileSync } = require("fs")
const { parse } = require("url")
const minhtml = require("gulp-htmlmin")
    //编译scss
gulp.task("dirscss", () => {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(scss())
        .pipe(clean())
        .pipe(gulp.dest("./src/css"))
})
gulp.task("dirjs", () => {
        return gulp.src("./src/scripts/**/*.js")
            .pipe(babel({
                presets: "es2015"
            }))
            .pipe(gulp.dest("./src/js"))
    })
    //其服务
gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(server({
            port: 3030,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                let { pathname, query } = parse(req.url, true)
                pathname = pathname === "/" ? "index.html" : pathname;
                if (pathname === "/favicon.ico") {
                    return res.end("")
                }
                if (pathname === "/api/list") {
                    res.end(JSON.stringify({ code: 1, mes: data }))
                } else {
                    res.end(readFileSync(join(__dirname, "src", pathname)))
                }
            }
        }))
})
gulp.task("dev", gulp.series("dirscss", "dirjs", "server"))
    //监听 事件
gulp.task("watch", () => {
        gulp.watch("./src/scss/**/*.scss", gulp.series("dirscss"))
    })
    //打包
    //打包 js
gulp.task("build-js", () => {
    return gulp.src("./src/js/**/*.js")
        .pipe(ugify())
        .pipe(gulp.dest("./build/js"))
})
gulp.task("build-css", () => {
    return gulp.src("./src/css/**/*.css")
        .pipe(clean())
        .pipe(gulp.dest("./build/css"))
})
gulp.task("build-minhtml", () => {
    return gulp.src("./src/**/*.html")
        .pipe(minhtml({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("./build/"))
})
gulp.task("build", gulp.parallel("build-js", "build-css", "build-minhtml"))