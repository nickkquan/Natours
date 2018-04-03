var gulp = require("gulp");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var del = require("del");

var DEST_PATH = "client/dist";
var SASS_PATH = "client/scss/**/*.scss";

gulp.task("styles", function() {
	console.log("Starting styles task.");
	gulp
		.src("/client/scss/styles.scss")
		.pipe(sourcemaps.init())
		.pipe(
			autoprefixer({
				browsers: ["last 2 versions, ie8"]
			})
		)
		.pipe(sass({ outputStyle: "compressed" }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(liverload());
});

gulp.task("watch", function() {
	require("./server.js");
	livereload.listen();
	gulp.watch(SASS_PATH, ["styles"]);
});
