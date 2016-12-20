'use strict';

var argv = require('yargs').argv;
var path = require('path');
var mergeStream = require('merge-stream');
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins, config) {
  return function() {

    var injectRoutes = require('./inject-routes')(gulp, plugins, config);

    var source = buildHelper.getSources(gulp, config.source, function(root) {
      return root;
    });

    const appFilter = plugins.filter('**/app.js', {restore: true});

    return source
      .pipe(appFilter)
      .pipe(plugins.if(config.routes, injectRoutes()))
      .pipe(appFilter.restore)
      .pipe(plugins.sort(buildHelper.sort(/components/, false)))
      .pipe(plugins.mainDedupe({ same: false, fullPath: false }))
      .pipe(plugins.sort(buildHelper.sort(/app.js$/)))
      .pipe(plugins.if(argv.debug, plugins.debug({ title: "build-internal-scripts" })))
      .pipe(plugins.ifElse(config.fileName, function() { return plugins.concat(config.fileName); }))
      .pipe(plugins.if(argv.production, plugins.uglify({ mangle: false })))
      .pipe(gulp.dest(config.destination));

  };
};
