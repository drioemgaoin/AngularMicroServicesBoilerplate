'use strict';

var argv = require('yargs').argv;
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins, config) {
  return function() {
    var sources = buildHelper.getSources(gulp, config.source, function(root) {
      return root;
    });

    return sources
      .pipe(plugins.sort(buildHelper.sort(/components/)))
      .pipe(plugins.flatten())
      .pipe(plugins.mainDedupe({ fullpath: false, same: false }))
      .pipe(plugins.if(argv.debug, plugins.debug({ title: "build-views" })))
      .pipe(plugins.if(buildHelper.isMainView,
        gulp.dest(config.destination.main),
        gulp.dest(config.destination.other)));
  };
};
