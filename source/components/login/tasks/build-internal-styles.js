'use strict';

var argv = require('yargs').argv;
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
    return (sources instanceof Array ? mergeStream(sources) : sources)
      .pipe(plugins.sass())
      .pipe(plugins.if(argv.production, plugins.csso()))
      .pipe(plugins.flatten())
      .pipe(gulp.dest(config.destination));
  };
};
