'use strict';

var argv = require('yargs').argv;
var mainBowerFiles = require('main-bower-files');
var mergeStream = require('merge-stream');
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins, config) {
  return function() {

    var bowerSources = buildHelper.getSources(gulp, config.bower.source, function(root) {
        return mainBowerFiles({
          paths: root,
          filter: '**/*.js',
          overrides: config.bowerOverrides
        });
      }, { base: './' });

    var npmSources = buildHelper.getSources(gulp, config.npm.source, function(root) {
        return plugins.mainNpmFiles({
          nodeModulesPath: root.replace("./", "../") + "/node_modules",
          packageJsonPath: root.replace("./", "../") + "/package.json"
        });
      }, { base: './' })
      .pipe(plugins.filter(config.npm.filter));

    return mergeStream(bowerSources, npmSources)
    .pipe(plugins.if(argv.production, plugins.uglify()))
    .pipe(plugins.flatten())
    .pipe(plugins.mainDedupe({ same: false }))
    .pipe(plugins.order(config.order))
    .pipe(plugins.if(argv.debug, plugins.debug({ title: "build-external-scripts" })))
    .pipe(plugins.concat(config.fileName))
    .pipe(gulp.dest(config.destination));

  };
};
