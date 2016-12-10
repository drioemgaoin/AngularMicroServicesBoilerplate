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
      return path.join('components/', file);
    });
  }

  var componentBuilds = getDirectories()
    .map(function(directory) {
      return require("./" + directory + "/build.js")(gulp, plugins);
    });

  return {
    getConfigRoutes: function() {
      return getDirectories().map(function(directory) {
        return "./" + path.join(root, "/" , directory, "/client/config.js");
      });
    },
    clean: function(type) {
      return function() {
        return mergeStream(
          componentBuilds.map(function(build) {
            return build.clean(type)();
          })
        );
      };
    },
    buildInternalScript: function(type) {
      return function() {
        return mergeStream(
          componentBuilds.map(function(build) {
            return build.buildInternalScript(type, { minify: false, dest: false })();
          })
        )
      };
    },
    buildExternalScript: function() {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.buildExternalScript({ minify: false, dest: false })();
        })
      )
    },
    buildInternalStyle: function() {
      return function() {
        return mergeStream(
          componentBuilds.map(function(build) {
            return build.buildInternalStyle({ dest: false })();
          })
        )
      };
    },
    buildExternalStyle: function() {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.buildExternalStyle({ dest: false })();
        })
      )
    },
    buildViews: function() {
      return function() {
        return mergeStream(
          componentBuilds.map(function(build) {
            return build.buildViews({ dest: false })();
          })
        );
      };
    },
    buildImages: function() {
      return function() {
        return mergeStream(
          componentBuilds.map(function(build) {
            return build.buildImages({ dest: false })();
          })
        );
      };
    },
    buildFonts: function() {
      return function() {
        return mergeStream(
          componentBuilds.map(function(build) {
            return build.buildFonts({ dest: false })();
          })
        );
      };
    },
    buildServer: function() {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.buildServer()();
        })
      );
    },
    lint: function(type) {
      return mergeStream(
        componentBuilds.map(function(build) {
          return build.lint(type)();
        })
      )
    }
  }
}
