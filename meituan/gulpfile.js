const gulp  = require("gulp");
const sass = require("gulp-sass")
const cssMin = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer")
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify= require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const webserver = require("gulp-webserver")
const fs = require("fs");
const url = require("url");
const path = require("path")
gulp.task("devscss",()=>{
    return gulp.src("./src/scss/*.scss")
    .pipe(autoprefixer({
        browsers:["last 2 versions"]
    }))
    .pipe(sass())
    .pipe(gulp.dest("./src/css"))
})
gulp.task("devjs",()=>{
    return gulp.src("./src/scripts/*.js")
    .pipe(babel({
        presets:"es2015"
    }))
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"))
})

gulp.task("img",()=>{
   return  gulp.src("./src/images/**/*.png")
   .pipe(gulp.dest("./build/images"))
})
gulp.task("watch",()=>{
    gulp.watch("./src/scss/*.scss",gulp.series("devscss"));
})
gulp.task("server",()=>{
    return gulp.src("./src")
    .pipe(webserver({
        port:2000,
        middleware:(req,res,next)=>{
           let {pathname,query} = url.parse(req.url,true)
           if(pathname==="/favicon.ico"){
              return  res.end(" ")
           }
          if(pathname==="/api/getdata"){
                
          }else{
              pathname = pathname==="/"? "index.html" : pathname;
              res.end(fs.readFileSync(path.join(__dirname,"src",pathname)))
          }
        }
    }))
})
gulp.task("go",gulp.parallel("server","watch"))
//打包src下的文件到build下
gulp.task("pack",()=>{
    return gulp.src('./src/css/**/*.css')
    .pipe(cssMin())
    .pipe(gulp.dest("./build/css"))
})
gulp.task("devhtml",()=>{
    return gulp.src("./src/*.html")
    .pipe(htmlmin({
        removeComments:true,
        removeEmptyAttributes:true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        collapseBooleanAttributes:true,
        collapseWhitespace:true
    }))
    .pipe(gulp.dest("./build"))
})



