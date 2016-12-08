'use strict';

var browserSync = require('browser-sync').create();

module.exports = function(gulp, plugins, config) {
    return function() {
        browserSync.init({
            server: {
                baseDir: "./dist"
            },
            ignoreInitial : true
        });

        gulp.watch(config.bower, ['build-external-scripts', 'build-external-styles', 'build-fonts']);
        gulp.watch(config.paths.styles, ['build-internal-styles']);
        gulp.watch(config.paths.scripts, ['build-internal-scripts']);
        gulp.watch(config.paths.views, ['build-views']);
        gulp.watch(config.paths.images, ['build-images']);

        gulp.watch(config.deployment.root + "/**/*.{css,jpg,jpeg,png,gif,js}").on('change', browserSync.reload);
        gulp.watch(config.deployment.views + "/**/*.html", ['inject']).on('change', browserSync.reload);
    };
};
