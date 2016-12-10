'use strict';

var argv = require('yargs').argv;
var path = require('path');

module.exports = function(gulp, plugins, config, options) {
  return function() {
    options = options || { dest: true };

    if (options.dest === undefined) {
      options.dest = true;
    }

    var source = path.join(config.basePath, config.build.root, config.build.styles);
    var dest = path.join(config.deployment.root, config.deployment.styles);

    return gulp.src(source)
      .pipe(plugins.sass())
      .pipe(plugins.if(argv.production, plugins.csso()))
      .pipe(plugins.flatten())
      .pipe(plugins.if(options.dest, gulp.dest(dest)));
  }
};
