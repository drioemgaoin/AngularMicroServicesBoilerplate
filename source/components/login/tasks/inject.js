'use strict';

var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
      var source = path.join(
        config.client.basePath,
        config.client.deployment.root,
        config.client.deployment.views,
        "/index.html");

      var dest = path.join(
        config.client.basePath,
        config.client.deployment.root,
        config.client.deployment.views);

      var scripts = path.join(
        config.client.basePath,
        config.client.deployment.root,
        config.client.deployment.scripts);

      var styles = path.join(
        config.client.basePath,
        config.client.deployment.root,
        config.client.deployment.styles);
        console.log(source);

      return gulp.src(source)
          .pipe(plugins.inject(
              gulp.src(scripts + '/**/*.js', {read: false})
                  .pipe(plugins.order(["vendor.js", "internal.js"])), {
            ignorePath: 'dist/client',
            addRootSlash: false
          }))
          .pipe(gulp.dest(dest))
          .pipe(plugins.inject(gulp.src(styles + '/**/*.css', {read: false}), {
            ignorePath: 'dist/client',
            addRootSlash: false
          }))
          .pipe(gulp.dest(dest));
    };
};
