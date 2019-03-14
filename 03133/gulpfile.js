const gulp = require("gulp");
const sass = require("gulp-sass");
const mincss = require("gulp-clean-css");
const auto = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const ug = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const ser = require("gulp-webserver");
const path = require("path");
const url = require("url");
const { readFileSync, existsSync } = require("fs");
const data = require("./src/data/data.json");
//开发环境
//编译scss
gulp.task("css", () => {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass())
        .pipe(auto({
            browsers: ["last 2 versions"]
        }))
        .pipe(gulp.dest("./src/css"))
});
//监听
gulp.task("jian", () => {
    gulp.watch("./src/sass/*.scss", gulp.series("css"))
});
// 服务
gulp.task("wen", () => {
    return gulp.src("./src")
        .pipe(ser({
            port: 8033,
            open: true,
            // fallback: "index.html",
            livereload: true,
            middleware: (req, res) => {
                if (req.url.includes("favicon.ico")) {
                    return res.end('');
                };
                let { pathname, query } = url.parse(req.url, true);
                if (pathname === "/api/list") {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(readFileSync(path.join(__dirname, "src", pathname)))
                }

            }
        }))
});
//管理开发任务
gulp.task("dev", gulp.series("css", "wen", "jian"));

//上线压缩
//处理HTML
gulp.task("htm", () => {
    return gulp.src("./src/*.html")
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest("./build"))
});
//压缩css 
gulp.task("csss", () => {
    return gulp.src("./src/css/*.css")
        .pipe(mincss())
        .pipe(gulp.dest("./build/css"))
});
//压缩js
gulp.task("jss", () => {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: "es2015"
        }))
        .pipe(ug())
        .pipe(gulp.dest("./build/js"))
});

//管理上线任务
gulp.task("pack", gulp.parallel("htm", "csss", "jss"))