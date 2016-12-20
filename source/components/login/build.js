'use strict';

var argv = require('yargs').argv;
var buildConfig = require('./buildConfig.json');

module.exports = function(gulp, plugins) {

  var runSequence  = require('run-sequence').use(gulp);

  var tasks = [];
  function initialize(root, options, target) {
    for (var key in root) {
      if (root[key].taskName) {
        if (root[key].config) {
          var task = require('./tasks/' + root[key].taskName);
          tasks.push({
            name: root[key].taskName + "-" + target,
            core: require("./tasks/" + root[key].taskName)(gulp, plugins, root[key].config)
          })
        }
      } else {
        initialize(root[key], options, target);
      }
    }
  }

  initialize(buildConfig.client, {}, 'client');
  initialize(buildConfig.server, {}, 'server');

  for(var task in tasks) {
    gulp.task(tasks[task].name, tasks[task].core);
  }

  return {
    buildClient: function(cb) {
      return runSequence(
        'clean-client',
        'lint-client',
        [
          'build-views-client',
          'build-fonts-client',
          'build-images-client',
          'build-internal-scripts-client',
          'build-internal-styles-client',
          'build-external-scripts-client',
          'build-external-styles-client'
        ],
        "inject-client",
        cb
      );
    },
    buildServer: function(cb) {
      return runSequence(
        'clean-server',
        'lint-server',
        [
          'build-internal-scripts-server',
          'build-server-server'
        ],
        cb
      );
    },
    startClient: function(cb) {
      return runSequence(
        'start-client-client',
        'watch-client-client',
        cb
      );
    },
    startServer: function(cb) {
      return runSequence(
        'start-server-server',
        'watch-server-server',
        cb
      );
    }
  };
};
