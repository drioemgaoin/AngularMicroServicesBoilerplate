'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
        var appPath = path.join(config.basePath, config.build.root, "app.js");
        var configPath = path.join(config.basePath, config.build.root, "config.js");

        return gulp.src(appPath)
          .pipe(plugins.inject(gulp.src(configPath), {
            starttag: '<!-- inject:routes -->',
            removeTags: true,
            transform: function (filePath, file) {
              return file.contents.toString('utf8');
            }
          }));
    };
};
