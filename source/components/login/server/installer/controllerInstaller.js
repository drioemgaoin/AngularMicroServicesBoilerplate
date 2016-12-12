'use strict';

var fs = require('fs');
var path = require('path');

var controller = function(container, app) {
  var root = path.join(__dirname, "../controllers");
  fs.readdirSync(root).forEach(function (file) {
    if(file.substr(-3) === '.js') {
        container.register(file, require('../controllers/' + file));
        container.get(file, app);
    }
  });
};

module.exports = controller;
