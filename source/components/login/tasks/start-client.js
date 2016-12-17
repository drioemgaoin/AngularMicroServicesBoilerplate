'use strict';

var openURL = require('open');
var argv = require('yargs').argv;
var browserSync = require('browser-sync').create();

module.exports = function(gulp, plugins, config) {
    return function() {
      if (argv.production) {
        openURL('http://localhost:9000');
      } else {
        browserSync.init(null, {
          proxy: "http://localhost:9000",
          port: 7000,
          files: [config.root + "/**/*.*"]
        });
      }
    };
};
