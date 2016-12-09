'use strict';

var config = require('./config.json');

module.exports = function(gulp, plugins) {
  return {
    clean: function(type) {
      var task = require('./tasks/clean');
      return type === 'client'
        ? task(gulp, plugins, config.client)
        : task(gulp, plugins, config.server);
    },
    buildInternalScript: function(type) {
      var task = require('./tasks/build-internal-scripts');
      return type === 'client'
        ? task(gulp, plugins, config.client)
        : task(gulp, plugins, config.server);
    },
    buildInternalStyle: function(type) {
      var task = require('./tasks/build-internal-styles');
      return type === 'client'
        ? task(gulp, plugins, config.client)
        : task(gulp, plugins, config.server);
    },
    buildExternalScript: function(type) {
      var task = require('./tasks/build-external-scripts');
      return type === 'client'
        ? task(gulp, plugins, config.client)
        : task(gulp, plugins, config.server);
    },
    buildExternalStyle: function(type) {
      var task = require('./tasks/build-external-styles');
      return type === 'client'
        ? task(gulp, plugins, config.client)
        : task(gulp, plugins, config.server);
    },
    buildViews: function() {
      var task = require('./tasks/build-views');
      return task(gulp, plugins, config.client);
    },
    buildImages: function() {
      var task = require('./tasks/build-images');
      return task(gulp, plugins, config.client);
    },
    buildFonts: function() {
      var task = require('./tasks/build-fonts');
      return task(gulp, plugins, config.client);
    },
    lint: function(type) {
      var task = require('./tasks/lint');
      return type === 'client'
        ? task(gulp, plugins, config.client)
        : task(gulp, plugins, config.server);
    }
  };
};
