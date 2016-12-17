'use strict';

var argv = require('yargs').argv;
var mergeStream = require('merge-stream');
var path = require('path');
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config) {
  return function() {

    function getBowerSources(root) {
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

    function getNpmSources(root) {
      if (root instanceof Array) {
        return root
          .map(function(source) {
            return gulp.src(plugins.mainNpmFiles({
              nodeModulesPath: source.replace("./", "../") + "/node_modules",
              packageJsonPath: source.replace("./", "../") + "/package.json"
            }), { base: './' });
          });
      }

      return gulp.src(plugins.mainNpmFiles({
        nodeModulesPath: root.replace("./", "../")+ "/node_modules",
        packageJsonPath: root.replace("./", "../") + "/package.json"
      }), { base: './' });
    }

    var bowerSources = getBowerSources(config.source);
    var npmSources = getNpmSources(config.npm.source);
    return mergeStream(
      (bowerSources instanceof Array ? mergeStream(bowerSources) : bowerSources),
      (npmSources instanceof Array ? mergeStream(npmSources) : npmSources)
        .pipe(plugins.filter(["**/satellizer.js", "**/toastr.js"]))
    )
    .pipe(plugins.if(argv.production, plugins.uglify()))
    .pipe(plugins.flatten())
    .pipe(plugins.mainDedupe({ same: false }))
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
