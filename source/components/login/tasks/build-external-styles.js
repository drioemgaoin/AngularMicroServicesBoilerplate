'use strict';

var argv = require('yargs').argv;
var path = require('path');
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config, options) {
  return function() {
    options = options || { dest: true };

    if (options.dest === undefined) {
      options.dest = true;
    }

    var dest = path.join(config.deployment.root, config.deployment.styles);

    return gulp.src(mainBowerFiles({
          paths: config.componentRoot,
          filter: ['**/*.css'],
          overrides: config.bowerOverrides
        }), { base: './' })
        .pipe(plugins.sass())
        .pipe(plugins.if(argv.production, plugins.csso()))
        .pipe(plugins.flatten())
        .pipe(plugins.if(options.dest, gulp.dest(dest)));
  };
};
