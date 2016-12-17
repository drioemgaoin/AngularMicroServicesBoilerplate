'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
  return function() {
    return gulp.src(config.source)
      .pipe(plugins.mainDedupe({ fullpath: false, same: false }))
      .pipe(plugins.inject(
          gulp.src(config.scripts + '/**/*.js', {read: false})
              .pipe(plugins.order(["vendor.js", "internal.js"])), {
        ignorePath: 'dist/client',
        addRootSlash: false
      }))
      .pipe(gulp.dest(config.destination))
      .pipe(plugins.inject(gulp.src(config.styles + '/**/*.css', {read: false}), {
        ignorePath: 'dist/client',
        addRootSlash: false
      }))
      .pipe(gulp.dest(config.destination));
  };
};
