'use strict';

module.exports = function(gulp, plugins, config) {
    return function() {
      var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");

      return componentManager.clean('client')()
        .on('end', componentManager.clean('server'));
    };
};
