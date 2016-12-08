'use strict';

var argv = require('yargs').argv;

module.exports = function(gulp, plugins, config) {
    return function() {
        var scssFilter = plugins.filter('**/*.scss', { restore: true });

        return gulp.src('./bower.json')
            .pipe(plugins.mainBowerFiles({ overrides: config.bowerOverrides }))
            .pipe(scssFilter)
            .pipe(plugins.sass())
            .pipe(plugins.if(argv.production, plugins.csso()))
            .pipe(plugins.flatten())
            .pipe(gulp.dest(config.deployment.styles));
    };
};
