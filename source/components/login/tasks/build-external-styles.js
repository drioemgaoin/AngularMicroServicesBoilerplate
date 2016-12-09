'use strict';

var argv = require('yargs').argv;
var path = require('path');
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config) {
    return gulp.src(mainBowerFiles({
          paths: config.componentRoot,
          filter: '**/*.scss',
          overrides: config.bowerOverrides
        }), { base: './' })
        .pipe(plugins.sass())
        .pipe(plugins.if(argv.production, plugins.csso()))
        .pipe(plugins.flatten());
};
