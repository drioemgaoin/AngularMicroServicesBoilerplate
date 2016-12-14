'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
      var root = path.join(
        config.server.basePath,
        config.server.deployment.root);

      plugins.nodemon({
        script: root + '/server.js',
        watch: root,
        ext: 'js'
      });
    };
};
