const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const del = require("del");
const browserSync = require("browser-sync").create();

const cssFiles = ["./src/css/reset.css", "./src/css/style.css"];

const jsFiles = ["./src/js/app.js"];

function styles() {
  return gulp
    .src(cssFiles)
    .pipe(concat("styles.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: [">0.01%"],
        // cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )

    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src(jsFiles)
    .pipe(concat("script.js"))
    .pipe(
      uglify({
        toplevel: true,
      })
    )
    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream());
}

function htmlMove() {
  return gulp
    .src("./src/*.html")
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.stream());
}

function phpMove() {
  return gulp.src("./src/*.php").pipe(gulp.dest("./build"));
}

function mailerMove() {
  return gulp.src("./src/PHPMailer/**/*").pipe(gulp.dest("./build/PHPMailer"));
}

function clean() {
  return del(["build/*"]);
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
    tunnel: true,
  });

  gulp.watch("./src/css/**/*.css", styles);
  gulp.watch("./src/js/**/*.js", scripts);
  gulp.watch("./src/*.html", htmlMove);
}

gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("watch", watch);

gulp.task(
  "build",
  gulp.series(
    clean,
    gulp.parallel(styles, scripts, htmlMove, phpMove, mailerMove)
  )
);
