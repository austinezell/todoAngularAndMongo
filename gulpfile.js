"use strict";

let gulp = require("gulp");
let minifyCSS = require("gulp-minify-css");
let sass = require("gulp-sass");
let prefix = require('gulp-autoprefixer');


gulp.task("sass", (done)=>{
  gulp.src("./scss/**/*")
  .pipe(sass())
  .on("error", sass.logError)
  .pipe(prefix({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(gulp.dest("./public/stylesheets"))
  .on('end', done)
})

gulp.task("default", ["sass", "watch"]);
gulp.task("watch", function(){
  gulp.watch("./scss/**/*", ["sass"])
})
