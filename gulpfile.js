var gulp =require("gulp"),
	//livereload=require("gulp-livereload")  //這比較不好用 還要另外開cmd視窗
	connect=require("gulp-connect"),
	$= require("gulp-load-plugins")() //簡化用
	;

gulp.task("js",function(){
	return gulp.src("Public/js/views/*.js")
			.pipe($.jshint())
			.pipe($.jshint.reporter("default"))
			.pipe($.uglify())
			.pipe($.concat("app.js"))
			.pipe(gulp.dest("build"));

});

//啟用WebServer.
gulp.task("connect", function(){
	connect.server({
		root:"",
		livereload:true
	});
});

gulp.task("html", function(){
	gulp.src("./17Y-Reunion/*.*")
		.pipe(connect.reload());
});

gulp.task("watch",function(){
	console.log("Hello, begin to livereload");
	gulp.watch(["*.*"],["html"]);
	/*var server=livereload();
	gulp.watch("*.*", function(file){ //監控所有檔案.
		server.changed(file.path);

	});*/
});

//gulp.task("default",["connect","watch"]);
gulp.task("default",["js"]);


