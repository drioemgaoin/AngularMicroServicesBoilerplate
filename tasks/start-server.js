'use strict';

module.exports = function(gulp, plugins, config) {
    return function() {
        plugins.connect.server({
          root: config.client.deployment.root,
          livereload: true,
          port: 9000,
        });
    };
};
