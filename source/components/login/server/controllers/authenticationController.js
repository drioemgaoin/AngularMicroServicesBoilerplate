'use strict';

var authenticationController = function(tokenHelper, app) {

  app.post('/auth/signup', function(req, res) {
    // TODO: save the user in mongodb
  });

};

authenticationController.$inject = ["tokenHelper"];

module.exports = authenticationController;
