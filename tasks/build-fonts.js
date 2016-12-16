'use strict';

var path = require('path');
var mergeStream = require('merge-stream');
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config) {
  return function() {

    function getSources(root) {
      if (root instanceof Array) {
        return root
          .map(function(source) {
            return gulp.src(mainBowerFiles({
                  paths: source,
                  filter: '**/*.{otf,eot,svg,ttf,woff,woff2}',
                  overrides: config.bowerOverrides
                }), { base: './' });
          });
      }

      return gulp.src(mainBowerFiles({
            paths: root,
            filter: '**/*.{otf,eot,svg,ttf,woff,woff2}',
            overrides: config.bowerOverrides
          }), { base: './' });
    };

    var sources = getSources(config.source);
    return (sources.length > 1 ? mergeStream(sources) : sources[0])
        .pipe(plugins.flatten())
        .pipe(plugins.dedupe({ same: false }))
        .pipe(gulp.dest(config.destination));
  };
};
