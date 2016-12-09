'use strict';

var path = require('path');
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config) {
    return gulp.src(mainBowerFiles({
          paths: config.componentRoot,
          filter: '**/*.{otf,eot,svg,ttf,woff,woff2}',
          overrides: config.bowerOverrides
        }), { base: './' })
        .pipe(plugins.flatten());
};
