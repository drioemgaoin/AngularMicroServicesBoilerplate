'use strict';

var User = require('../models/user');

var userRepository = function(tokenHelper) {
  return {
    get: function(email, password, cb) {
      User.findOne({ email: email }, '+password', function(err, user) {
        if (!user) {
          return cb({ code: 401, message: 'Invalid email and/or password' });
        }

        user.comparePassword(password, function(err, isMatch) {
          if (!isMatch) {
            return cb({ code: 401, message: 'Invalid email and/or password' });
          }

          cb({ token: tokenHelper.createJWT(user) });
        });
      });
    },

    add: function(displayName, email, password, cb) {
      User.findOne({ email: email }, function(err, existingUser) {
        if (existingUser) {
          return cb({ code: 409, message: 'Email is already taken' });
        }

        var user = new User({
          displayName: displayName,
          email: email,
          password: password
        });

        user.save(function(err, result) {
          if (err) {
            return cb({ code: 500, message: err.message });
          }

          cb({ token: tokenHelper.createJWT(result) });
        });
      });
    }
  };
};

userRepository.$inject = ["tokenHelper"];

module.exports = userRepository;
