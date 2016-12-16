'use strict';

var path = require('path');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
    return function() {
      var isMainPage = function (file) {
          return file.path.endsWith("index.html");
      };

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
          .pipe(plugins.sort({
            comparator: function(file1, file2) {
              if (file1.path.indexOf('components') > -1) {
                return -1;
              }

              if (file2.path.indexOf('components') > -1) {
                  return 1;
              }

              return 0;
            }
          }))
          .pipe(plugins.flatten())
          .pipe(plugins.dedupe({ same: false }))
          .pipe(plugins.if(isMainPage, gulp.dest(config.destination.main), gulp.dest(config.destination.other)));
    };
};
