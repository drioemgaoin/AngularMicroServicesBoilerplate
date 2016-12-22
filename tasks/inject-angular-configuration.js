'use strict';

var argv = require('yargs').argv;
var buildHelper = require('../buildHelper')();

module.exports = function(gulp, plugins) {
  return function(type, config) {

    if (!config) {
      return plugins.empty();
    }

    var routeSources = buildHelper.getSources(gulp, config.source, function(root) {
        return root;
      })
      .pipe(plugins.sort(buildHelper.sort(/components/, false)))
      .pipe(plugins.mainDedupe({ same: false, fullPath: false }))
      .pipe(plugins.if(argv.debug, plugins.debug({ title: "inject-angular-configuration:" + type })));

    return plugins.inject(routeSources, {
        starttag: '/* inject:' + type + ' */',
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
