'use strict';

var installer = function(container) {
  container.register("tokenHelper", require('../utils/tokenHelper')(), "singleton");
};

module.exports = installer;
