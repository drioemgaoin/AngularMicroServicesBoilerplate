'use strict';

var path = require('path');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;

module.exports = function(gulp, plugins, config) {
    return function() {
      function getSources(root, filter) {
        if (root instanceof Array) {
          return root.map(function(item) {
            return item + filter;
          })
        }

        return root + filter;
      }

      function watch(source) {
        gulp.watch("./bower.json", ['build-external-scripts-client', 'build-external-styles-client', 'build-fonts-client']);
        gulp.watch(getSources(source, "/**/*.scss"), ['build-internal-styles-client']);
        gulp.watch(getSources(source, "/**/*.js"), ['build-internal-scripts-client']);
        gulp.watch(getSources(source, "/**/*.html"), ['build-views-client', 'build-internal-styles-client']).on('change', function() {
          gulp.start('inject-client');
          browserSync.reload();
        });
        gulp.watch(getSources(source, "/**/*.{jpg,jpeg,png,gif}"), ['build-images-client']);
        gulp.watch(getSources(source, "/**/*.{css,jpg,jpeg,png,gif,js}")).on('change', browserSync.reload);
      }

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
