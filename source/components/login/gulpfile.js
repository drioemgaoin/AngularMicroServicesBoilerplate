'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence').use(gulp);
var mergeStream = require('merge-stream');
var parallel = require('run-parallel');
var argv = require('yargs').argv;

var gulpConfig = require("./gulpconfig.json");
var build = require("./build.js")(gulp, plugins, "./source/components/login");

function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, gulpConfig);
}

gulp.task("clean", function() {
  return build.clean('client')()
    .on('end', build.clean('server'));
});

gulp.task("build-views", build.buildViews());

gulp.task("build-images", build.buildImages());

gulp.task("build-fonts", build.buildFonts());

gulp.task("build-internal-scripts", ['lint'], function() {
  return build.buildInternalScript('client')()
    .on('end', build.buildInternalScript('server', { minify: false }));
});

gulp.task("build-external-scripts", build.buildExternalScript());

gulp.task("build-internal-styles", build.buildInternalStyle());

gulp.task("build-external-styles", build.buildExternalStyle());

gulp.task('inject', getTask('inject'));

gulp.task('lint', function() {
  return build.lint('client')()
    .on('end', function() {
      build.lint('server')();
    });
});

gulp.task('build', [
    "build-internal-scripts",
    "build-external-scripts",
    "build-views",
    "build-internal-styles",
    "build-external-styles",
    "build-fonts",
    "build-images"
]);

gulp.task('start-server', getTask('start-server'));

if (argv.production) {
  gulp.task('start', ["start-server"], getTask('start-client'));
} else {
  gulp.task('start', ["start-server"], getTask('start-client'));
  //gulp.task('start', getTask('watch'));
}

gulp.task('default', ["clean"], function() {
    runSequence("build", "inject", "start");
});
