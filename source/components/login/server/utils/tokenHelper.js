'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');

var config = require('../config');

var tokenHelper = function() {
  return {
    createJWT: function(userId) {
      var payload = {
        sub: userId,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
      };

      return jwt.encode(payload, config.TOKEN_SECRET);
    }
  };
};

module.exports = tokenHelper;
