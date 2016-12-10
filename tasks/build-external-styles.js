'use strict';

var argv = require('yargs').argv;
var mainBowerFiles = require('main-bower-files');
var path = require('path');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
    return function() {
      var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");
      var dest = path.join(config.client.deployment.root, config.client.deployment.styles);

      return mergeStream(
          componentManager.buildExternalStyle(),
          gulp.src(mainBowerFiles({
              filter: '**/*.scss',
              overrides: config.bowerOverrides
            }), { base: './' })
        )
        .pipe(plugins.sass())
        .pipe(plugins.if(argv.production, plugins.csso()))
        .pipe(plugins.flatten())
        .pipe(plugins.dedupe({ same: false }))
        .pipe(gulp.dest(dest));
  };
};
