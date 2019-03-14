const gulp=require("gulp");
const gulpSass=require("gulp-sass");
const minCss=require("gulp-clean-css");
const autoplerfixer=require("gulp-autoprefixer");
const gulpBabel=require("gulp-babel");
const uglify=require("gulp-uglify")
const htmlmin=require("gulp-htmlmin")
const webServer=require("gulp-webserver");
const {extname,join}=require("path");
const {parse}=require("url");
const {readFileSync,existsSync}=require("fs")
const hotJson=require("./data/hot")
const swipJson=require("./data/swiper")
gulp.task("devCss",()=>{
    return gulp.src("./static/css/*.scss")
    .pipe(gulpSass())
    .pipe(autoplerfixer({
        browsers:["last 2 versions"]
    }))
    .pipe(minCss())
    .pipe(gulp.dest("./build/stylesheet"))
})
gulp.task("devJs",()=>{
    return gulp.src("./static/js/*.js")
    .pipe(gulpBabel({
        presets:"es2015"
    }))
    .pipe(uglify())
    .pipe(gulp.dest("./build/javascript"))
})
gulp.task("devHtml",()=>{
    return gulp.src("./static/*.html")
        .pipe(htmlmin({
            collapseWhitespace:true
        }))
        .pipe(gulp.dest("./build"))
})
gulp.task("comm",()=>{
    return gulp.src("./static/common/*.js")
    .pipe(gulp.dest("./build/com"))
})
gulp.task("watch",()=>{
    gulp.watch("./static/css/*.scss",gulp.series("devCss"))
    gulp.watch("./static/js/*.js",gulp.series("devJs"))
    gulp.watch("./static/*.html",gulp.series("devHtml"))
})
gulp.task("severData",()=>{
    return gulp.src("./build")
    .pipe(webServer({
        port:2225,
        open:true,
        livereload:true,
        middleware:[(req,res,next)=>{
            if(req.url.includes("favicon.ico")){
                return res.end("")
            }
            //res.setHeader("content-type","application/json;charset=utf-8")
            // const {pathname,query}=require("url").parse(req.url,true);
            // console.log(pathname)
            //console.log(req.url)
            let pathname=parse(req.url).pathname;
            //console.log(pathname)
            pathname=pathname==="/"?"index.html":pathname;
            const ext=extname(pathname);
            console.log(ext)
            if(ext){
                const filePath=join(__dirname,"build",pathname)
                console.log(filePath)
                if(existsSync(filePath)){
                    res.end(readFileSync(filePath))
                }else{
                    res.end("not find!")
                }
            }else{
                if(pathname==="/getMeg"){
                    // console.log(pathname)
                     res.end(JSON.stringify(hotJson))    
                }
            }
        }]
    }))
})
gulp.task("dev",gulp.parallel("watch","severData"))