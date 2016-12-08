'use strict';

var argv = require('yargs').argv;
var browserSync = require('browser-sync');

module.exports = function(gulp, plugins, config) {
    return function() {
        return gulp.src(config.client.build.styles)
          .pipe(plugins.sass())
          .pipe(plugins.if(argv.production, plugins.csso()))
          .pipe(plugins.flatten())
          .pipe(gulp.dest(config.client.deployment.styles));
    };
};
