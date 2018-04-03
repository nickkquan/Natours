var gulp = require("gulp");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");

var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");

var del = require("del");

var DIST_PATH = "client/dist";
var SASS_PATH = "client/scss/**/*.scss";

gulp.task("styles", function() {
	console.log("Starting styles task.");
	return gulp
		.src("client/scss/styles.scss")
		.pipe(
			plumber(function(error) {
				console.log("Styles Error Task.");
				console.log(error);
				this.emit("end");
			})
		)
		.pipe(sourcemaps.init())
		.pipe(
			autoprefixer({
				browsers: ["last 2 versions", "ie 8"]
			})
		)
		.pipe(sass({ outputStyle: "compressed" }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

gulp.task("clean", function() {
	console.log("Starting delete task.");
	return del.sync([DIST_PATH]);
});

gulp.task("default", ["clean", "styles"], function() {
	console.log("Starting default task.");
});

gulp.task("watch", ["default"], function() {
	console.log("Starting watch task.");
	require("./server.js");
	livereload.listen();
	gulp.watch(SASS_PATH, ["styles"]);
});
