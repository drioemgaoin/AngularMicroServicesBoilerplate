'use strict';

var argv = require('yargs').argv;
var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
      function getSources(root, filter) {
        if (root instanceof Array) {
          return root.map(function(item) {
            return item + filter;
          })
        }

        return root + filter
      };

      function watch(source) {
        gulp.watch(getSources(source + "/**/*.*"), ['build-server-server']);
      };

      if (!argv.production) {
        if (config.source instanceof Array) {
          config.source.forEach(function(item) {
            watch(item);
          });
        } else {
          watch(config.source);
        }
      }
    };
};
