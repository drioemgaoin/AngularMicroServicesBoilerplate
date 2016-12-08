'use strict';

var fs = require('fs');
var path = require("path");
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, componentsPath) {
  var componentBuilds = [];
  var root = path.join("./", __dirname.replace(process.cwd(), ""));
  var componentRoot = path.join(root, "/components");

  function getBuilds(startPath, filter){
      if (!fs.existsSync(startPath)) {
          return;
      }

      var files = fs.readdirSync(startPath);
      for(var i = 0; i < files.length; i++){
          var filename = path.join(startPath, files[i]);
          var stat = fs.lstatSync(filename);
          if (stat.isDirectory()) {
              getBuilds(filename, filter);
          } else {
            if (filter.test(filename)) {
              componentBuilds.push(require(filename.replace(root, "."))(gulp, plugins));
            }
          }
      };
  };

  getBuilds(componentRoot, /build\.js$/);

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
    lint: function(type) {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.lint(type);
        })
      )
    }
  }
}
