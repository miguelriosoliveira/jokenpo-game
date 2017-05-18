const gulp = require("gulp");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();

/* JS */

// babel
gulp.task("js", function () {
    return gulp.src("client/js/**/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("_dist/js"));
});

// ensures the "js" task is complete before reloading
gulp.task("js-watch", ["js"], function (done) {
    browserSync.reload();
    done();
});

/* HTML */

gulp.task("html", function () {
    return gulp.src("client/*.html")
        .pipe(gulp.dest("_dist/"));
});

gulp.task("html-watch", ["html"], function (done) {
    browserSync.reload();
    done();
});

/* LIBS */

gulp.task("libs", function () {
    return gulp.src([
            "node_modules/jquery/dist/jquery.slim.js"
        ])
        .pipe(gulp.dest("_dist/libs/"))
        .pipe(gulp.dest("client/libs/"));
});

/* BROWSER SYNC */

gulp.task("client", ["libs", "html", "js"], function () {
    // directory of static server
    browserSync.init({
        proxy: "http://localhost:8000"
    });
    // reloads if any client file is modified
    gulp.watch("client/js/**/*.js", ["js-watch"]);
    gulp.watch("client/*.html", ["html-watch"]);
});