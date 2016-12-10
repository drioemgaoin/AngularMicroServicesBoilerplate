'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
      var root = path.join(
        config.server.basePath,
        config.server.deployment.root);

      return gulp.src(root + "/package.json")
        .pipe(plugins.install())
        .pipe(gulp.dest(root))
        .on('finish', function() {
          plugins.nodemon({
            script: root + '/server.js',
            ext: 'js html',
            env: { 'NODE_ENV': 'development' }
          });
        })
    };
};
