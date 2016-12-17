'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
      plugins.nodemon({
        script: config.root + '/server.js',
        watch: config.root,
        ext: 'js'
      });
    };
};
