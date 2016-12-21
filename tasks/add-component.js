'use strict';

var argv = require('yargs').argv;
var del = require('del');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
  return function(done) {

    function merge(parsedJson, file) {
      if (/components/.test(file.path)) {
        return { dependencies: parsedJson.dependencies };
      }
      else {
        return parsedJson;
      }
    }

    Promise.resolve(del.sync('./source/components/' + argv.target))
      .then(function() {
        plugins.git.clone(argv.url, { args: './source/components/' + argv.target }, function(err) {
          del.sync([
            './source/components/' + argv.target + '/**',
            './source/components/' + argv.target + '/.*',
            '!./source/components/' + argv.target,
            '!./source/components/' + argv.target + '/client/**',
            '!./source/components/' + argv.target + '/server/**',
            '!./source/components/' + argv.target + '/bower.json',
            '!./source/components/' + argv.target + '/package.json',
            '!./source/components/' + argv.target + '/buildconfig.json'
          ]);

          return mergeStream(
            gulp.src([
              './source/components/' + argv.target + '/bower.json',
              './bower.json'
            ])
            .pipe(plugins.mergeJson("bower.json", merge))
            .pipe(gulp.dest('./')),

            gulp.src([
              './source/components/' + argv.target + '/package.json',
              './package.json'
            ])
            .pipe(plugins.mergeJson("package.json", merge))
            .pipe(gulp.dest('./'))
          )
          .pipe(plugins.install({ production: true }))
          .on('end', function() { done(); })

        });
      });

  };
};
