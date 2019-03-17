const gulp = require("gulp");
const sass = require("gulp-sass");
const ser = require("gulp-webserver");
const mincss = require("gulp-clean-css");
const minjs = require("gulp-uglify");
const babel = require('gulp-babel');
const htmlmin = require("gulp-htmlmin");

//开发
gulp.task("cs", () => {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"))
});
gulp.task("jian", () => {
    gulp.watch('./src/sass/*.scss', gulp.series("cs"));
});
//其服务
gulp.task("wen", () => {
    return gulp.src("./src")
        .pipe(ser({
            port: 8055,
            open: true,
            // fallback: "index.html",
            livereload: true,
            proxies: [{
                source: "/app/findInfo",
                target: "http://localhost:3000/app/findInfo"
            }]
        }))
});
gulp.task("dev", gulp.series("cs", "wen", "jian"));

//上线压缩
gulp.task("ycss", () => {
    return gulp.src("./src/css/*.css")
        .pipe(mincss())
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("yjs", () => {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: "es2015"
        }))
        .pipe(minjs())
        .pipe(gulp.dest("./dist/js"))
})
gulp.task("yhtml", () => {
    return gulp.src("./src/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest("./dist"))
})
gulp.task("pack",gulp.parallel("ycss","yjs","yhtml"));