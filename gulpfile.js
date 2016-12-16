'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var config = require("./gulpconfig.json");
var componentManager = require("./source/componentManager")(gulp, plugins, "source/components");
var mergeStream = require('merge-stream');
var orderedMergeStream = require('ordered-merge-stream');
var parallel = require('run-parallel');
var path = require('path');

var build = require("./build.js")(gulp, plugins, "./source/components/login");

function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, config);
}

// gulp.task('clean', getTask('clean'));
//
// gulp.task('build-internal-scripts', ['lint'], getTask('build-internal-scripts'));
//
// gulp.task('build-internal-styles', getTask('build-internal-styles'));
//
// gulp.task('build-external-scripts', getTask('build-external-scripts'));
//
// gulp.task('build-external-styles', getTask('build-external-styles'));
//
// gulp.task('build-views', getTask('build-views'));
//
// gulp.task('build-fonts', getTask('build-fonts'));
//
// gulp.task('build-images', getTask('build-images'));
//
// gulp.task("lint", getTask('lint'));
//
// gulp.task('build-server', getTask('build-server'));
//
// gulp.task('generate-route', getTask('generate-route'));
//
// gulp.task('inject', getTask('inject'));
//
// gulp.task('start-server', getTask('start-server'));
//
// gulp.task('build', [
//     "build-internal-scripts",
//     "build-external-scripts",
//     "build-views",
//     "build-internal-styles",
//     "build-external-styles",
//     "build-fonts",
//     "build-images",
//     "build-server"
// ]);
//
// if (argv.production) {
//   gulp.task('start', ["start-server"], getTask('start-client'));
// } else {
//   gulp.task('start', ["start-server"], getTask('start-client'));
//   //gulp.task('start', getTask('watch'));
// }

gulp.task('build-server', build.buildServer);
gulp.task('build-client', build.buildClient);
gulp.task('build', ['build-client', 'build-server'])

gulp.task('default', function() {
    runSequence("build");
});
