'use strict';

var fs = require('fs');
var path = require("path");
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, componentsPath) {
  var root = path.join("./", __dirname.replace(process.cwd(), ""));
  var componentRoot = path.join(root, "/components");

  function getDirectories() {
    return fs.readdirSync(componentRoot).filter(function(file) {
      return fs.statSync(path.join(componentRoot, file)).isDirectory();
    }).map(function(file) {
      var build = path.join('components/', file);
      return require("./" + build + "/build.js")(gulp, plugins);
    });
  }

  var componentBuilds = getDirectories();

  return {
    clean: function(type) {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.clean(type);
        })
      );
    },
    buildInternalScript: function(type) {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.buildInternalScript(type);
        })
      )
    },
    buildExternalScript: function(type) {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.buildExternalScript(type);
        })
      )
    },
    buildInternalStyle: function(type) {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.buildInternalStyle(type);
        })
      )
    },
    buildExternalStyle: function(type) {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.buildExternalStyle(type);
        })
      )
    },
    buildViews: function() {
      return [
        componentBuilds.map(function(build) {
          return build.buildViews();
        })
      ];
    },
    buildImages: function() {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.buildImages();
        })
      )
    },
    buildFonts: function() {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.buildFonts();
        })
      )
    },
    lint: function(type) {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.lint(type);
        })
      )
    }
  }
}
