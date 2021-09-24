'use strict';

let browser_sync = require('browser-sync');


module.exports = function (cb) {
    let gulp = this.gulp,
        watch = this.opts.watch;

    browser_sync.init({
        server: {baseDir: this.opts.dist},
        open: false
    });

    gulp.watch(watch.styles, ['styles']);
    gulp.watch(watch.icons, ['icons', browser_sync.reload]);
    gulp.watch(watch.scripts, ['scripts', browser_sync.reload]);
    gulp.watch(watch.fonts, ['fonts', browser_sync.reload]);
    gulp.watch(watch.images, ['images', browser_sync.reload]);
    gulp.watch(watch.twig, ['twig']);
    gulp.watch(watch.html, browser_sync.reload);

    return cb;
};

module.exports.dependencies = ['default'];
