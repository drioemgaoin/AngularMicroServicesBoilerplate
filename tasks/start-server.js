'use strict';

var path = require('path');
var fs = require('fs');

module.exports = function(gulp, plugins, config) {
    return function() {
      if (fs.existsSync(config.root + '/server.js')) {
        plugins.nodemon({
          script: config.root + '/server.js',
          watch: config.root,
          ext: 'js'
        });
      } else {
        plugins.connect.server({
          root: './dist/client',
          livereload: true,
          port: 9000,
        });
      }
    };
};
