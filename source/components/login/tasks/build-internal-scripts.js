'use strict';

var argv = require('yargs').argv;
var path = require('path');
var mergeStream = require('merge-stream');
var generateRoute = require('./generate-route');

module.exports = function(gulp, plugins, config, options) {
    return function() {
      options = options || { minify: true, dest: true };

      if (options.minify === undefined) {
        options.minify = true;
      }

      if (options.dest === undefined) {
        options.dest = true;
      }

      var sources = config.build.scripts.map(function(script) {
        return script.replace("{0}", path.join(config.basePath, config.build.root));
      });
      var dest = path.join(config.deployment.root, config.deployment.scripts);

      var streams = mergeStream(gulp.src(sources));
      if (options.dest) {
        streams.add(generateRoute(gulp, plugins, config)());
      }

      return mergeStream(streams)
        .pipe(plugins.if(argv.production, plugins.uglify({ mangle: false })))
        .pipe(plugins.if(options.minify, plugins.concat('internal.js')))
        .pipe(plugins.if(options.dest, gulp.dest(dest)));
    };
};
