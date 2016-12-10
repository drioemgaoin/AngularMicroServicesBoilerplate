'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
      var sources = config.build.scripts.map(function(script) {
        return script.replace("{0}", path.join(config.basePath, config.build.root));
      });

      return gulp.src(sources)
        .pipe(plugins.jshint(config.basePath + "/.jshintrc"))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
    };
};
