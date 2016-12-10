'use strict';

var argv = require('yargs').argv;
var path = require('path');
var mergeStream = require('merge-stream');
var generateRoute = require('./generate-route');

module.exports = function(gulp, plugins, config) {
  return function() {
    var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");

    var sources = config.client.build.scripts.map(function(script) {
      return script.replace("{0}", path.join(config.client.basePath, config.client.build.root));
    });
    var clientDest = path.join(config.client.deployment.root, config.client.deployment.scripts);

    return mergeStream(
        generateRoute(gulp, plugins, config)().pipe(plugins.concat('route')),
        componentManager.buildInternalScript('client')().pipe(plugins.concat('component')),
        gulp.src(sources)
          .pipe(plugins.if(argv.production, plugins.uglify({ mangle: false })))
          .pipe(plugins.concat('root'))
      )
      .pipe(plugins.order(['route', 'root', 'component']))
      .pipe(plugins.concat('internal.js'))
      .pipe(gulp.dest(clientDest))
      .on('end', function() {
        componentManager.buildInternalScript('server')()
          .pipe(gulp.dest(config.server.deployment.root))
      });
  };
};
