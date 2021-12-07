'use strict';

module.exports = function () {

    return this.gulp.src(this.opts.src.images.files)
        .pipe(this.gulp.dest(this.opts.dist + '/assets/img'));
};
