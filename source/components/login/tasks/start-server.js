'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
      plugins.nodemon({
        script: config.source + '/server.js',
        watch: config.source,
        ext: 'js'
      });
    };
};
