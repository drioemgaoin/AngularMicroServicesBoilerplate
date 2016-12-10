'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
  return function() {
    var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");
    return componentManager.buildServer();
  };
};
