'use strict';

var argv = require('yargs').argv;
var mergeStream = require('merge-stream');
var path = require('path');
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config, options) {
  return function() {
    options = options || { minify: true, dest: true };

    if (options.minify === undefined) {
      options.minify = true;
    }

    if (options.dest === undefined) {
      options.dest = true;
    }

    var dest = path.join(config.deployment.root, config.deployment.scripts);

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
    )
    .pipe(plugins.if(options.minify, plugins.concat('vendor.js')))
    .pipe(plugins.if(options.dest, gulp.dest(dest)));
  }
};
