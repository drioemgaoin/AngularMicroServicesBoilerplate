'use strict';

var mergeStream = require('merge-stream');

module.exports = function() {
  return {
    getSources: function(gulp, root, globs, options) {
      if (root instanceof Array) {
        var sources = root
          .map(function(source) {
            return gulp.src(globs(source), options);
          });
        return mergeStream(sources);
      }

      return gulp.src(globs(root), options);
    }
  };
}
