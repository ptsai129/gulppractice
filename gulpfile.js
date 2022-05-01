var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();
sass.compiler = require("node-sass");

function copyHTML() {
  return gulp.src("./src/**/*.html")
  .pipe(gulp.dest("./dist/"))
  .pipe(
    browserSync.reload({
     stream: true,
    }),
  );
}

function scss() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"))
    .pipe(
        browserSync.reload({
         stream: true,
        }),
      );
}

function browser() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    port: 8080,
  });
}

function watch(){
 gulp.watch("./src/**/*.html", gulp.series(copyHTML))
 gulp.watch("./src/scss/**/*.scss", gulp.series(scss))
}
exports.default = gulp.series(copyHTML, scss, gulp.parallel(browser ,watch));
