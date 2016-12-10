'use strict';

var argv = require('yargs').argv;
var config = require('./gulpconfig.json');
config.client.basePath = argv.integrated ? __dirname : config.client.basePath;
config.server.basePath = argv.integrated ? __dirname : config.server.basePath;

module.exports = function(gulp, plugins) {
  return {
    clean: function(type) {
      var task = require('./tasks/clean');
      return type === 'client'
        ? task(gulp, plugins, config.client)
        : task(gulp, plugins, config.server);
    },
    buildInternalScript: function(type, options) {
      var task = require('./tasks/build-internal-scripts');
      return type === 'client'
        ? task(gulp, plugins, config.client, options)
        : task(gulp, plugins, config.server, options);
    },
    buildInternalStyle: function(options) {
      var task = require('./tasks/build-internal-styles');
      return task(gulp, plugins, config.client, options);
    },
    buildExternalScript: function(options) {
      var task = require('./tasks/build-external-scripts');
      return task(gulp, plugins, config.client, options);
    },
    buildExternalStyle: function(options) {
      var task = require('./tasks/build-external-styles');
      return task(gulp, plugins, config.client, options);
    },
    buildViews: function(options) {
      var task = require('./tasks/build-views');
      return task(gulp, plugins, config.client, options);
    },
    buildImages: function(options) {
      var task = require('./tasks/build-images');
      return task(gulp, plugins, config.client, options);
    },
    buildFonts: function(options) {
      var task = require('./tasks/build-fonts');
      return task(gulp, plugins, config.client, options);
    },
    buildServer: function() {
      var task = require('./tasks/build-server');
      return task(gulp, plugins, config.server);
    },
    lint: function(type) {
      var task = require('./tasks/lint');
      return type === 'client'
        ? task(gulp, plugins, config.client)
        : task(gulp, plugins, config.server);
    }
  };
};
