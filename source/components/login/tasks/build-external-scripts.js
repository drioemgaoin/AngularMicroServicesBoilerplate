'use strict';

var argv = require('yargs').argv;
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
      var jsFilter = plugins.filter('**/*.js', { restore: true });

      return mergeStream(
        gulp.src('../bower.json')
            .pipe(plugins.mainBowerFiles({ overrides: config.bowerOverrides })),
        gulp.src(plugins.mainNpmFiles({
          nodeModulesPath: "../node_modules",
          packageJsonPath: "../package.json"
        }), { base: './' })
      )
      .pipe(jsFilter)
      .pipe(plugins.if(argv.production, plugins.uglify()));
};
