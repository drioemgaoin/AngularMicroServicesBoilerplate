'use strict';

var mongoose = require('mongoose');
var config = require('../config');

var db = mongoose.connection;

db.on('error', function() {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

mongoose.connect(config.MONGO_URI);
