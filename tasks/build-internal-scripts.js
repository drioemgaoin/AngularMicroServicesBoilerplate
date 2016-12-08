'use strict';

var argv = require('yargs').argv;

module.exports = function(gulp, plugins, config) {
    return function() {
      return gulp.src(config.client.build.scripts)
          .pipe(plugins.if(argv.production, plugins.uglify({mangle: false})))
          .pipe(plugins.concat('internal.js'))
          .pipe(gulp.dest(config.client.deployment.scripts));
    };
};
