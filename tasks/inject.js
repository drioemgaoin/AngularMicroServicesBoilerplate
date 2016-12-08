'use strict';

module.exports = function(gulp, plugins, config) {
    return function() {
        gulp.task('inject', function() {
            return gulp.src(config.client.deployment.root + '/index.html')
                .pipe(plugins.inject(
                    gulp.src(config.client.deployment.scripts + '/**/*.js', {read: false})
                        .pipe(plugins.order(["vendor.js", "internal.js"])), {
                  ignorePath: 'dist',
                  addRootSlash: false
                }))

                .pipe(gulp.dest(config.client.deployment.root))
                .pipe(plugins.inject(gulp.src(config.client.deployment.styles + '/**/*.css', {read: false}), {
                  ignorePath: 'dist',
                  addRootSlash: false
                }))
                .pipe(gulp.dest(config.client.deployment.root));
        });
    };
};
