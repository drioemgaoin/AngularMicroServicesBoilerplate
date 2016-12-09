'use strict';

var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config) {
    return function() {
        return gulp.src(mainBowerFiles({
              filter: '**/*.{otf,eot,svg,ttf,woff,woff2}',
              overrides: config.bowerOverrides
            }), { base: './' })
            .pipe(plugins.flatten());
    };
};
