'use strict';

var path = require('path');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
  return function() {
    var isMainPage = function (file) {
        return file.path.endsWith("/views/index.html");
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
    return (sources instanceof Array ? mergeStream(sources) : sources)
        .pipe(plugins.flatten())
        .pipe(plugins.mainDedupe({ fullpath: false, same: false }))
        .pipe(plugins.if(isMainPage, gulp.dest(config.destination.main), gulp.dest(config.destination.other)));
  };
};
