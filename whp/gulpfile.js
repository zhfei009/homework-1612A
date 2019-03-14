const gulp = require("gulp");
const scss = require("gulp-sass");
const concat = require("gulp-concat");
const webserver = require("gulp-webserver");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const cssmin = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const list = require("./src/list.json");

console.log(list)
const { readFileSync, existsSync } = require("fs");
const url = require("url");
const path = require("path");

gulp.task("devScss", () => {
    return gulp.src("./src/style/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("./src/style/"))
})
gulp.task("devJs", () => {
    return gulp.src("./src/style/*.js")
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(gulp.dest("./src/js/"))
})

gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(webserver({
            port: 8000,
            livereload: true,
            open: true,
            fallback: "./index.html",
            middleware: function(req, res, next) { //拦截前端请求
                if (req.url.includes("/favicon.ico")) {
                    return res.end("")
                }
                let { pathname, query } = url.parse(req.url, true);
                if (req.url == "/listData") {
                    res.end(JSON.stringify(list))
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(readFileSync(path.join(__dirname, "src", pathname)))
                }
            }

        }));
});

gulp.task("dev", gulp.series("devScss", "devJs", "server"))
    //打包
gulp.task("buildCss", () => {
    return gulp.src("./src/style/**/*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("./build/css/"))
})
gulp.task("buildJs", () => {
    return gulp.src("./src/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./build/js/"))
})
gulp.task("buildhtml", () => {
    return gulp.src("./src/**/*.html")
        .pipe(htmlmin())
        .pipe(gulp.dest("./build/"))
})

gulp.task("builds", gulp.parallel("buildCss", "buildJs", "buildhtml"));