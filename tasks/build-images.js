'use strict';

var path = require('path');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
  return function() {
    var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");
    var source = path.join(config.client.basePath, config.client.build.root, config.client.build.images);
    var dest = path.join(config.client.deployment.root, config.client.deployment.images);

    return mergeStream(
        componentManager.buildImages()(),
        gulp.src(source)
            .pipe(plugins.imagemin({
              optimizationLevel: 3,
              progessive: true,
              interlaced: true
            }))
            .pipe(plugins.flatten())
      )
      .pipe(plugins.dedupe({ same: false }))
      .pipe(gulp.dest(dest))
      .pipe(plugins.size());
  };
};
