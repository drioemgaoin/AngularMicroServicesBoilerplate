'use strict';

var argv = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var util = require("util");
var mergeStream = require("merge-stream");
var buildConfig = require('./buildConfig.json');

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
    if (typeof root !== 'string' && !root.hasOwnProperty(key)) {

        // var keys = Object.keys(root);
        // if (keys.indexOf(key) !== -1) {
        //
        // }
        var results = [];
        for (var item in root) {
          var result = find(root[item], key, value);
          if (result.length > 0) {
            results = results.concat(result);
            //break; -> A VOIR SI ON PEUT DECOMMANTER
          }
        }

        return results;
    }

    if (value) {
      if (root[key] !== value) {
        return [];
      }

      return [ root ];
    }

    if (root[key]) {
      return root[key];
    }

    return [];
  };

  function merge(root, componentConfigs) {
    for (var key in root) {
      if (typeof root[key] === 'string' || root[key] instanceof Array) {
        var values = [];
        if (key === "source") {
          values = componentConfigs.map(function(componentConfig) {
            var value = find(componentConfig.config, key);
            if (value instanceof Array) {
              return value.map(function(item) {
                var isExclusion = item.startsWith("!");
                return (isExclusion ? "!" : "")
                  + "./" + path.join('source/components/', componentConfig.component, (isExclusion ? item.replace("!", "") : item) );
              });
            }

            var isExclusion = value.startsWith("!");
            return (isExclusion ? "!" : "")
              + "./" + path.join('source/components/', componentConfig.component, (isExclusion ? item.replace("!", "") : value) );
          });

          root[key] = [
            root[key],
            values.length > 1 ? values : values[0]
          ]

        } else {
          values = componentConfigs.map(function(componentConfig) {
            return find(componentConfig.config, key);
          }).reduce(function(a, b) { return a.concat(b); });

          if (typeof root[key] === 'string') {
            if (values.indexOf(root[key]) === -1) {
              values.push(root[key]);
            }
          } else {
            var valuesToAdd = root[key]
            .filter(function(item) { return values.indexOf(item) === -1; })
            values = values.concat(valuesToAdd);
          }

          root[key] = values.length > 1 ? values : values[0];
        }
      } else {
        console.log("PART " + util.inspect(root[key], {showHidden: false, depth: null }));
        merge(root[key], componentConfigs);
      }
    }
  };

  var tasks = [];
  function initialize(root, options) {
    for (var key in root) {
      if (root[key].taskName) {
        if (root[key].config) {
          var rootConfig = root[key].config;

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

          console.log("COMPONENT " + util.inspect(componentConfigs, {showHidden: false, depth: null }));
          console.log("ROOT " + util.inspect(rootConfig, {showHidden: false, depth: null }));

          merge(rootConfig, componentConfigs);
          console.log("RESULT " + util.inspect(rootConfig, {showHidden: false, depth: null }));

          tasks.push({
            name: root[key].taskName + "-client",
            core: require("./tasks/" + root[key].taskName)(gulp, plugins, rootConfig)
          });
        }
      } else {
        initialize(root[key]);
      }
    }
  };

  return {
    buildClient: function(options) {
      initialize(buildConfig.client, options);

      for (var task in tasks) {
        gulp.task(tasks[task].name, tasks[task].core);
      }

      return runSequence(
        'clean-client',
        'build-views-client',
        'build-fonts-client',
        'build-images-client',
        'build-internal-scripts-client'
      );
    },
    buildServer: function(options) {
      // return runSequence(
      //   createTask('clean', 'server', options),
      //   createTask('lint', 'server', options),
      //   [
      //     createTask("build-internal-scripts", 'server', options),
      //     createTask('build-server', 'server', options)
      //   ]
      // );
    }
  };
};
