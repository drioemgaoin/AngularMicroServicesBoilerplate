'use strict';

var ComponentManager = require("../source/componentManager")

module.exports = function(gulp, plugins, config) {
    return function() {
        var componentManager = ComponentManager(gulp, plugins, "source/components");
        
        var sources = componentManager.getConfigRoutes();
        sources.push("./source/config.js");

        return gulp.src("./source/app.js")
          .pipe(plugins.inject(gulp.src(sources), {
              starttag: '<!-- inject:routes -->',
              removeTags: true,
              transform: function (filePath, file) {
                return file.contents.toString('utf8');
              }
            }));
    };
};
