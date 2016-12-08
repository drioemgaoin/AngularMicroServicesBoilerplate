'use strict';

module.exports = function(gulp, plugins, config) {
    return function() {
        return gulp.src('./bower.json')
            .pipe(plugins.mainBowerFiles({ overrides: config.bowerOverrides }))
            .pipe(plugins.filter('**/*.{otf,eot,svg,ttf,woff,woff2}'))
            .pipe(plugins.flatten())
            .pipe(gulp.dest(config.deployment.fonts));
    };
};
