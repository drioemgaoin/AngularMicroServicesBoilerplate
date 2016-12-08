'use strict';

module.exports = function(gulp, plugins, config) {
    return function() {
        var condition = function (file) {
            return file.path.endsWith("/source/index.html");
        };

        gulp.src(config.client.build.views)
            .pipe(plugins.flatten({ subPath: [1, -1] }))
            .pipe(plugins.if(condition, gulp.dest(config.client.deployment.root), gulp.dest(config.client.deployment.views)));
    };
};
