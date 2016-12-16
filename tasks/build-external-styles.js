'use strict';

var argv = require('yargs').argv;
var path = require('path');
var mergeStream = require('merge-stream');
var mainBowerFiles = require('main-bower-files');
var mainDedupe = require('../gulp-main-dedupe');

module.exports = function(gulp, plugins, config, options) {
  return function() {
    function getSources(root) {
      if (root instanceof Array) {
        return root
          .map(function(source) {
            return gulp.src(mainBowerFiles({
                  paths: source,
                  filter: '**/*.{css,scss}',
                  overrides: config.bowerOverrides
                }), { base: './' });
          });
      }

      return gulp.src(mainBowerFiles({
            paths: root,
            filter: '**/*.{css,scss}',
            overrides: config.bowerOverrides
          }), { base: './' });
    };

    var sources = getSources(config.source);
    return (sources instanceof Array ? mergeStream(sources) : sources)
        .pipe(plugins.sass())
        .pipe(plugins.if(argv.production, plugins.csso()))
        .pipe(plugins.flatten())
        .pipe(mainDedupe({ same: false }))
        .pipe(gulp.dest(config.destination));
  };
};
