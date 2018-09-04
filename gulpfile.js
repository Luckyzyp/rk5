var gulp = require("gulp");
var scss = require("gulp-sass");
var mincss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var server = require("gulp-webserver");
var fs = require("fs");
var url = require("url");
var path = require("path");
gulp.task("mincss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(scss())
        .pipe(mincss())
        .pipe(gulp.dest("bulid/css"));
})
gulp.task("devserver", function() {
    return gulp.src("./src")
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    res.end();
                    return;
                }
                if (pathname === "/") {
                    res.end(fs.readFileSync(path.join(__dirname, "src", "index.html")));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }))
})
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("mincss"));
})
gulp.task("dev", gulp.series("mincss", "devserver", "watch"));