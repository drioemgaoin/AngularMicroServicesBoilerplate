'use strict';

module.exports = function(gulp, plugins, config) {
    return function() {
        return gulp.src(config.client.build.images)
            .pipe(plugins.imagemin({
              optimizationLevel: 3,
              progessive: true,
              interlaced: true
            }))
            .pipe(plugins.flatten())
            .pipe(gulp.dest(config.client.deployment.images))
            .pipe(plugins.size());
    };
};
