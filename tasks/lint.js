'use strict';

module.exports = function(gulp, plugins, config) {
    return function() {
        config.client.build.scripts.push(config.server.build.scripts);
        return gulp.src(config.client.build.scripts)
          .pipe(plugins.jshint())
          .pipe(plugins.jshint.reporter('jshint-stylish'));
    };
};
