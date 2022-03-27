/**
 * Gulp workflow for processing our files
 * @version 2.0.0
 */

import gulp from "gulp"
import terser from "gulp-terser"
// import rename from "gulp-rename"
// import prettier from "gulp-prettier"

const paths = {
  components: {
    src: "./src/**/*.js",
    dest: "./dist",
  },
}

/**
 * Process JS
 * @returns {*} Processed JS in destination folder
 */
export function js() {
  return (
    gulp
      .src(paths.components.src)
      .pipe(terser())
      // .pipe(
      //   rename({
      //     suffix: ".min",
      //   })
      // )
      .pipe(gulp.dest(paths.components.dest))
  )
}

const build = gulp.series(js)

export default build
