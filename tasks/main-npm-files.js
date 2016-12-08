
'use strict';

module.exports = function(grunt) {
    var vfs = require('vinyl-fs');

    grunt.registerMultiTask('npm', 'Copy Npm packages to the destination folder.', function() {
        var done = this.async();
        var options = this.options() || {};
        var targets = (this.file) ? [this.file] : this.files;

        targets.forEach(function(target) {
            var base = target.base;
            var dest = target.dest;

            vfs.src(this(options), {base: base})
                .pipe(vfs.dest(dest))
                .on('end', function() {
                    done();
                });
        });
    });
};
