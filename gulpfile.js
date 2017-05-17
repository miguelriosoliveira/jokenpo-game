// const browserify = require("browserify");
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
        // .pipe(browserify())
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
    return gulp.src("node_modules/socket.io/**")
        .pipe(gulp.dest("_dist/libs/socket.io/"))
        .pipe(gulp.dest("client/libs/socket.io/"));
});

/* SERVE */

gulp.task("serve", ["libs", "html", "js"], function () {
    // directory of static server
    browserSync.init({
        server: {
            baseDir: "_dist/"
        },
        port: 8000
    });
    // reloads if any client file is modified
    gulp.watch("client/js/**/*.js", ["js-watch"]);
    gulp.watch("client/*.html", ["html-watch"]);
});