'use strict';

var configComponent = require('../source/components/login/config.json');

module.exports = function(gulp, plugins, config) {
    return function() {
        return gulp.src(config.server.deployment.root + "/package.json")
          .pipe(plugins.install())
          .pipe(gulp.dest(config.server.deployment.root))
          .on('finish', function() {
            plugins.nodemon({
              script: config.server.deployment.root + '/server.js',
              ext: 'js html',
              env: { 'NODE_ENV': 'development' }
            });
          })
    };
};
