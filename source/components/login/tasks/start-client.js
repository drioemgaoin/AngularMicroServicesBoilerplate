'use strict';

var openURL = require('open');

module.exports = function(gulp, plugins, config) {
    return function() {
        openURL('http://localhost:9000');
    };
};
