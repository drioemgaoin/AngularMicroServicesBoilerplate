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

    var isMainPage = function (file) {
        var source = path.join(config.build.root, "/views/index.html");
        return file.path.endsWith(source);
    };

    return gulp.src(source)
        .pipe(plugins.flatten( { includeParents: 1 }))
        .pipe(plugins.if(options.dest, plugins.if(isMainPage, gulp.dest(config.deployment.root), gulp.dest(dest))));
  };
};
