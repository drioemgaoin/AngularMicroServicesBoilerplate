'use strict';

var argv = require('yargs').argv;
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins, config) {
  return function() {

    if (!config.routes) {
      return plugins.empty();
    }

    var routeSources = buildHelper.getSources(gulp, config.routes.source, function(root) {
        return root;
      })
      .pipe(plugins.sort(buildHelper.sort(/components/, false)))
      .pipe(plugins.mainDedupe({ same: false, fullPath: false }))
      .pipe(plugins.if(argv.debug, plugins.debug({ title: "inject-routes" })));

    return plugins.inject(routeSources, {
        starttag: '/* inject:routes */',
        endtag: '/* endinject */',
        removeTags: true,
        transform: function(filePath, file) {
          var content = file.contents.toString('utf8');
          return content.substring(
            content.indexOf("{") + 1,
            content.lastIndexOf("}"));
        }
      });

  };
};
