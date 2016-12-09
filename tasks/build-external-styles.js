'use strict';

var argv = require('yargs').argv;
var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, plugins, config) {
    return function() {
        return gulp.src(mainBowerFiles({
              filter: '**/*.scss',
              overrides: config.bowerOverrides
            }), { base: './' })
            .pipe(plugins.sass())
            .pipe(plugins.if(argv.production, plugins.csso()))
            .pipe(plugins.flatten())
            .pipe(plugins.order([
                "jquery.js",
                "jquery*.js",
                "angular.js",
                "angular*.js",
                "*.js"
                ], { base: './' })
            );
    };
};
