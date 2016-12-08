'use strict';

module.exports = function(gulp, plugins, config) {
    return gulp.src(config.build.images)
        .pipe(plugins.imagemin({
          optimizationLevel: 3,
          progessive: true,
          interlaced: true
        }))
        .pipe(plugins.flatten());
};
