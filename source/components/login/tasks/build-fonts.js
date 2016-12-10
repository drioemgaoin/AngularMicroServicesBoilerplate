'use strict';

var path = require('path');
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config, options) {
  return function() {
    options = options || { dest: true };

    if (options.dest === undefined) {
      options.dest = true;
    }

    var dest = path.join(config.deployment.root, config.deployment.fonts);

    return gulp.src(mainBowerFiles({
          paths: config.basePath,
          filter: '**/*.{otf,eot,svg,ttf,woff,woff2}',
          overrides: config.bowerOverrides
        }), { base: './' })
        .pipe(plugins.flatten())
        .pipe(plugins.if(options.dest, gulp.dest(dest)));
  };
};
