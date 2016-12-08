'use strict';

module.exports = function(gulp, plugins, config) {
    return gulp.src(config.build.views)
        .pipe(plugins.flatten())
        .pipe(gulp.dest(config.deployment.views));
};
