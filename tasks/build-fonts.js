'use strict';

var argv = require('yargs').argv;
var mainBowerFiles = require('main-bower-files');
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins, config) {
  return function() {

    var sources = buildHelper.getBowerNpmSources(gulp, config.source, function(root) {
      return mainBowerFiles({
        paths: root,
        filter: '**/*.{otf,eot,svg,ttf,woff,woff2}',
        overrides: config.bowerOverrides
      });
    }, { base: './' });

    return sources
        .pipe(plugins.flatten())
        .pipe(plugins.mainDedupe({ same: false }))
        .pipe(plugins.if(argv.debug, plugins.debug({ title: "build-fonts" })))
        .pipe(gulp.dest(config.destination));

  };
};
