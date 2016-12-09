'use strict';

var argv = require('yargs').argv;
var mergeStream = require('merge-stream');
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config) {
    return function() {
        return mergeStream(
          gulp.src(mainBowerFiles({
                filter: '**/*.js',
                overrides: config.bowerOverrides
              }), { base: './' }),
          gulp.src(plugins.mainNpmFiles(), { base: './' })
        )
        .pipe(plugins.if(argv.production, plugins.uglify()))
        .pipe(plugins.flatten());
    };
};
