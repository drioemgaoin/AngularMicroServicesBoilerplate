'use strict';

module.exports = function(gulp, plugins, config) {
    return gulp.src(config.build.scripts)
      .pipe(plugins.jshint(config.build.root + "/../.jshintrc"))
      .pipe(plugins.jshint.reporter('jshint-stylish'));
};
