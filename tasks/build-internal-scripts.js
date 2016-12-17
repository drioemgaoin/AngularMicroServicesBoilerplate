'use strict';

var argv = require('yargs').argv;
var path = require('path');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
  return function() {

    function getSources(root) {
      if (root instanceof Array) {
        return root
          .map(function(source) {
            return gulp.src(source);
          });
      }

      return gulp.src(root);
    };

    function injectRoutes() {
      var routeSources = getSources(config.routes.source);

      var streams = (routeSources.length > 1 ? mergeStream(routeSources) : routeSources);
      return plugins.inject(streams
        .pipe(plugins.mainDedupe({ same: false, fullPath: false })), {
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

    var sources = getSources(config.source);

    const appFilter = plugins.filter(['**/app.js', '!source/components/**/app.js'], {restore: true});
    const injectFilter = plugins.filter(['**/*.js', '!source/components/**/app.js', '!source/components/**/routes/**/*.*']);

    return (sources.length > 1 ? mergeStream(sources) : sources)
      .pipe(appFilter)
      .pipe(plugins.ifElse(config.routes, injectRoutes))
      .pipe(appFilter.restore)
      .pipe(injectFilter)
      .pipe(plugins.sort({
        comparator: function(file1, file2) {
          if (file1.path.indexOf('components') > -1) {
            return 1;
          }

          if (file2.path.indexOf('components') > -1) {
              return -1;
          }

          return 0;
        }
      }))
      .pipe(plugins.mainDedupe({ same: false, fullPath: false }))
      .pipe(plugins.sort({
        comparator: function(file1, file2) {
          if (file1.relative === 'app.js') {
            return -1;
          }

          if (file2.relative === 'app.js') {
              return 1;
          }

          return 0;
        }
      }))
      .pipe(plugins.ifElse(config.fileName, function() { return plugins.concat(config.fileName); }))
      .pipe(gulp.dest(config.destination));
  };
};
