'use strict';

var mergeStream = require('merge-stream');
var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
      var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");

      var sources = config.client.build.scripts.map(function(script) {
        return script.replace("{0}", path.join(config.client.basePath, config.client.build.root));
      });

      return mergeStream(
        componentManager.lint('client'),
        componentManager.lint('server'),
        gulp.src(sources)
          .pipe(plugins.jshint())
          .pipe(plugins.jshint.reporter('jshint-stylish'))
      );
    };
};
