'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config, options) {
  return function() {
    options = options || { dest: true };

    if (options.dest === undefined) {
      options.dest = true;
    }

    var source = path.join(config.basePath, config.build.root, config.build.views);
    var dest = path.join(config.deployment.root, config.deployment.views);

    return gulp.src(source)
        .pipe(plugins.flatten( { includeParents: 1 }))
        .pipe(plugins.if(options.dest, gulp.dest(dest)));
  };
};
