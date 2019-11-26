const gulp = require("gulp");
const concat = require("gulp-concat");


let jsSource = ["Lib/*.js","Lib/**/*.js","drawtool.js","RectangleTool.js","LineTool.js","Pencil.js","DrawStates.js","ui_bindings.js","draw.js"];
gulp.task('combine', () => {
  return gulp.src(jsSource, { allowEmpty: true }) 
    .pipe(concat('build.js'))
    .pipe(gulp.dest('src/'))
})

gulp.task('default', gulp.series(['combine']));