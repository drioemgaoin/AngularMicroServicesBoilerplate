'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
  return function() {
    var packageJson = path.join(config.basePath, "/package.json");
    var dest = path.join(config.deployment.root, config.deployment.scripts);

    return gulp.src(packageJson)
      .pipe(gulp.dest(dest))
      .pipe(plugins.install())
      .pipe(gulp.dest(dest));
  };
};
