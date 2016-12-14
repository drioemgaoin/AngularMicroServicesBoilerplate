'use strict';

var mongoose = require('mongoose');
var config = require('./config');

var db = mongoose.connection;

var mongoDbManager = function() {
  return {
    start: function(cb) {
      mongoose.connect(config.MONGO_URI);

      db.on('connected', function() {
        console.log('Mongoose default connection open to ' + config.MONGO_URI);
        cb();
      });

      db.on('error', function(err) {
        console.log('Mongoose default connection error: ' + err);
      });
    }
  };
};

module.exports = mongoDbManager;
