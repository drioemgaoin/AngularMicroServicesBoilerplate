'use strict';

var argv = require('yargs').argv;
var mergeStream = require('merge-stream');
var mainBowerFiles = require('main-bower-files');
var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
      var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");
      var dest = path.join(config.client.deployment.root, config.client.deployment.scripts);

      return mergeStream(
            componentManager.buildExternalScript('client'),
            gulp.src(mainBowerFiles({
                  filter: '**/*.js',
                  overrides: config.bowerOverrides
                }), { base: './' }),
            gulp.src(plugins.mainNpmFiles(), { base: './' })
              .pipe(plugins.filter(["**/satellizer.js"]))
          )
          .pipe(plugins.if(argv.production, plugins.uglify()))
          .pipe(plugins.flatten())
          .pipe(plugins.order([
              "jquery.js",
              "jquery*.js",
              "angular.js",
              "angular*.js",
              "*.js"
              ], { base: './' })
          )
          .pipe(plugins.dedupe({ same: false }))
          .pipe(plugins.concat('vendor.js'))
          .pipe(gulp.dest(dest));
    };
};
