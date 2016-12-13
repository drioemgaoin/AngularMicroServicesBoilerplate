'use strict';

var installer = function(container) {
  container.register("tokenHelper", require('../utils/tokenHelper')(), "singleton");
  container.register("userRepository", require('../repository/userRepository'), "singleton");
};

module.exports = installer;
