'use strict';

var ComponentManager = require("../source/componentManager")
var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
        var componentManager = ComponentManager(gulp, plugins, "source/components");

        var appPath = path.join(config.client.basePath, config.client.build.root, "app.js");
        var sources = componentManager.getConfigRoutes()
          .concat(path.join(config.client.basePath, config.client.build.root, "config.js"));

        return gulp.src(appPath)
          .pipe(plugins.inject(gulp.src(sources), {
              starttag: '<!-- inject:routes -->',
              removeTags: true,
              transform: function (filePath, file) {
                return file.contents.toString('utf8');
              }
            }));
    };
};
