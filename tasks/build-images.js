'use strict';

var argv = require('yargs').argv;
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins, config) {
  return function() {

    var sources = buildHelper.getSources(gulp, config.source, function(root) {
      return root;
    });

    return sources
      .pipe(plugins.imagemin({
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }))
      .pipe(plugins.flatten())
      .pipe(plugins.mainDedupe({ same: false }))
      .pipe(plugins.if(argv.debug, plugins.debug({ title: "build-images" })))
      .pipe(gulp.dest(config.destination))
      .pipe(plugins.size());

  };
};
