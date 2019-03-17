const gulp=require("gulp");
const sass=require("gulp-sass");
const concat=require("gulp-concat");
const autoprefixer=require("gulp-autoprefixer");
const mincss=require("gulp-clean-css");
const babel=require("gulp-babel");
const uglify=require("gulp-uglify");
const webserver=require("gulp-webserver");
const htmlmin=require("gulp-htmlmin");


gulp.task("devCss",()=>{
    return gulp.src("./dest/scss/*.scss")
    .pipe(sass())
    .pipe(mincss())
    .pipe(gulp.dest("./dest/css"))
})

gulp.task("devJs",()=>{
    return gulp.src("./dest/njs/*.js")
    .pipe(babel({
        presets:"es2015"
    }))
    .pipe(uglify())
    .pipe(gulp.dest("./dest/js"))
})

gulp.task("watch",()=>{
    gulp.watch("./dest/scss/*.scss",gulp.series("devCss"))
    gulp.watch("./dest/njs/*.js",gulp.series("devJs"))
})

gulp.task("server",()=>{
    return gulp.src("./dest")
    .pipe(webserver({
        port:8989,
        open:true,
        proxies:[
            {
                source:"/getData",
                target:"http://localhost:3000/getData"
            }
        ]
    }))
})

gulp.task("default",gulp.parallel("watch","server"))

gulp.task("Css",()=>{
    return gulp.src("./dest/css/*.css")
    .pipe(gulp.dest("./build/css"))
})

gulp.task("Js",()=>{
    return gulp.src("./dest/js/*.js")
    .pipe(gulp.dest("./build/js"))
})
gulp.task("Img",()=>{
    return gulp.src("./dest/img/*.jpg")
    .pipe(gulp.dest("./build/img"))
})

gulp.task("index",()=>{
    return gulp.src("./dest/*.html")
    .pipe(htmlmin(
        {
            collapseWhitespace:true
        }
    ))
    .pipe(gulp.dest("./build"))
})

gulp.task("build",gulp.parallel("Css","Js","Img","index"))
