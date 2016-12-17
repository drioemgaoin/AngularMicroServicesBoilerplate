'use strict';

module.exports = function(gulp, plugins, config) {
  return function() {
    return gulp.src(config.source)
      .pipe(gulp.dest(config.destination))
      .pipe(plugins.install({ production: true }))
      .pipe(gulp.dest(config.destination));
  };
};
