'use strict';

var path = require('path');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
    return function() {
      var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");
      var source = path.join(config.client.basePath, config.client.build.root, config.client.build.views);
      var dest = path.join(config.client.deployment.root, config.client.deployment.views);

      return mergeStream(
        componentManager.buildViews()(),
        gulp.src(source)
      )
      .pipe(plugins.ignore.exclude(function(file) {
        return file.path.indexOf("/components/") !== -1 &&
          file.path.endsWith("/views/index.html");
      }))
      .pipe(gulp.dest(dest));
    };
};
