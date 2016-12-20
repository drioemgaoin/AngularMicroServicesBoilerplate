'use strict';

var argv = require('yargs').argv;
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins, config) {
    return function() {
      var sources = buildHelper.getSources(gulp, config.source, function(root) {
        return root;
      });

      return sources
      .pipe(plugins.jshint(config.path + "/.jshintrc"))
      .pipe(plugins.jshint.reporter('jshint-stylish'));
    };
};
