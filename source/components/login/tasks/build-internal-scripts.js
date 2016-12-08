'use strict';

var argv = require('yargs').argv;

module.exports = function(gulp, plugins, config) {
    return gulp.src(config.build.scripts)
      .pipe(plugins.if(argv.production, plugins.uglify({mangle: false})));
};
