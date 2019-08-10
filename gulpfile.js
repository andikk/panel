"use strict";

var gulp = require("gulp");
var saas = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");


gulp.task("css", function () {
  return gulp.src("source/scss/main.scss")
    .pipe(plumber())
    .pipe(saas())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/scss/**/*.scss", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("clean", function (done) {
  return del("build");
  done();
});

gulp.task("style", function (done) {
  gulp.src("source/scss/main.scss")
    .pipe(plumber())
    .pipe(saas())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
    done();
});



gulp.task("copy", function (done) {
  return gulp.src([
    "source/js/**",
    "source/img/**",
    "source/json/**",
    "source/*.html"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
    done();
});


gulp.task('build', gulp.series('clean', 'style', 'copy', function (done) {
  done();
}));

gulp.task("start", gulp.series("css", "server"));
