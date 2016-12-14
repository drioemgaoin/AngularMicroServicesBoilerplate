'use strict';

module.exports = function(gulp, plugins, config) {
    return function() {
        gulp.watch(config.server.build.root + "/**/*.*", ['build-server']);
    };
};
