'use strict';

var path = require('path');
var mainBowerFiles = require('main-bower-files');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
  return function() {
    var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");
    var dest = path.join(config.client.deployment.root, config.client.deployment.fonts);

    return mergeStream(
        componentManager.buildFonts()(),
        gulp.src(mainBowerFiles({
              paths: config.client.basePath,
              filter: '**/*.{otf,eot,svg,ttf,woff,woff2}',
              overrides: config.bowerOverrides
            }), { base: './' })
            .pipe(plugins.flatten())
      )
      .pipe(plugins.dedupe({ same: false }))
      .pipe(gulp.dest(dest));
  };
};
