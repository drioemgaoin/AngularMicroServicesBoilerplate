'use strict';

var argv = require('yargs').argv;
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins, config) {
  return function() {
    var sources = buildHelper.getSources(gulp, config.source, function(root) {
      return root;
    });

    return sources
      .pipe(plugins.sass())
      .pipe(plugins.if(argv.production, plugins.csso()))
      .pipe(plugins.flatten())
      .pipe(plugins.if(argv.debug, plugins.debug({ title: "build-internal-styles" })))
      .pipe(gulp.dest(config.destination));
  };
};
