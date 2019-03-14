const gulp=require("gulp");
const sass=require("gulp-sass");
const autoprefixer=require("gulp-autoprefixer");
const concat=require("gulp-concat");
const mincss=require("gulp-clean-css");
const htmlmin=require("gulp-htmlmin");
const babel=require("gulp-babel");
const uglify=require("gulp-uglify");
const webserver=require("gulp-webserver");
const {join,extname}=require("path");
const {parse}=require("url");
const {readFileSync}=require("fs");
const data=require("./src/data/data.json");
const list=require("./src/data/list.json");

gulp.task("devCss",()=>{
    return gulp.src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({
        browsers:['last 2 versions']
    }))
    .pipe(mincss())
    .pipe(gulp.dest("./src/css"))
})

gulp.task("watch",()=>{
    gulp.watch("./src/scss/**/*.scss",gulp.series("devCss"))
})

gulp.task("devJs",()=>{
    return gulp.src("./src/js/**/*.js")
    .pipe(babel({
       presets:'es2015'
    }))
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"))
})


gulp.task("serverData",()=>{
    return gulp.src("./src")
    .pipe(webserver({
        port:9090,
        middleware:(req,res,next)=>{
            if(req.url==="/favicon.ico"){
                return res.end("")
            }
            let {query,pathname}=parse(req.url,true);
            pathname=pathname==="/"?"index.html":pathname;
            if(extname(pathname)){
                res.end(readFileSync(join(__dirname,"src",pathname)))
            }else{
                res.end(JSON.stringify({data:data,list:list}));
            }
            res.end()
        }
    }))
})

gulp.task("go",gulp.parallel("watch","serverData"))

gulp.task("Css",()=>{
    return gulp.src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({
        browsers:['last 2 versions']
    }))
    .pipe(mincss())
    .pipe(gulp.dest("./build/css"))
})

gulp.task("devHtml",()=>{
    return gulp.src("./src/*.html")
    .pipe(htmlmin({
        collapseWhitespace:true
    }))
    .pipe(gulp.dest("./build"))
})

gulp.task("Js",()=>{
    return gulp.src("./src/js/*.js")
    .pipe(babel({
       presets:'es2015'
    }))
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"))
})
