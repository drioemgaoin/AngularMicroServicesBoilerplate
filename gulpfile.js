'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence').use(gulp);

var build = require("./build.js")(gulp, plugins);

gulp.task('build-server', build.buildServer);
gulp.task('build-client', build.buildClient);
gulp.task('build', ['build-client', 'build-server'])

gulp.task('start-client', build.startClient);
gulp.task('start-server', build.startServer);
gulp.task('start', ['start-server', 'start-client']);

gulp.task('default', function() {
    runSequence("build", "start");
});
