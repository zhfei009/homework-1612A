var gulp = require("gulp");
var sass = require("gulp-sass");
var clean = require("gulp-clean-css");
var server = require("gulp-webserver");
gulp.task("scss", function() {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass())
		.pipe(clean())
        .pipe(gulp.dest("./src/css"))
});
gulp.task("startserver", function() {
    return gulp.src("src")
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true
        }))
});
gulp.task("watch",function(){
	return gulp.watch("./src/sass/*.scss",gulp.series("scss"))
})
gulp.task("dev",gulp.series("scss","startserver","watch"))