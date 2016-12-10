'use strict';

var argv = require('yargs').argv;
var path = require('path');
var mergeStream = require('merge-stream');

module.exports = function(gulp, plugins, config) {
    return function() {
        var componentManager = require("../source/componentManager")(gulp, plugins, "source/components");
        var source = path.join(config.client.basePath, config.client.build.root, config.client.build.styles);
        var dest = path.join(config.client.deployment.root, config.client.deployment.styles);

        return mergeStream(
          gulp.src(source)
            .pipe(plugins.sass())
            .pipe(plugins.if(argv.production, plugins.csso()))
            .pipe(plugins.flatten()),
          componentManager.buildInternalStyle()()
        )
        .pipe(plugins.concat('main.css'))
        .pipe(gulp.dest(dest));
    };
};
