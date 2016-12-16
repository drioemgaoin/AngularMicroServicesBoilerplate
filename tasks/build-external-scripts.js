'use strict';

var argv = require('yargs').argv;
var mergeStream = require('merge-stream');
var mainBowerFiles = require('main-bower-files');
var path = require('path');
var mainDedupe = require('../gulp-main-dedupe');

module.exports = function(gulp, plugins, config) {
    return function() {

      function getSources(root) {
        if (root instanceof Array) {
          return root
            .map(function(source) {
              return gulp.src(mainBowerFiles({
                    paths: source,
                    filter: '**/*.js',
                    overrides: config.bowerOverrides
                  }), { base: './' });
            });
        }

        return gulp.src(mainBowerFiles({
              paths: root,
              filter: '**/*.js',
              overrides: config.bowerOverrides
            }), { base: './' });
      };

      var sources = getSources(config.source);
      return mergeStream(
        (sources instanceof Array ? mergeStream(sources) : sources),
        gulp.src(plugins.mainNpmFiles({
          nodeModulesPath: "../node_modules",
          packageJsonPath: "../package.json"
        }), { base: './' })
        .pipe(plugins.filter(["**/satellizer.js", "**/toastr.js"]))
      )
      .pipe(plugins.if(argv.production, plugins.uglify()))
      .pipe(plugins.flatten())
      .pipe(mainDedupe({ same: false }))
      .pipe(plugins.order([
          "jquery.js",
          "jquery*.js",
          "angular.js",
          "angular*.js",
          "*.js"
          ], { base: './' })
      )
      .pipe(plugins.concat(config.fileName))
      .pipe(gulp.dest(config.destination));

    };
};
