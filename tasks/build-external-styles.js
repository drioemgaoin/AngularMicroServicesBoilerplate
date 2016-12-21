'use strict';

var argv = require('yargs').argv;
var mainBowerFiles = require('main-bower-files');
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins, config, options) {
  return function() {

    var sources = buildHelper.getBowerNpmSources(gulp, config.source, function(root) {
      return mainBowerFiles({
        paths: {
          bowerDirectory: './bower_components',
          bowerJson: root + 'bower.json'
        },
        filter: '**/*.{css,scss}',
        overrides: config.bowerOverrides
      });
    }, { base: './' });

    return sources
        .pipe(plugins.sass())
        .pipe(plugins.if(argv.production, plugins.csso()))
        .pipe(plugins.flatten())
        .pipe(plugins.mainDedupe({ same: false }))
        .pipe(plugins.if(argv.debug, plugins.debug({ title: "build-external-styles" })))
        .pipe(gulp.dest(config.destination));

  };
};
