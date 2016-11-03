const gulp = require("gulp"),
    babel = require("gulp-babel"),
    del = require("del"),
    exec = require("child_process").exec,

    paths = {
        allSrcJs: "src/**/*.js",
        libDir: "lib"
    };

gulp.task("clean", () => {
    return del(paths.libDir);
});

gulp.task("build", ["clean"], () => {
    return gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir));
});

gulp.task("main", ["build"], (callback) => {
    exec(`node ${paths.libDir}`, (error, stdout) => {
        console.log(stdout);
        return callback(error);
    });
});

gulp.task("watch", () => {
    gulp.watch(paths.allSrcJs, ["main"]);
});

gulp.task("default", ["watch", "main"]);