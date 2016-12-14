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

gulp.task("clean-client", build.clean('client'));

gulp.task("clean-server", build.clean('server'));

gulp.task("clean", ['clean-client', 'clean-server']);

gulp.task("build-views", build.buildViews());

gulp.task("build-images", build.buildImages());

gulp.task("build-fonts", build.buildFonts());

gulp.task("build-internal-scripts", ['lint'], build.buildInternalScript('client'));

gulp.task("build-external-scripts", build.buildExternalScript());

gulp.task("build-internal-styles", build.buildInternalStyle());

gulp.task("build-external-styles", build.buildExternalStyle());

gulp.task('inject', getTask('inject'));

gulp.task('lint-client', build.lint('client'));

gulp.task('lint-server', build.lint('server'));

gulp.task('lint', ['lint-server', 'lint-client']);

gulp.task('build-server', function() {
  return mergeStream(
    build.buildInternalScript('server', { minify: false })(),
    build.buildServer()()
  );
});

gulp.task('build-client', [
    "build-internal-scripts",
    "build-external-scripts",
    "build-views",
    "build-internal-styles",
    "build-external-styles",
    "build-fonts",
    "build-images"
]);

gulp.task('build', ['build-client', 'build-server'])

gulp.task('watch-client', getTask('watch-client'));
gulp.task('watch-server', getTask('watch-server'));
gulp.task('start-client', [argv.production ? '' : 'watch-client'], getTask('start-client'));
gulp.task('start-server', [argv.production ? '' : 'watch-server'], getTask('start-server'));
gulp.task('start', ["start-server", "start-client"]);

gulp.task('default', ["clean"], function() {
    runSequence("build", "inject", "start");
});
