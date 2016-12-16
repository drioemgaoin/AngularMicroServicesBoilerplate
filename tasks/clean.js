'use strict';

var del = require('del');

module.exports = function(gulp, plugins, config) {
  return function() {
    return del.sync(config.destination + "/*");
  };
};
