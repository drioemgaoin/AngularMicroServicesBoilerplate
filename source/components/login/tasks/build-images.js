'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config, options) {
  return function() {
    options = options || { dest: true };

    if (options.dest === undefined) {
      options.dest = true;
    }

    var source = path.join(config.basePath, config.build.root, config.build.images);
    var dest = path.join(config.deployment.root, config.deployment.images);

    return gulp.src(source)
        .pipe(plugins.imagemin({
          optimizationLevel: 3,
          progessive: true,
          interlaced: true
        }))
        .pipe(plugins.flatten())
        .pipe(plugins.if(options.dest, gulp.dest(dest)))
        .pipe(plugins.if(options.dest, plugins.size()));
  };
};
