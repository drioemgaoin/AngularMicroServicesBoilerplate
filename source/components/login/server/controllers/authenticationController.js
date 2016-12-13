'use strict';

var authenticationController = function(userRepository, tokenHelper, app) {

  app.post('/auth/login', function(req, res) {
    userRepository.get(req.body.email, req.body.password, function(result) {
      if (result.code) {
        res.status(result.code).send({ message: result.message });
      } else {
        res.send(result);
      }
    });
  });

  app.post('/auth/signup', function(req, res) {
    userRepository.add(req.body.displayName, req.body.email, req.body.password, function(result) {
      if (result.code) {
        res.status(result.code).send({ message: res.message });
      } else {
        res.send(result);
      }
    });
  });

};

authenticationController.$inject = ["userRepository", "tokenHelper"];

module.exports = authenticationController;
