'use strict';

var argv = require('yargs').argv;
var browserSync = require('browser-sync');

module.exports = function(gulp, plugins, config) {
    return gulp.src(config.build.styles)
      .pipe(plugins.sass())
      .pipe(plugins.if(argv.production, plugins.csso()))
      .pipe(plugins.flatten());
};
