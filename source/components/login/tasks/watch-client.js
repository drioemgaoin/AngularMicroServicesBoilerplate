'use strict';

var path = require('path');
var browserSync = require('browser-sync').create();

module.exports = function(gulp, plugins, config) {
    return function() {
        gulp.watch("./bower.json", ['build-external-scripts', 'build-external-styles', 'build-fonts']);
        gulp.watch(path.join(config.client.build.root, "/styles/**/*.scss"), ['build-internal-styles']);
        gulp.watch(path.join(config.client.build.root, "/**/*.js"), ['build-internal-scripts']);
        gulp.watch(path.join(config.client.build.root, "/views/**/*.html"), ['build-views', 'build-internal-styles']);
        gulp.watch(path.join(config.client.build.root, "/images/**/*.{jpg,jpeg,png,gif}"), ['build-images']);
        gulp.watch(config.client.build.root + "/**/*.{css,jpg,jpeg,png,gif,js}").on('change', browserSync.reload);
        gulp.watch(path.join(config.client.build.root, "/views/**/*.html"), ['inject']).on('change', browserSync.reload);
    };
};
