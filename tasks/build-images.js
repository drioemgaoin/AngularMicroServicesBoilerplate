'use strict';

var path = require('path');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
  return function() {

    function getSources(root) {
      if (root instanceof Array) {
        return root
          .map(function(source) {
            return gulp.src(source);
          });
      }

      return gulp.src(root);
    };

    var sources = getSources(config.source);
    return (sources.length > 1 ? mergeStream(sources) : sources[0])
      .pipe(plugins.imagemin({
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }))
      .pipe(plugins.flatten())
      .pipe(plugins.dedupe({ same: false }))
      .pipe(gulp.dest(config.destination))
      .pipe(plugins.size());
  };
};
