var gulp = require("gulp");
var webp = require("gulp-webp");

gulp.task("default", function() {
	gulp.src("testWebp/images/*")
		.pipe(webp())
		.pipe(gulp.dest("testWebp/output/"))
});