'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var config = require("./gulpconfig.json");
var componentManager = require("./source/componentManager")(gulp, plugins, "source/components");
var mergeStream = require('merge-stream');

function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, config);
}

gulp.task("clean", function() {
  return mergeStream(
    componentManager.clean('client'),
    componentManager.clean('server')
  );
});

gulp.task('build-internal-scripts', function() {
  return mergeStream(
    mergeStream(
        getTask('build-internal-scripts')(),
        componentManager.buildInternalScript('client')
      )
      .pipe(plugins.concat('internal.js'))
      .pipe(gulp.dest(config.client.deployment.scripts)),

    componentManager.buildInternalScript('server')
      .pipe(plugins.concat('internal.js'))
      .pipe(gulp.dest(config.server.deployment.scripts))
  );
});

gulp.task('build-external-scripts', function() {
  return mergeStream(
    componentManager.buildExternalScript('client')
      .pipe(plugins.concat('vendor.js'))
      .pipe(gulp.dest(config.client.deployment.scripts)),

    componentManager.buildExternalScript('server')
      .pipe(plugins.concat('vendor.js'))
      .pipe(gulp.dest(config.server.deployment.scripts))
  );
});

gulp.task('build-components-internal-styles', ['lint'], function() {
  return componentManager.buildInternalStyle('client')
      .pipe(plugins.rename({ basename: "components" }))
      .pipe(gulp.dest(config.client.deployment.styles));
});

gulp.task('build-external-styles', function() {
  return componentManager.buildExternalStyle('client')
      .pipe(gulp.dest(config.client.deployment.styles))
});

gulp.task('build-fonts', function() {
  return componentManager.buildFonts();
});

gulp.task('build-views', function() {
  var streams = componentManager.buildViews();
  streams.push(getTask('build-views')());
  return streams;
});

gulp.task('build-images', function() {
  var streams = componentManager.buildImages();
  streams.add(getTask('build-images')());
  return streams
    .pipe(gulp.dest(config.client.deployment.images));
});

gulp.task("lint", function() {
  var streams = mergeStream(
    componentManager.lint('client'),
    componentManager.lint('server')
  );
  streams.add(getTask('lint')());
  return streams;
});

// gulp.task('build-external-scripts', getTask('build-external-scripts'));
gulp.task('build-internal-styles', ['build-components-internal-styles'], getTask('build-internal-styles'));
// gulp.task('build-external-styles', getTask('build-external-styles'));
// gulp.task('build-fonts', getTask('build-fonts'));
gulp.task('inject', getTask('inject'));
// gulp.task('start-server', getTask('start-server'));
// gulp.task('watch', getTask('watch'));
//
gulp.task('build', [
    "build-internal-scripts",
    "build-external-scripts",
    "build-views",
    "build-internal-styles",
    "build-external-styles",
    // "build-fonts",
    "build-images"
]);
//
// if (argv.production) {
//   gulp.task('start', ["start-server"], getTask('start-client'));
// } else {
//   gulp.task('start', getTask('watch'));
// }

gulp.task('default', ['clean'], function() {
    runSequence("build", "inject");
});
