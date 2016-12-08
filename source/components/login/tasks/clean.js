'use strict';

module.exports = function(gulp, plugins, config) {
    return gulp.src(config.deployment.root, {read: false})
        .pipe(plugins.clean());
};
