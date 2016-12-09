'use strict';

var mergeStream = require('merge-stream');
var start = require("../../../../tasks/start-server");
var runSequence = require('run-sequence');

module.exports = function(gulp, plugins, config) {
    return mergeStream(
      // Copie all the server scripts in the destination folder
      gulp.src(config.build.scripts)
        .pipe(gulp.dest(config.deployment.root)),

      // Copie package.json in the destination folder and install the dependencies
      gulp.src(config.componentRoot + "/package.json")
        .pipe(gulp.dest(config.deployment.root))
    );
};
