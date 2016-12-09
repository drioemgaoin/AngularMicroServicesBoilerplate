'use strict';

var argv = require('yargs').argv;
var mergeStream = require('merge-stream');
var path = require('path');
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config) {
      return mergeStream(
        gulp.src(mainBowerFiles({
              paths: config.componentRoot,
              filter: '**/*.js',
              overrides: config.bowerOverrides
            }), { base: './' }),
        gulp.src(plugins.mainNpmFiles({
          nodeModulesPath: "../node_modules",
          packageJsonPath: "../package.json"
        }), { base: './' })
        .pipe(plugins.filter(["**/satellizer.js", "**/toastr.js"]))
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
      );
};
