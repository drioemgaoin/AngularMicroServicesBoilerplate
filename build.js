'use strict';

var argv = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var util = require("util");
var mergeStream = require("merge-stream");
var buildConfig = require('./buildConfig.json');
var _ = require('lodash');

module.exports = function(gulp, plugins) {

  var runSequence = require('run-sequence').use(gulp);
  var root = path.join("./", __dirname.replace(process.cwd(), ""));
  var componentRoot = path.join(root, "/source/components");

  function getBuildConfigs() {
    return fs.readdirSync(componentRoot).filter(function(file) {
      return fs.statSync(path.join(componentRoot, file)).isDirectory();
    }).map(function(directory) {
      return {
        component: directory,
        config: require("./" + path.join('source/components/', directory, "/buildconfig.json"))
      }
    });
  }

  var componentBuildConfigs = getBuildConfigs();

  function find(root, key, value) {

    var soughtKey = key.indexOf('.') !== -1
      ? key.substring(0, key.indexOf('.'))
      : key;

    var isKeyExist =
      _.find(Object.keys(root), function(item) {
        return item === soughtKey;
      });


    if (isKeyExist) {
      var nextKey = key.replace(soughtKey, "");
      nextKey = nextKey.startsWith(".") ? nextKey.substring(1) : nextKey;

      if (nextKey) {
        return find(root[soughtKey], nextKey, value);
      }

      if (value) {

        if (root[soughtKey] !== value) {
          return [];
        }

        return [ root ];
      }

      if (root[soughtKey]) {
        return root[soughtKey];
      }

      return [];

    } else if (soughtKey.indexOf(".") === -1) {

      var results = []
      for (var item in root) {
        var result = find(root[item], soughtKey, value);
        if (result.length > 0) {
          results = results.concat(result);
          break;
        }
      }

      return results;
    }

    return [];
  };

  function replace(item, key, componentName) {
    if (key ==='source') {

      if (item instanceof Array) {

        return item
          .map(function(value) {
            var isExclusion = value.startsWith("!");
            return (isExclusion ? "!" : "")
              + "./source/components/"
              + componentName
              + (isExclusion ? value.replace("!", "") : value).replace(".", "");
          });

      }

      var isExclusion = item.startsWith("!");
      return (isExclusion ? "!" : "")
        + "./source/components/"
        + componentName
        + (isExclusion ? item.replace("!", "") : item).replace(".", "");

    }

    return item;
  }

  function merge(root, components, base) {
    var result = {};
    for (var key in root) {
      if (typeof root[key] === 'string') {

          var rootConfig = root[key];

          var componentConfigs = components
            .map(function(componentConfig) {
              var result = find(componentConfig.config, (base ? base + "." + key : key));
              return replace(result, key, componentConfig.component);
            });

          result[key] = [rootConfig];

          componentConfigs
            .forEach(function(componentConfig) {

              if (componentConfig instanceof Array) {
               var newValues = componentConfig
                .filter(function(item) {
                  return rootConfig !== item;
                });

                if (newValues.length > 0) {
                  result[key].push(newValues);
                }

              } else {
                if (rootConfig !== componentConfig) {
                  result[key].push(componentConfig);
                }
              }

            });

            if (result[key].length === 1) {
              result[key] = result[key][0];
            }

      } else if (root[key] instanceof Array) {

        var rootConfig = root[key];

        var componentConfigs = components
          .map(function(componentConfig) {
            var result = find(componentConfig.config, (base ? base + "." + key : key));
            return replace(result, key, componentConfig.component);
          });

        result[key] = [root[key]];

        componentConfigs
          .forEach(function(componentConfig) {

            if (componentConfig instanceof Array) {
             var newValues = componentConfig
              .filter(function(item) {
                return root[key].indexOf(item) === -1;
              });

              if (newValues.length > 0) {
                result[key].push(newValues);
              }

            } else {
              if (root[key].indexOf(componentConfig) === -1) {
                result[key].push(componentConfig);
              }
            }

          });

          if (result[key].length === 1) {
            result[key] = result[key][0];
          }

      } else {
        result[key] = merge(root[key], components, (base ? base + "." + key : key));
      }
    }

    return result;
  };

  var tasks = [];
  function initialize(root, options, target) {
    for (var key in root) {
      if (root[key].taskName) {
        //if (root[key].config) {

          var componentConfigs = componentBuildConfigs
            .map(function(componentBuildConfig) {
              var config = find(componentBuildConfig.config, "taskName", root[key].taskName)[0];

              if (config.config) {
                return {
                  component: componentBuildConfig.component,
                  config: config.config
                }
              }
            });

          // console.log("COMPONENT " + util.inspect(componentConfigs, {showHidden: false, depth: null }));
          // console.log("ROOT " + util.inspect(rootConfig, {showHidden: false, depth: null }));

          var rootConfig = merge(root[key].config, componentConfigs);
          //console.log("RESULT " + util.inspect(rootConfig, {showHidden: false, depth: null }));

          tasks.push({
            name: root[key].taskName + "-" + target,
            core: require("./tasks/" + root[key].taskName)(gulp, plugins, rootConfig)
          });
        //}
      } else {
        initialize(root[key], options, target);
      }
    }
  };

  return {
    buildClient: function(options) {
      initialize(buildConfig.client, options, 'client');

      for (var task in tasks) {
        gulp.task(tasks[task].name, tasks[task].core);
      }

      return runSequence(
        'clean-client',
        'build-views-client',
        'build-fonts-client',
        'build-images-client',
        'build-internal-scripts-client',
        'build-internal-styles-client',
        'build-external-scripts-client',
        'build-external-styles-client',
        "inject-client"
      );
    },
    buildServer: function(options) {
      initialize(buildConfig.server, options, 'server');

      for(var task in tasks) {
        gulp.task(tasks[task].name, tasks[task].core);
      }

      return runSequence(
        'clean-server',
        'build-internal-scripts-server'
      );
    }
  };
};
