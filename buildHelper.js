'use strict';

var mergeStream = require('merge-stream');
var _ = require('lodash');

module.exports = function() {
  function isSimpleArray(element) {
    return !_.find(element, function(item) {
        return item instanceof Array;
      });
  };

  return {
    getBowerNpmSources: function(gulp, root, globs, options) {
      var flattenRoot = root instanceof Array
        ? _.flattenDeep(root)
        : root;

      if (flattenRoot instanceof Array) {
        var sources = flattenRoot
          .map(function(source) {
            return gulp.src(globs(source), options);
          });
        return mergeStream(sources);
      }

      return gulp.src(globs(root), options);
    },
    getSources: function(gulp, root, globs, options) {
      if (!isSimpleArray(root)) {
        var sources = root
          .map(function(source) {
            return gulp.src(globs(source), options);
          });
        return mergeStream(sources);
      }

      return gulp.src(globs(root), options);
    },
    sort: function(pattern, ascendant) {
      return {
        comparator: function(file1, file2) {
          ascendant = ascendant !== undefined ? ascendant : true;
          if (pattern.test(file1.path)) { return ascendant ? -1 : 1; }
          if (pattern.test(file2.path)) { return ascendant ? 1 : -1; }
          return 0;
        }
      };
    },
    isMainView: function(file) {
      return file.path.endsWith("/views/index.html");
    }
  };
}
